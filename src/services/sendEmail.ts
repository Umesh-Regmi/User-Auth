import nodemailer from 'nodemailer'
import { envConfig } from '../config/config'

interface Idata{
    to:string,
    subject:string,
    text:string
}

const sendEmail = async(data:Idata) => {
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:envConfig.email,
            pass:envConfig.password
        }
    })

    const mailOptions = {
        from:"digitalpathshala<regmiumesh6@gmail.com>",
        to:data.to,
        subject:data.subject,
        text:data.text
    }

    try {
    await transporter.sendMail(mailOptions) 
    } catch(error)
    {
        console.log(error)
    }
}

export default sendEmail