import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmailSchema } from "@shared/schema";
import { z } from "zod";
import { TransactionalEmailsApi, ContactsApi, CreateContact } from '@getbrevo/brevo';

// Initialize Brevo APIs
const brevoApiInstance = new ContactsApi();
brevoApiInstance.setApiKey(0, process.env.BREVO_API_KEY || '');

const transactionalEmailsApi = new TransactionalEmailsApi();
transactionalEmailsApi.setApiKey(0, process.env.BREVO_API_KEY || '');

// Welcome email function
async function sendWelcomeEmail(email: string) {
  try {
    await transactionalEmailsApi.sendTransacEmail({
      sender: {
        email: process.env.BREVO_SENDER_EMAIL || 'noreply@poopoomountain.com',
        name: 'Poo Poo Mountain Team'
      },
      to: [{
        email: email
      }],
      subject: '💩 Welcome to the Poo Poo Mountain Squad!',
      htmlContent: `
        <html>
          <body style="font-family: Arial, sans-serif; background-color: #fdf6ec; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px;">
              <h1 style="color: #5c3a1a; text-align: center; font-size: 2.5em;">💩 Welcome to Poo Poo Mountain!</h1>
              
              <p style="color: #5c3a1a; font-size: 1.2em;">🎉 Hey, future Poo Poo Mountain legend!</p>
              <p style="color: #7a6b5f; font-size: 1em; margin-bottom: 20px;">🎉 嘿，未來的噗噗山傳奇！</p>
              
              <p style="color: #5c3a1a;">Thanks for joining our squad! You'll be the first to know when:</p>
              <p style="color: #7a6b5f; margin-bottom: 15px;">感謝加入我們的隊伍！你將第一時間知道：</p>
              
              <ul style="color: #5c3a1a;">
                <li>🚀 Our crowdfunding campaign launches</li>
                <li>🎮 The game is ready to play</li>
                <li>🎁 Exclusive perks and updates drop</li>
                <li>💩 More ridiculous content gets released</li>
              </ul>
              <ul style="color: #7a6b5f; margin-bottom: 20px;">
                <li>🚀 我們的群眾募資活動開跑</li>
                <li>🎮 遊戲正式開玩</li>
                <li>🎁 獨家好康與最新消息登場</li>
                <li>💩 更多爆笑荒謬的內容釋出</li>
              </ul>
              
              <p style="color: #5c3a1a;">Get ready for the funniest card game experience ever created!</p>
              <p style="color: #7a6b5f; margin-bottom: 20px;">準備好迎接史上最爆笑的卡牌遊戲體驗吧！</p>
              
              <div style="text-align: center; margin-top: 30px;">
                <p style="color: #b88c4c; font-size: 0.9em;">The Poo Poo Mountain Team</p>
                <p style="color: #b88c4c; font-size: 0.9em;">噗噗山團隊</p>
              </div>
            </div>
          </body>
        </html>
      `
    });
  } catch (error) {
    console.error('Error sending welcome email:', error);
    // Don't fail the subscription if email sending fails
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Email subscription endpoint with Brevo integration
  app.post("/api/subscribe", async (req, res) => {
    try {
      const validatedData = insertEmailSchema.parse(req.body);
      
      // Check if email already exists in local storage
      const existingEmail = await storage.getEmailByAddress(validatedData.email);
      if (existingEmail) {
        return res.status(409).json({ 
          message: "Email already subscribed", 
          success: false 
        });
      }
      
      // Add to Brevo if API key is configured
      if (process.env.BREVO_API_KEY) {
        try {
          const createContact: CreateContact = {
            email: validatedData.email,
            listIds: process.env.BREVO_LIST_ID ? [parseInt(process.env.BREVO_LIST_ID)] : [],
            attributes: {
              SOURCE: validatedData.source,
              SIGNUP_DATE: new Date().toISOString()
            }
          };

          await brevoApiInstance.createContact(createContact);
          
          // Send welcome email if configured
          if (process.env.BREVO_SENDER_EMAIL) {
            await sendWelcomeEmail(validatedData.email);
          }
          
        } catch (brevoError: any) {
          // Handle case where contact already exists in Brevo
          if (brevoError.status === 400 && brevoError.response?.body?.code === 'duplicate_parameter') {
            return res.status(409).json({ 
              message: "Email already subscribed", 
              success: false 
            });
          }
          console.error("Brevo API error:", brevoError);
          // Continue with local storage even if Brevo fails
        }
      }
      
      // Store locally for backup
      const email = await storage.createEmail(validatedData);
      
      res.json({ 
        message: "Successfully subscribed to Poo Poo Mountain updates!", 
        success: true, 
        data: { id: email.id, email: email.email } 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid email format", 
          success: false,
          errors: error.errors 
        });
      }
      console.error("Error subscribing email:", error);
      res.status(500).json({ 
        message: "Failed to subscribe. Please try again.", 
        success: false 
      });
    }
  });

  // Get all emails (for admin purposes)
  app.get("/api/emails", async (req, res) => {
    try {
      const emails = await storage.getEmails();
      res.json({ success: true, data: emails });
    } catch (error) {
      console.error("Error fetching emails:", error);
      res.status(500).json({ 
        message: "Failed to fetch emails", 
        success: false 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
