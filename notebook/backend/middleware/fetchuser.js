const jwt = require('jsonwebtoken');
const JWT_SECRET="helloitisbackend";
const  fetchuser = (req,res,next) =>{

        const token  =  req.header("jwtdata");
        if(!token){
            res.status(401).send({error:"it's don't valid authtoken"})
        }
        try {
            const data = jwt.verify(token,JWT_SECRET)
            req.user=data.user;
            next()
        } catch (error) {
        console.error("some error find");
      res.status(500).json({ error: 'Internal server error' });
        }
       
}

module.exports = fetchuser;