export default (req, res) => res.status(200).json({ ok: true, where: "root", ts: Date.now() });
