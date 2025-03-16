import User from "../database/models/userModel";
import { Request, Response } from "express";
import sequelize from "../database/connection";
import bcrypt from 'bcrypt'
import generateToken from "../services/generateToken";
import { generateOtp } from "../services/generateOtp";
import sendEmail from "../services/sendEmail";



class UserController{
    public static async register(req:Request,res:Response){
        //incoming user data receive 
        const {username,email,password} = req.body
        if(!username || !email || !password){
            res.status(400).json({
                message : "Please provide username,email,password"
            })
            return
        }
       
        await User.create({
            username, 
            email, 
            password:bcrypt.hashSync(password, 10)
    
        })
        

        res.status(201).json({
            message : "User registered successfully"
        })
    }

    static async login(req:Request, res:Response){
        // accept incommming data - email, password
        const {email, password} = req.body
        if(!email || !password){
            res.status(400).json({message:"Please provide email, password."})
            return
        }
        // check email exists or not
        const [user] = await User.findAll({
            where:{
                email:email
            }
        })
        // if email exists, check password too
        if(!user){
            res.status(404).json({message:"No user with that email"})
        }
        else{
         const isEqual = bcrypt.compareSync(password, user.password)  
         if(!isEqual){
            res.status(400).json({message:"Invalid password"})
        } 
        else{

            // if password is correct, generate token.
            const token = generateToken(user.id)
            res.status(400).json({message:"Logged in success",
                token
            })
        }
                
        }
    }

    // forgot password
    static async handleForgotPassword(req:Request, res:Response){
        const {email} = req.body
        if(!email){
            res.status(400).json({message:"Please provide email."})
        }
        
        const [user] = await User.findAll({
            where:{
                email:email
            }
        })
        if(!user){
             res.status(404).json({message:"email is not registered"})
        }
        // generate otp, send into mail
       const otp = generateOtp()
       await sendEmail({
        to:email,
        subject:"Pathshala password change request",
        text:`Your password change request. Here is your otp ${otp}`
       })
     res.status(200).json({message:"Password request otp sent"})

    }
    // verify email
}
export default UserController
