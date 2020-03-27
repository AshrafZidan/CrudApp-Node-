

module.exports = function (sequelize, DataTypes){
  
     userModel = sequelize.define('users', {
    // attributes
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.TINYINT,
      defaultValue: 0

        
    },
    isApprove: {
      type: DataTypes.TINYINT,
      defaultValue: 0
      
  }
  
  }  ,
    {
      freezeTableName: true,
      timestamps: false



    }
  );
   return userModel;
 }
