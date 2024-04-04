import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_SCHEMA!, process.env.DB_USERNAME!, process.env.DB_PW!, {
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!),
    dialect: 'mysql',
});

// 연결 테스트
sequelize
    .authenticate()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

export default sequelize;