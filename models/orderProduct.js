
module.exports = function (sequelize, DataTypes){

 const orderProduct = sequelize.define('orderProduct', {
    id:{
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
      },

      qty:{
        type: DataTypes.INTEGER,
        allowNull: false,
        
    },

    //  orderId:{
    //     type: DataTypes.INTEGER,
    //     references: {
    //       model: 'orders',
    //       key: 'orderId'
    //   }
       
    // },
    // itemId: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //       model: 'items',
    //       key: 'itemId'
    //   }
       
    // },


  }  ,
    {
      freezeTableName: true,
      timestamps: false

    },
    
  );
  orderProduct.associate = function (models) {
     
    models.orderProduct.belongsTo(models.orders, {
      foreignKey: 'orderId' 
    
    });

      models.orderProduct.belongsTo(models.product, {
      foreignKey: 'productId' 
    
    });
  };


  return orderProduct;
}