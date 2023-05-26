import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';
// import db from './database/connection.js';
import router from './routes/index.routes.js';
dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.use(router);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(chalk.bgMagenta('\n [Node.js/Express] Server connected SUCCESSFULLY! '), '🖥️⚙️✨');
    console.log(chalk.white(' Server connected on PORT:'), chalk.blue.italic.underline(`${port}`));
});