const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next)=>{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({message: "Authentication token required"});
    }

    jwt.verify(token, process.env.tokenSecret, (err, user) =>{
        if(err){
            return res.status(403).json({message: "Token expired, login again!"});
        }
        req.user = user;
        next();
    });
};
 
module.exports = authenticateToken;