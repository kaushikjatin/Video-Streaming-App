const jwt=require('jsonwebtoken')

const checkAuth = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET_KEY_JWT, (err, user) => {
            if (err) {
                return res.status(403).send({message:'Forbidden 403'});
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).send({message:'Unautorised'});
    }
}

module.exports={checkAuth};