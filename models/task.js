'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.User, { foreignKey: 'user_id' })
    }
  };
  Task.init({
    title: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title cannot be empty'
        }
      }
    },
    category: { 
      type: DataTypes.ENUM("backlog", "todo", "doing", "done"),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title cannot be empty'
        },
        isIn: {
          args: [['backlog', 'todo', 'doing', 'done']],
          msg: 'Category must between backlog, todo, doing or done'
        }
      }
    },
    user_id: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'user_id cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};