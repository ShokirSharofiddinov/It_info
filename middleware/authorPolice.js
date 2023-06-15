

module.exports = function(req,res,next){
    if(req.method == "OPTIONS"){
        next()
    }
}