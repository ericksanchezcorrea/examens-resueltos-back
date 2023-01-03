import {pool} from '../../db.js'
import bcrypt from 'bcrypt'
import Jwt  from 'jsonwebtoken'
import {v4 as uuid} from 'uuid'


export const createAdmin = async (req, res) =>{
    
    try{
        const id = uuid()
        const { email, password, roles } = req.body
        
        if(roles == undefined) return res.status(500).json({message:"no hay roles definidos para el usuario"}) 
        
        const [users] = await pool.query('SELECT * FROM usuarios WHERE email=?', [email])
        
        if(!users.length == 0) return res.status(400).json({message:"User already exits"})
        
        const hashedPassword = await bcrypt.hash(password,10)
        const roleString = JSON.stringify(roles)
        
        const [rows] = await pool.query('INSERT INTO usuarios(email, password, roles, id) VALUES(?, ?, ?, ?)', [email, hashedPassword, roleString, id])

        res.status(200).json({
            id,   
            email,
            password,
            roles
        })
    }
    catch(error){
        return res.status(500).json({message:'Something goes wrong'})
    }
}

export const singUp = async (req, res) =>{
    
    try{
        let id = uuid()
        const { email, password } = req.body
        
        const [users] = await pool.query('SELECT * FROM usuarios WHERE email=?', [email])
        if(!users.length == 0) return res.status(400).json({message:"User already exits"})

        const hashedPassword = await bcrypt.hash(password,10)

        const [rows] = await pool.query('INSERT INTO usuarios(email, password, roles, id) VALUES(?, ?, ?, ?)', [email, hashedPassword, '{"roles":["user"]}', id])

        res.status(200).send({
            id,
            email,
            password,
            roles: ["user"]
        })
    }
    catch(error){
        return res.status(500).json({message:'Something goes wrong'})
    }
}

export const loginUser = async (req, res) =>{
    
    const {email, password} = req.body

    try{
        const [users] = await pool.query('SELECT * FROM usuarios WHERE email=?', [email])
    
        if(users.length == 0){
            res.send({
                msg:'Unregistered user'
            })
        }
    
        else{
            const userPassword = users[0].password
            const result = await bcrypt.compare(password,userPassword)
            
            if(result){
                const token = Jwt.sign({email:email, roles:users[0].roles},process.env.SECRET_KEY, {
                    expiresIn:'86400s'
                })
                res.json({token})
            }
            else{
                res.send('Incorrect password')
            }
        }
    }

    catch(error){
        return res.status(500).json({message:'Something goes wrong'})
    }
}

export const updatePassword = async (req, res) =>{

    const {email, password, newpassword} = req.body

    try{
        const [users] = await pool.query('SELECT * FROM usuarios WHERE email=?', [email])
    
        if(users.length == 0) {res.send({ msg:'Unregistered user'}) }

        const coincide = await bcrypt.compare(password, users[0].password)
        if(!coincide) {res.status(401).json({ message:'Password does not match'}) }


        const hashedPassword = await bcrypt.hash(newpassword,10)
        const [result] = await pool.query('UPDATE usuarios SET password = IFNULL(?, password) WHERE id=?', [hashedPassword, users[0].id])
        if(result.affectedRows === 0) return res.status(404).json({message:'User not found'})

        const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [users[0].id])

        res.json(rows[0])
    }

    catch(error){
        return res.status(500).json({message:'Something goes wrong'})
    }
}

export const deleteUser = async (req, res) => {
    try{
        const [result] = await pool.query('DELETE FROM usuarios WHERE ID= ?', [req.params.id])
        if(result.affectedRows <= 0) return res.status(404).json({message:'User not found'}) 
        res.sendStatus(204)
    }
    catch(error){
        return res.status(500).json({message:'Something goes wrong'})
    }
}