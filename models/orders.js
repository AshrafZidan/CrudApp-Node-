
 
const path = require('path'),

models = require(path.join(__dirname, '..', 'models'));

module.exports = function (sequelize, DataTypes){

 const orderModel = sequelize.define('orders', {
    // attributes
    orderId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    comments:{
        type: DataTypes.STRING(255),
    },
    // userId: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: 'users',
    //         key: 'user_id'
    //     }
    // },
  }  ,
    {
      freezeTableName: true,
      timestamps: false

    },
    
  );

   
  orderModel.associate = function (models) {
     
    models.orders.belongsTo(models.users, {
      onDelete: "CASCADE",
      foreignKey: 'user_id' 
    
    });
  };

  
  return orderModel;
}