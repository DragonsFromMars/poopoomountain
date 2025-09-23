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

// Welcome email function using Brevo template
async function sendWelcomeEmail(email: string) {
  try {
    // Debug logging for production troubleshooting
    console.log('Sending welcome email to:', email);
    console.log('Environment check:', {
      brevo_api_key: process.env.BREVO_API_KEY ? 'SET' : 'MISSING',
      sender_email: process.env.BREVO_SENDER_EMAIL ? 'SET' : 'MISSING',
      template_id: process.env.BREVO_WELCOME_TEMPLATE_ID ? 'SET' : 'MISSING'
    });

    // Validate required environment variables
    if (!process.env.BREVO_API_KEY) {
      throw new Error('BREVO_API_KEY environment variable is not set');
    }
    
    if (!process.env.BREVO_WELCOME_TEMPLATE_ID) {
      throw new Error('BREVO_WELCOME_TEMPLATE_ID environment variable is not set');
    }

    const templateId = parseInt(process.env.BREVO_WELCOME_TEMPLATE_ID);
    if (isNaN(templateId)) {
      throw new Error('BREVO_WELCOME_TEMPLATE_ID must be a valid number');
    }

    // Send email using Brevo template
    const response = await transactionalEmailsApi.sendTransacEmail({
      sender: {
        email: process.env.BREVO_SENDER_EMAIL || 'noreply@poopoomountain.com',
        name: 'Poo Poo Mountain Team'
      },
      to: [{
        email: email
      }],
      templateId: templateId,
      params: {
        // Optional: Add dynamic variables if your template uses them
        // These will be available as {{ params.variableName }} in your Brevo template
        downloadLink: 'https://www.PooPooMountain.com/PooPooMountainColoringBook.pdf',
        userName: 'Future Legend'
      }
    });

    console.log('Welcome email sent successfully:', response.body?.messageId || 'Email sent');
    
  } catch (error: any) {
    console.error('Error sending welcome email:', error);
    console.error('Error details:', {
      message: error?.message || 'Unknown error',
      status: error?.status,
      body: error?.body
    });
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
