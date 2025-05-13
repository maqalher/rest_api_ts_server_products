import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'

dotenv.config()

const db = new Sequelize(process.env.DATABASE_URL, {
    models: [__dirname + '/../models/**/*'],
    dialect: 'postgres',  // Asegúrate de usar el dialecto correcto (postgres, mysql, sqlite, etc.)
    protocol: 'postgres', // Esto puede ser necesario en algunas configuraciones
    logging: false, // Para deshabilitar el log de consultas SQL si no lo necesitas
})

export default db