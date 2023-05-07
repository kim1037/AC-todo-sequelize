'use strict';
module.exports = (sequelize, DataTypes) => {
  //因為是透過sequelize cli腳本來執行，如果單純使用sequelize套件，則需要先引入const { Sequelize } = require('sequelize');
  //引入的Sequelize是一個construtor, 透過new 來建立instance -> const sequelize = new Sequelize(...)
  //建立後的instance則是下方這個sequelize.define的sequelize
  const Todo = sequelize.define( //定義model
    "Todo",
    {
      name: DataTypes.STRING,
      isDone: DataTypes.BOOLEAN,
    },
    {}
  );
  Todo.associate = function (models) {
    // associations can be defined here
    Todo.belongsTo(models.User);
  };
  return Todo;
};