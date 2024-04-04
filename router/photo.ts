import express, { Request, Response } from 'express';
import fs from 'fs';
import multer from 'multer'; // multer를 사용하여 formdata 처리
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Photo } from '../model'; // Photo 모델 파일 추가

const router = express.Router();

// Multer 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}_${uuidv4()}_${file.originalname}`;
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

router.get('/photos', async (req: Request, res: Response) => {
    try {
        const photos = await Photo.findAll();
        res.json(photos);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/photos/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const photo = await Photo.findByPk(id);
        if (!photo) {
            res.status(404).json({ message: '포토를 찾을 수 없습니다.' });
            return;
        }
        res.json(photo);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// formdata 처리를 위해 multer 미들웨어를 추가
router.post('/photos', upload.single('photo'), async (req: Request, res: Response) => {
    try {

        if (!req.file) {
            res.status(400).json({ message: '이미지를 업로드해야 합니다.' });
            return;
        }

        // 업로드된 파일 정보
        const { filename, path: filePath } = req.file;

        const newPhoto = await Photo.create({
            originalName: filename,
            imagePath: path.relative(path.join(__dirname, '..'), filePath), // 이미지 파일 경로 저장
        });
        res.status(201).json(newPhoto);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
