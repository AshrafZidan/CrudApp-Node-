'use strict';

const path = require('path'),

    models = require(path.join(__dirname, '..', 'models'));
    

module.exports = {
     async createNewOrder(order){
        
       let newOrder = {
            user_id: order.user_id,
            comments: order.comments
        }

         
        models.orders.create(newOrder).then(savedOrder => {
        const orderId =  savedOrder.orderId;      
         order.items.forEach(element => {   
            element.orderId = orderId;             
            return models.orderProduct.create(element)
            });
         })
       
    },
   async getOrderByUser(userId){
         let order = await models.orders.findAll( {where: {user_id:userId}})
         
          
         return models.orderProduct.findAll({
                include:[{
                    model: models.product,
                    where:{
                            orderId: order.orderId
                        }
                }]
            })
        
    }
  
}