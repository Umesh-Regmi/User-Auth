import app from "./src/app";
import { envConfig } from "./src/config/config";

function startServer(){
    const port = envConfig.port
app.listen(port, ()=>{
    console.log('Server has started at port 3000')
})
}
startServer()

//kcc@@12345AUmea

// Ram@1234556Sktr