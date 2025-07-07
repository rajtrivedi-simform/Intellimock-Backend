import multer from 'multer';
import { Router } from 'express';
import { getUserDetailsById, resumeUpload, userProfile } from './user.service';

const router = Router();
const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
      cb(null, `${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.get('/', getUserDetailsById);
router.post('/profile', userProfile);
router.post('/resume', upload.single('resumeFile'), resumeUpload);

export default router;
