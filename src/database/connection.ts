import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config";
import User from './models/userModel'


const sequelize = new Sequelize(envConfig.connectionString as string,{
    models : [__dirname + '/models']
})
try{
    sequelize.authenticate()
    .then(()=>{
        console.log("Database successfully connected")
    })

.catch(err=>{
    console.log("Database not connected", err)
})
}
catch(error){
 console.log(error)
}

sequelize.sync({force : false,alter:false}).then(()=>{
    console.log("synced !!")
})

export default sequelize