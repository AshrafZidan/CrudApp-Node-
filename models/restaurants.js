   
module.exports = function (sequelize, DataTypes){
  
   return restaurantModel = sequelize.define('restaurants', {
    // attributes
    restaurantId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },

    phone:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    location:{
        type: DataTypes.STRING,
        allowNull: false
    },

    delivery_cost:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isDefault:{
      type: DataTypes.TINYINT,
      defaultValue: 0
  },
      
  },
    {
      freezeTableName: true,
      timestamps: false



    }
  )


 }
