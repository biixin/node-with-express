import {Request, Response} from 'express'
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
import Accounts from '../models/Accounts'

const bcrypt = require('bcrypt');

dotenv.config()


export const ping = (req: Request, res: Response) => {
    res.json({pong: true})
}

export const Login = async (req: Request, res: Response) => {
    try {
        if(req.body.username && req.body.password) {
            let username: string = req.body.username
            let password: string =  req.body.password
            
    
            const user = await Accounts.findOne({
                username: username,
            })
            
            if(!user) {
                return res.json({status: false, message: 'Usuário não encontrado.'})
            }

            if(user) {
                if(await bcrypt.compare(password, user?.password)) {
                    const token = JWT.sign(
                        {id: user._id, username: user.username},
                        process.env.JWT_SECRET_KEY as string,
                        {expiresIn: '1h'}
                    )
                    res.json({status: true, user, token})
                } else {
                    res.json({status: false})
                }
            }
            
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Internal server error."})
    }
    
}

export const AccountREQUEST = async (req: Request, res: Response) => {
    if(req.body.username) {
        let username: string = req.body.username
    
        let user = await Accounts.findOne({
            username: username
        });

        res.json({user})
    }
}

export const Register = async (req: Request, res: Response) => {
    try {
        if(req.body.username && req.body.password) {
            let {username, password} = req.body;
            const salt = await bcrypt.genSalt(10)
            const passHASH = await bcrypt.hash(password, 10)
            
            let hasUser = await Accounts.findOne({username: username});
    
            if(hasUser) {
                return res.json({message: 'Usuário já cadastrado', status: false})
            }

            const newUser = new Accounts({
                username: username,
                password: passHASH
            })
            newUser.save()
            return res.status(201)
            .json({id: newUser._id, user: newUser.username, status: true, message: 'Conta criada com sucesso.' });

        } 
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Internal server error."})
    }
}