import multer from 'multer';
import { Router } from 'express';
import {
  getProfile,
  getUserDetailsById,
  getUserSkills,
  querySkills,
  resumeUpload,
  userProfile,
} from './user.service';

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
router.get('/profile', getProfile);
router.post('/profile', userProfile);
router.post('/resume', upload.single('resumeFile'), resumeUpload);
router.get('/skills', querySkills);
router.get('/skill', getUserSkills);

export default router;
