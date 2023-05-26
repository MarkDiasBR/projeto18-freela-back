import chalk from 'chalk';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { name, port } = databaseNameAndPort(process.env.DATABASE_URL);

async function databaseConnection() {

    const { Pool } = pg;

    const configDatabase = {   
        connectionString: process.env.DATABASE_URL
    };

    let db = new Pool(configDatabase);

    try {
        await db.connect();
        console.log(chalk.black.bgGreen('\n [🐘 PostgreSQL] DataBase connected SUCCESSFULLY! '), '🗄️📨✨')
        console.log(chalk.white(' Database'), chalk.underline.italic.blue(name),chalk.white('connected on PORT:'), 
            chalk.underline.italic.blue(port));
    } catch (err) {
        console.log(chalk.white.bgRed('\n [🐘 PostgreSQL] DataBase connection failed! '), '🗄️📨🚫');
        console.error(err.message);
    }

    return db;
}

const db = await databaseConnection();

export default db;

function databaseNameAndPort(dbString) {
    const nameAndPortArray = dbString.split(':').slice(-1)[0].split('/').reverse();
    return {name: nameAndPortArray[0], port: nameAndPortArray[1]};
}