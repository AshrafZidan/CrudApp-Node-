const path = require('path'),

    models = require(path.join(__dirname, '..', 'models'));
const bcrypt = require('bcrypt')

module.exports = {
     async createNewUser(user){
        
        let newUser = await models.users.findAll({
            where:{
            email: user.email
            }
        });
        
        
        
        if (newUser.length > 0) {
            return new Promise((resolve , reject)=>{
                reject({message:'user already exists'});
            });
        }
        
        //hashing user password
       const salt = await bcrypt.genSalt(10);
       user.password = await bcrypt.hash(user.password , salt)
        newUser = {
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            password: user.password
        }


      return  models.users.create(newUser)

      
    },
    async login(user){
 
        let loggedUser = await models.users.findOne({
            where:{
            email: user.email
            }
        });
           
        
        if (! loggedUser ) {
            return new Promise((resolve , reject)=>{
                reject('invalid email or password');
            });
        }

         
        if (loggedUser.isApprove == 0) {
            return new Promise((resolve , reject)=>{
                reject("admin didn't approve yet");
            });
        }
       const validPass = await bcrypt.compare(user.password , loggedUser.password);
       if(! validPass) {
        return new Promise((resolve , reject)=>{
            reject('invalid email or password');
        });
       }

       
       return new Promise( (resolve , reject) => {
           resolve(loggedUser);
       });
    },
    async  approveUser(user) {

        let approvedUser = await models.users.findOne({
            where:{
            email: user.email
            }
        });

         
        if ( approvedUser == null) {
             return new Promise((resolve , reject)=>{
                reject("user doesn't exists in db");
            });
        }
        approvedUser.isApprove = 1;
        return approvedUser.save();
        
        
    },

     getAllNeedsApprove(){
 
        return models.users.findAll({
            where:{
            isApprove: 0
            }
        });
           
     }
}