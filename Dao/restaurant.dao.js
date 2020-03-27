const path = require('path'),

models = require(path.join(__dirname, '..', 'models'));

module.exports = {
     async createNewRestaurant(restaurant){        
        let newRestaurant = await models.restaurants.findAll({
            where:{
            phone: restaurant.phone
            }
        });
        
        
        
        if (newRestaurant.length > 0) {
            return new Promise((resolve , reject)=>{
                reject('restaurant already exists');
            });
        }
             
      return  models.restaurants.create(restaurant)

      
    },

    async  getAll() {

        let allRestaurants = await models.restaurants.findAll();
         
        if ( allRestaurants.length == 0) {
             return new Promise((resolve , reject)=>{
                reject("No  Restaurants exists in db");
            });
        }
        
        return allRestaurants;
        
        
    },
    async  DeleteOne(restaurantId) {

        let restaurant = await models.restaurants.destroy({
            where:{
                restaurantId: restaurantId
            }
        });
        return restaurant;
        
        
    },
    async changeDefault(restId){
        let allRestaurants = await models.restaurants.findAll();
         
        allRestaurants.forEach( async (restaurant) => {
            if (restaurant.restaurantId != restId) {
                restaurant.isDefault = 0;
              await models.restaurants.update({isDefault: 0 },{where:{
                  restaurantId: restaurant.restaurantId
              }});
            }else{
                restaurant.isDefault = 1;
                
                await models.restaurants.update({isDefault: 1 },{where:{
                    restaurantId: restaurant.restaurantId
                }});
            }
        });
        
        return allRestaurants;
    }

}