import pkg from 'sequelize';
import { sequelize } from '../config/database.js';
import { User } from './user.js';

const { DataTypes } = pkg;

export const Task = sequelize.define('task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('open', 'inProgress', 'review', 'done'),
    defaultValue: 'inProgress',
    allowNull: false,
  },
}, {
  tableName: 'tasks',
  timestamps: true, 
});

// Associations
Task.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });
Task.belongsTo(User, { foreignKey: 'assigneeId', as: 'assignee' });
