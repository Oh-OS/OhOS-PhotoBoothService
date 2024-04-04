import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface PhotoAttributes {
    id: number;
    originalName: string;
    imagePath: string;
}

interface PhotoCreationAttributes extends Optional<PhotoAttributes, 'id'> {}

export default (sequelize: Sequelize) => {
    return sequelize.define<Photo, PhotoAttributes>('Photo', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        originalName: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        imagePath: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
    }, {
        tableName: 'photos' // 테이블 이름 지정
    });
};

// Photo 모델 타입
export type Photo = Model<PhotoAttributes, PhotoCreationAttributes>;
