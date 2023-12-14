const jwt = require('jsonwebtoken')

const SECRETKey = 'Topsecret100'

const authentication = (req,res,next) =>{
    const authHeader = req.headers.authorization
    
    if(authHeader){
        const token = authHeader.split(' ')[1]
        console.log('Received Token:', token);
        if(token){
            jwt.verify(token,SECRETKey,(err,user) =>{
                if(err){
                    
                    return res.sendStatus(403)
                }
                req.user = user
                next()
            })
        }else{
            return res.sendStatus(401)
        }
       
    }else{
        return res.sendStatus(401)
    }
  
}

module.exports = {
    SECRETKey,
    authentication
}