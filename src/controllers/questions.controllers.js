import {pool} from '../../db.js'
import {v4 as uuid} from 'uuid'


export const  getQuestion = async (req, res)=>{

    try{
        const [rows] = await pool.query('SELECT * FROM preguntas WHERE ID= ?', [req.params.id])
        if(rows.length <= 0) return res.status(404).json({message: 'Question not found'})

        const newRow = {...rows[0], bloque: JSON.parse(rows[0].bloque)} 
 
        res.json(newRow)
    }
    catch(error){
        return res.status(500).json({message:'Something goes wrong'})
    }
}


export const  getQuestions = async (req, res)=>{

    try{
        const [rows] = await pool.query('SELECT * FROM preguntas')

        const newRows = rows.map(element => {

            let newBlock = JSON.parse(element.bloque)
            
            return{
                ...element, bloque: newBlock
            }
        });
        
        res.json(newRows)
    }
    catch(error){
        return res.status(500).json({message:'Something goes wrong'})
    }

}


export const createQuestion = async (req, res)=>{
    
    
    try{
        let id = uuid()
        const { universidad, año, periodo, curso, pregunta, alternativa_A, alternativa_B, alternativa_C, alternativa_D, alternativa_E, respuesta, solucion, bloque } = req.body

        const newBloque = JSON.stringify(bloque)

        const [ rows ] = await pool.query('INSERT INTO preguntas(universidad, año, periodo, curso, pregunta, alternativa_A, alternativa_B, alternativa_C, alternativa_D, alternativa_E, respuesta, solucion, bloque, id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [universidad, año, periodo, curso, pregunta, alternativa_A, alternativa_B, alternativa_C, alternativa_D, alternativa_E, respuesta, solucion, newBloque, id])

        res.send({
            id,
            año, periodo, curso, pregunta, alternativa_A, alternativa_B, alternativa_C, alternativa_D, alternativa_E, respuesta, solucion, bloque
        })
    }
    catch(error){
        return res.status(500).json({message:'Something goes wrong'})
    }

}


export const deleteQuestion = async (req, res)=>{
    
    try{
        const [result] = await pool.query('DELETE FROM preguntas WHERE ID= ?', [req.params.id])
        if(result.affectedRows <= 0) return res.status(404).json({message:'Question not found'}) 
        res.sendStatus(204)
    }
    catch(error){
        return res.status(500).json({message:'Something goes wrong'})
    }
}


export const updateQuestion = async (req, res)=>{
    
    try{
        const { id }= req.params
        const { año, periodo, curso, pregunta, alternativa_A, alternativa_B, alternativa_C, alternativa_D, alternativa_E, respuesta, solucion, bloque } = req.body

        const newBloque = JSON.stringify(bloque)
    
        const [result] = await pool.query('UPDATE preguntas SET año = IFNULL(?, año), periodo = IFNULL(?, periodo), curso = IFNULL(?, curso), pregunta = IFNULL(?, pregunta), alternativa_A = IFNULL(?, alternativa_A), alternativa_B = IFNULL(?, alternativa_B), alternativa_C = IFNULL(?, alternativa_C), alternativa_D = IFNULL(?, alternativa_D), alternativa_E = IFNULL(?, alternativa_E), respuesta = IFNULL(?, respuesta), solucion = IFNULL(?, solucion), bloque = IFNULL(?, bloque) WHERE id=?', [año, periodo, curso, pregunta, alternativa_A, alternativa_B, alternativa_C, alternativa_D, alternativa_E, respuesta, solucion, newBloque, id])
    
        if(result.affectedRows === 0) return res.status(404).json({message:'Question not found'})
    
        const [rows] = await pool.query('SELECT * FROM preguntas WHERE id = ?', [id])
    
        res.json(rows[0])

    }
    catch(error){
        return res.status(500).json({message:'Something goes wrong'})
    }

}


