const db = require('../databaseconf/database');
const { DataTypes } = require('sequelize');
const sequelize = db.sequelize;

const User = sequelize.define(
  'User',
  {
    userid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'landlords', 'admin'),
      defaultValue: 'user',
      allowNull:false
    },
  },
  {
    timestamps: true,
    tableName: 'users',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        fields: ['email'],
      },
    ],
  }
);

const UserDetails = sequelize.define(
  'userdetails',
  {
    user_detailsId:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    userid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: User, key: 'userid' },
      onDelete: 'CASCADE',
    },

    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    Phone_no: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profile_pic_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Zip_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'userdetails',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        fields: ['userid'],
      },
    ],
  }
);

User.hasOne(UserDetails, { foreignKey: 'userid', onDelete: 'CASCADE' });
UserDetails.belongsTo(User, { foreignKey: 'userid' });

module.exports = { User, UserDetails };
