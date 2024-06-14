const Sequelize = require('sequelize');

module.exports = class BookMark extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userID: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      location_S: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      lat_S: {
        type: Sequelize.FLOAT(20),
      },
      lag_S: {
        type: Sequelize.FLOAT(20),
      },
      location_E: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      lat_E: {
        type: Sequelize.FLOAT(20),
      },
      lag_E: {
        type: Sequelize.FLOAT(20),
      },
      
    }, {
      sequelize,
      // tableName: 'tableName', // table명을 수동으로 생성 함
      // freezeTableName: true, // true: table명의 복수형 변환을 막음
      underscored: true, // true: underscored, false: camelCase
      timestamps: true, // createAt, updatedAt
      paranoid: true, // deletedAt
    });
  }

  // static associate(db) {
  //
  //   db.User.hasMany(db.Bookmark, { foreignKey: { name: 'userId', onDelete: 'SET NULL', as: 'Bookmarks' } });
  // }

  // static getIncludeAttributes() {
  //   return ['id', 'name', 'userID', 'email', 'phone', 'addrLat', 'addrLng', 'createdAt'];
  // }
};
