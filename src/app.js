import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';
import db from './database/connection.js';
dotenv.config();

const server = express();
server.use(json());
server.use(cors());

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(chalk.bgMagenta('\n [Node.js/Express] Server connected SUCCESSFULLY! '), '🖥️⚙️✨');
    console.log(chalk.white(' Server connected on PORT: '), chalk.blue.italic.underline(`${port}`));
});