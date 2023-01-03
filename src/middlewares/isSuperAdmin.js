import Jwt from "jsonwebtoken"

const isSuperAdmin = (req, res, next) => {

    const headerToken = req.headers['authorization']

    if(headerToken != undefined && headerToken.startsWith('Bearer ')){
        const bearerToken = headerToken.slice(7)

        
        try{
            const tokenValido = Jwt.verify(bearerToken, process.env.SECRET_KEY)
            const objRoles = JSON.parse(tokenValido.roles).roles


            if(objRoles.includes('superadmin')){
                next()
            }
            else{
                res.status(401).json({
                    msg:'Does not fulfill the roles'
                })
            }

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

export default isSuperAdmin