import Jwt from "jsonwebtoken"

const validateToken = (req, res, next) => {

    const headerToken = req.headers['authorization']

    if(headerToken != undefined && headerToken.startsWith('Bearer ')){
        const bearerToken = headerToken.slice(7)

        try{
            const tokenValido = Jwt.verify(bearerToken, process.env.SECRET_KEY)
            next()
        }   
        catch{
            res.status(401).json({
                msg:'Unauthorized'
            })
        }
    }
    else{
        res.status(403).json({
            error:'No token provided'
        })
    }
}

export default validateToken