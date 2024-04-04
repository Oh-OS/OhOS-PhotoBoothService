import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import path from 'path';
import sequelize from './config/config';
import photoRouter from './router/photo'; // Photo 라우터 파일 추가

const app: Express = express();
const port: number = 3001;

// cors
const whiteList: string[] = [
    'http://localhost:5500',
    'http://127.0.0.1:5500'
];

const corsOptions: cors.CorsOptions = {
    origin: whiteList,
    credentials: true
};

app.use(cors(corsOptions));

// body parser
app.use(bodyParser.json());

// Photo 라우터 추가
app.use(photoRouter);

// static
app.use(express.static(path.join(__dirname, '/')));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// sequelize
sequelize.sync()
    .then(() => {
        console.log('Database synced');
    })
    .catch((error: any) => {
        console.error('Error syncing database:', error);
    });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
