"use strict";
module.exports = function(sequelize, DataTypes) {
  const Config = sequelize.define("config", {
    updates: {
      type: DataTypes.TINYINT
    }
  });

  return Config;
};
