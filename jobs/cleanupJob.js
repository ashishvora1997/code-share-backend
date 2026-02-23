import cron from 'node-cron';
import { Snippet } from '../models/snippetModel.js';
import { Op } from 'sequelize';

// Run every 5 minutes
const startCleanupJob = () => {
  cron.schedule('*/5 * * * *', async () => {
    try {
      const deleted = await Snippet.destroy({
        where: {
          expiresAt: { [Op.lt]: new Date() },
        },
      });
      if (deleted > 0) console.log(`Deleted ${deleted} expired snippets`);
    } catch (err) {
      console.error('Error deleting expired snippets:', err);
    }
  });
};

export default startCleanupJob;
