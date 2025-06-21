const Link = require('../models/link');

exports.createLink = async (req, res) => {
  try {
    const link = new Link(req.body);
    await link.save();
    res.status(201).json(link);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getLinks = async (req, res) => {
  const links = await Link.find();
  res.json(links);
};

exports.getLinkById = async (req, res) => {
  const link = await Link.findById(req.params.id);
  if (!link) return res.status(404).json({ error: 'Link not found' });
  res.json(link);
};

exports.updateLink = async (req, res) => {
  const link = await Link.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!link) return res.status(404).json({ error: 'Link not found' });
  res.json(link);
};

exports.deleteLink = async (req, res) => {
  const link = await Link.findByIdAndDelete(req.params.id);
  if (!link) return res.status(404).json({ error: 'Link not found' });
  res.json({ message: 'Link deleted' });
};

exports.redirectLink = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    if (!link) return res.status(404).json({ error: 'Link not found' });

    // שליפת שם הפרמטר מהמודל
    const paramName = link.targetParamName || "t";
    // שליפת ערך הפרמטר מה-query string
    const targetParamValue = req.query[paramName] || "";

    // שמירת קליק
    link.clicks.push({
      ip: req.ip,
      targetParamValue
    });
    await link.save();

    //הפניה לכתובת המקורית
    res.redirect(link.originalUrl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getClicksBySource = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    if (!link) return res.status(404).json({ error: 'Link not found' });

    // סופרים קליקים לכל ערך מקור
    const stats = {};
    link.clicks.forEach(click => {
      const val = click.targetParamValue || "unknown";
      stats[val] = (stats[val] || 0) + 1;
    });

    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};