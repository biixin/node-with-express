import {Request, Response} from 'express'
import Accounts from '../models/Accounts'

const bcrypt = require('bcrypt');

export const index = async (req: Request, res: Response) => {
    try {
        const users = await Accounts.find()
        return res.json(users)

    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Internal server error."})
    }
}

export const show = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = await Accounts.findOne({username: id});

        if(!user) {
            return res.status(404).json()
        }

        return res.json(user)

    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Internal server error."})
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const {username, password} = req.body;
        
        const user = await Accounts.findOne({username});

        if(user) {
            return res
            .status(422)
            .json({message: `User ${username} already exists.`})
        }
        
        const passHASH = await bcrypt.hash(password, 10)
        const newUser = new Accounts({
            username: username,
            password: passHASH
        })
        newUser.save()

        return res.status(201).json(newUser)
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Internal server error."})
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { username, password } = req.body;

        const user = await Accounts.findOne({username: id});

        if(!user) {
            return res.status(404).json()
        }

        const passHASH = await bcrypt.hash(password, 10)

        await user.updateOne({
            username: username,
            password: passHASH
        })

        return res.status(200).json()
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Internal server error."})
    }
}

export const destroy = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await Accounts.findOne({username: id});

        if(!user) {
            return res.status(404).json()
        }

        await user.deleteOne()

        return res.status(200).json()
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Internal server error."})
    }
}

