import multer from 'multer';

const multerStorage = multer.diskStorage({
  filename: (_req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  },
})

export const imagesUpload = multer({ storage: multerStorage })
