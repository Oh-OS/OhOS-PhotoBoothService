import sequelize from '../config/config';
import PhotoModel from './photo'; // Photo 모델 파일 추가

// Photo 모델 초기화 및 연결
const Photo = PhotoModel(sequelize);

// 모델간의 관계 설정 (필요시)
// Photo.associate(db);

// 모든 모델에 대한 동기화
(async () => {
    try {
        await sequelize.sync();
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to synchronize the database:', error);
    }   
})();

export { Photo };
