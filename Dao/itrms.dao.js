 
'use strict';

const path = require('path'),

    models = require(path.join(__dirname, '..', 'models'));
    
    
 
module.exports = {
     async add(item){             
        return models.product.create(item)
                       
    },

    async  getAll(restaurantName) {        
        let allItems = await models.product.findAll({
            where:{
                restaurantName: restaurantName
            }
         });
          
        
        if ( allItems.length == 0) {
            return({msg:"No  Restaurants exists in db"});
             
        }
        
        return allItems;
        
        
    },
    async  DeleteOne(itemId) {

        let item = await models.product.destroy({
            where:{
                itemId: itemId
            }
        });
        return item;
        
        
    }
}