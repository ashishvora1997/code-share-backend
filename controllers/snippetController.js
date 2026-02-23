import { Snippet } from '../models/snippetModel.js';
import { Op } from 'sequelize';

// Create snippet
export const createSnippet = async (req, res, next) => {
  try {
    const { code } = req.body;
    const snippet = await Snippet.create({ code });
    res.status(201).json(snippet);
  } catch (err) {
    next(err);
  }
};

// Get snippet
export const getSnippet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const snippet = await Snippet.findOne({
      where: {
        id,
        expiresAt: { [Op.gt]: new Date() }, // not expired
      },
    });
    if (!snippet) return res.status(404).json({ message: 'This record is not found or expired' });
    console.log('Fetched snippet:', snippet);
    res.status(200).json(snippet);
  } catch (err) {
    next(err);
  }
};

// Update snippet
export const updateSnippet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { code } = req.body;
    const snippet = await Snippet.findByPk(id);
    if (!snippet) return res.status(404).json({ message: 'Snippet not found' });

    snippet.code = code;
    await snippet.save();

    res.status(200).json(snippet);
  } catch (err) {
    next(err);
  }
};

// Cleanup expired snippets
export const cleanupSnippets = async (req, res, next) => {
  try {
    await Snippet.destroy({
      where: { expiresAt: { [Op.lt]: new Date() } }
    });
    res.status(200).json({ message: 'Expired snippets deleted' });
  } catch (err) {
    next(err);
  }
};
