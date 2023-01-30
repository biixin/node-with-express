import {Request, Response} from 'express'
import Accounts from '../models/Accounts'
import Repository from '../models/Formulario'

export const index = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        const { q } = req.query

        const user = await Accounts.findById(user_id)

        if (!user) {
            return res.status(404).json()
        }

        let query = {};


        if(q) {
            query = { url: {$regex: q}}
        }

        const repositories = await Repository.find({
            userId: user_id,
            ...query
        })

        return res.json(repositories)

    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Internal server error."})
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params
        const { name, url } = req.body

        const user = await Accounts.findById(user_id)

        if (!user) {
            return res.status(404).json()
        }

        const hasRepository = await Repository.findOne({
            url: url
        })
        
        if(hasRepository) {
            return res.status(422).json({message: `Repository ${name} already exists`})
        }

        if(!hasRepository) {
            const newRepository = await Repository.create({
                name,
                url,
                userId: user_id
            })
            return res.status(201).json(newRepository)
        }

        

    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Internal server error."})
    }
}

export const destroy = async (req: Request, res: Response) => {
    try {
        const { user_id, _id } = req.params;

        const user = await Accounts.findById(user_id);

        if(!user) {
            return res.status(404).json()
        }

        const repository = await Repository.findOne({
            _id: _id
        })

        if(!repository) {
            return res.status(404).json()
        }

        await repository.deleteOne()

        return res.status(200).json(repository)
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Internal server error."})
    }
}