
module.exports = function(req, res, next){
    // 401  unauth
    // 403 forbidden
    console.log("admin ", req.user.isAdmin);
    
   if (!req.user.isAdmin) return res.status(403).send('Access denied');
   next();
}