import {Request, Response} from 'express'
import Formulario from '../models/Formulario'



export const read = async (req: Request, res: Response) => {
    try {
        const page = req.query["page"] as unknown as number
        const limit = req.query["limit"] as unknown as number
        const { q } = req.query

        let query = {};

        if(q) {
            query = { email: {$regex: q}}
        }

        const games = await Formulario.find({
            ...query
        }).skip(limit * (page - 1)).limit(limit)

        const gamesTotal = await Formulario.find({
            ...query
        }).limit(0)

        return res.json({games, gamesTotal})

    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Internal server error."})
    }
}




export const create = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body

        const user = await Formulario.findOne({
            email: email
        })

        if (user) {
            return res.json({message: 'Usuário já cadastrado', status: false})
        }
        

        
        const newForm = await Formulario.create({
            name,
            email
        })
        return res.status(201).json({newForm, status: true})

    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Internal server error."})
    }
}

export const destroy = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const form = await Formulario.findOne({
            email: id
        });

        if(!form) {
            return res.status(404).json()
        }

        await form.deleteOne()

        return res.status(200).json({status: true})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Internal server error."})
    }
}