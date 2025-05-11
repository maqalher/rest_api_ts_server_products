import { exit } from 'node:process'
import db from '../config/db'

// Eliminar db cada vez que se hacem pruebas
const clearDB = async () => {
    try {
        await db.sync({force:true})
        console.log('Datos eliminados correctamante');
        exit() // finaliza sin error
    } catch (error) {
        console.log(error);
        exit(1) // finaliza con error
    }
}

if(process.argv[2] === '--clear'){
    clearDB()
}

// console.log(process.argv);
// [
//   'C:\\Users\\thinkpad\\Desktop\\React\\React JP\\14_rest_api_ts_server\\node_modules\\ts-node\\dist\\bin.js',
//   'C:\\Users\\thinkpad\\Desktop\\React\\React JP\\14_rest_api_ts_server\\src\\data', 
//   '--clear'
// ]
