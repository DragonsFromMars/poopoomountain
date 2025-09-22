// Vercel serverless function: POST /api/subscribe
const readJson = (req) =>
  new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => {
      try { resolve(body ? JSON.parse(body) : {}); } catch (e) { reject(e); }
    });
    req.on("error", reject);
  });

module.exports = async (req, res) => {
  // CORS (safe even if same-origin)
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
    const { email } = await readJson(req);
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, message: "Valid email required" });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = parseInt(process.env.BREVO_LIST_ID, 10);
    if (!apiKey) {
      return res.status(500).json({ success: false, message: "Missing BREVO_API_KEY" });
    }

    const resp = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        email,
        listIds: Number.isFinite(listId) ? [listId] : undefined,
        updateEnabled: true
      })
    });

    if (!resp.ok) {
      const text = await resp.text();
      return res.status(resp.status).json({ success: false, message: `Brevo: ${text}` });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
