'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define('Transactions', {
    carstartlocation: DataTypes.STRING,
    pickuplocation: DataTypes.STRING,
    dropofflocation: DataTypes.STRING,
    pickupduration: DataTypes.STRING,
    tripduration: DataTypes.STRING,
    cost: DataTypes.STRING,
    carid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
  }, {});
  Transactions.associate = function(models) {
    // associations can be defined here
  };
  return Transactions;
};
