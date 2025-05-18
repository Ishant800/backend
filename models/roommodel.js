const db = require("../databaseconf/database")
const sequelize = db.sequelize
const {DataTypes, UUIDV4} = require('sequelize')
const { User } = require("./auth")

const Room = sequelize.define('Room',{
    roomid:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    userid:{
        type:DataTypes.UUID,
        references:{model:User,key:'userid'},
        onDelete:'CASCADE',
        allowNull:false
    },
    roomtitle:{
        type:DataTypes.STRING,
        allowNull:false
    },
    roomtype:{
        type:DataTypes.ENUM('singleroom','double bed room','apartment','office'),
        allowNull:false
    },
    roomsize:{
        type:DataTypes.STRING,
        allowNull:false
    },
    images:{
        type:DataTypes.ARRAY(DataTypes.STRING(255)),
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    status:{
        type:DataTypes.ENUM('booked','available','pending'),
        defaultValue:'available',
        allowNull:false
    },
    features:{
        type:DataTypes.ARRAY(DataTypes.STRING),
    allowNull:true
    },
    location:{
        type:DataTypes.STRING,
        allowNull:true
    },
    city:{
        type:DataTypes.STRING,
        allowNull:false
    },
    address:{
        type:DataTypes.STRING,
        allowNull:true
    },
    country:{
      type:DataTypes.STRING,
     allowNull:true
    },
    room_price_monthly:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    }

},{
    tableName:"room",
   timestamps:true,
   createdAt:'createdat',
   updatedAt:"updatedat",
   indexes:[
    {fields:['roomid']},
    {fields:['room_price_monthly']},{
        fields:['city']
    },
    {
        fields:['status']
    }
      ]
})

User.hasOne(Room, { foreignKey: 'userid', onDelete: 'CASCADE' });
Room.belongsTo(User,{foreignKey:"userid"})
module.exports = {
    Room
}