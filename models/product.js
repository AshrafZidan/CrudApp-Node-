module.exports = function (sequelize, DataTypes){
  
     const product = sequelize.define('product', {
    // attributes
    productId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    restaurantName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description:{
        type: DataTypes.STRING,
     },

    price:{
        type: DataTypes.DOUBLE(10,2),
        allowNull: false
    }

  },
    {
      freezeTableName: true,
      timestamps: false
    }
  )

  return product;
 }
