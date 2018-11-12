'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cars = sequelize.define('Cars', {
    currentlong: DataTypes.STRING,
    currentlat: DataTypes.STRING
  }, {});
  Cars.associate = function(models) {
    // associations can be defined here
  };
  return Cars;
};