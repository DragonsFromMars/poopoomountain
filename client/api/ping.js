export default (req, res) => res.status(200).json({ ok: true, where: "client", ts: Date.now() });
