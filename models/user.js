const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(255),
      },
      userID: {
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
      },
      phone: {
        type: Sequelize.STRING(255),
      },
      // addrLat: { // 사용자 주소의 위도
      //   type: Sequelize.FLOAT(20)
      // },
      // addrLng: { // 사용자 주소의 경도
      //   type: Sequelize.FLOAT(20)
      // },
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
