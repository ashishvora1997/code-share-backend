import { DataTypes } from 'sequelize';
import { sequelize } from '../postgres/postgres.js';

export const Snippet = sequelize.define('Snippet', {
  id: {
    type: DataTypes.UUID,         // PostgreSQL UUID type
    defaultValue: DataTypes.UUIDV4, // automatically generate UUID v4
    primaryKey: true,             // set as primary key
  },
  code: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    defaultValue: () => new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  },
  createdAt: { type: DataTypes.DATE, allowNull: false },
  updatedAt: { type: DataTypes.DATE, allowNull: false },
}, {
  tableName: 'code_snippets',
  timestamps: true, // createdAt and updatedAt
});
