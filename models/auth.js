const Usermodles = (sequelize, DataTypes) => {
    const user = sequelize.define("user", {
       id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        }, 
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profilepic:{
            type:DataTypes.STRING,
            allowNull:true
        },
        Address:{
            type:DataTypes.STRING,
            allowNull:true
        }
    }, {
        timestamps: true,
        indexes:[
            {
                fields:['email']
            }
        ]})
    return user
}

module.exports = Usermodles


