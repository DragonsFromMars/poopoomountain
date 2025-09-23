const readJson = (req) =>
  new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => {
      try { resolve(body ? JSON.parse(body) : {}); } catch (e) { reject(e); }
    });
    req.on("error", reject);
  });

const WELCOME_SUBJECT = "💩 Welcome to the Poo Poo Mountain Squad!";
const WELCOME_HTML = `
  <html>
    <body style="font-family: Arial, sans-serif; background-color: #fdf6ec; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px;">
        <h1 style="color: #5c3a1a; text-align: center; font-size: 2.5em;">💩 Welcome to Poo Poo Mountain!</h1>
        
        <p style="color: #5c3a1a; font-size: 1.2em;">🎉 Hey, future Poo Poo Mountain legend!</p>
        <p style="color: #7a6b5f; font-size: 1em; margin-bottom: 20px;">🎉 嘿，未來的噗噗山傳奇！</p>
        
        <p style="color: #5c3a1a;">🎨 Your free printable coloring book (PDF):</p>
        <p style="color: #7a6b5f;">🎨 你的免費可列印著色本（PDF):</p>
        <p style="color: #5c3a1a; margin-bottom: 20px;">
          <a href="https://www.PooPooMountain.com/PooPooMountainColoringBook.pdf" style="color: #b88c4c; text-decoration: none;">
            https://www.PooPooMountain.com/PooPooMountainColoringBook.pdf
          </a>
        </p>
        
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
`;

export default async function handler(req, res) {
  // CORS preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { email, source } = await readJson(req);
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, message: "Valid email required" });
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) return res.status(500).json({ success: false, message: "Missing BREVO_API_KEY" });

    const listId = parseInt(process.env.BREVO_LIST_ID || "", 10);

    // 1) Add/Update contact
    const contactResp = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        email,
        listIds: Number.isFinite(listId) ? [listId] : undefined,
        updateEnabled: true,
        attributes: source ? { SOURCE: source, SIGNUP_DATE: new Date().toISOString() } : undefined
      })
    });
    if (!contactResp.ok) {
      const text = await contactResp.text();
      return res.status(contactResp.status).json({ success: false, message: `Brevo: ${text}` });
    }

    // 2) Send welcome:
    try {
      const templateId = parseInt(process.env.BREVO_WELCOME_TEMPLATE_ID || "", 10);
      const sender = process.env.BREVO_SENDER_EMAIL
        ? { email: process.env.BREVO_SENDER_EMAIL, name: process.env.BREVO_SENDER_NAME || "Poo Poo Mountain Team" }
        : undefined; // use template sender if none provided

      let emailBody;
      if (Number.isFinite(templateId)) {
        emailBody = {
          to: [{ email }],
          templateId,
          params: {},
          tags: ["welcome","signup"]
        };
        if (sender) emailBody.sender = sender;
      } else {
        emailBody = {
          to: [{ email }],
          subject: WELCOME_SUBJECT,
          htmlContent: WELCOME_HTML,
          tags: ["welcome","signup"]
        };
        if (sender) emailBody.sender = sender;
      }

      const mail = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify(emailBody)
      });
      if (!mail.ok) {
        const m = await mail.text();
        console.error("Brevo SMTP send failed:", m);
        // do not block success on email failure
      }
    } catch (e) {
      console.error("Welcome send error:", e);
    }

    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
