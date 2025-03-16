require('dotenv').config()

export const envConfig = {
    port: process.env.PORT,
    connectionString: process.env.CONNECTION_STRING,
    jwtSecretKey: process.env.jwt_SECRET_KEY,
    jwtExpiresIn: process.env.jwt_EXPIRES_IN,
    email: process.env.EMAIL,
    password: process.env.PASSWORD
}