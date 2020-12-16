import multer, { MulterError } from 'multer';
import { NextFunction, Request, Response } from 'express';
import path from 'path';
// console.log(path.resolve(__dirname, '../../../../../images'));
// console.log(path.join(__dirname, '..', '..', '..', '..', '..', 'images'));

/** --------------------------- multer storage -------------------------------*/
const storage = multer.diskStorage({
  destination(req: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) {
    callback(null, path.resolve(__dirname, '../../../../../images'));
  },
  filename(req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {
    callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

/** --------------------------- file filter -------------------------------*/

const fileFilter = function (req: Request, file: Express.Multer.File, callback: any) {
  const fileTypes = /jpg|jpeg|png|gif|jfif/;
  const extname = fileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = fileTypes.test(file.mimetype);
  if (extname && mimetype) {
    callback(null, true);
  } else {
    callback(new Error('error image type'));
  }
};

/** --------------------------- init multer upload -------------------------------*/

const upload = multer(
  {
    storage,
    fileFilter,
    limits: {
      fileSize: 5000000,
    },
  }
);

/** --------------------------- multer middleware -------------------------------*/

// after previous specific there are some of validation on uploaded photos

const CustomMulter = (req: Request, res: Response, next: NextFunction) => {
  upload.single('image')(req, res, (err: any) => {
    console.log(err);

    if (err instanceof multer.MulterError) {
      console.log('upload image error', err.message);

      next(err);
    } else if (err) {
      next(err)
    }
    // console.log(req.file);
    // console.log(req.files);

    next();
  });
};
export default CustomMulter;
