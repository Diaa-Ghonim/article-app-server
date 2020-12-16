import { cloudinary } from '../../config/cloudinary.config';
import { Request, Response, NextFunction } from 'express';
export default async function (request: Request, response: Response, next: NextFunction) {
  try {
    if (request.file) {
      console.log(request.files);
      console.log(request.file);
      const result = await cloudinary.uploader.upload(request.file.path, {
        folder: '/images',
        unique_filename: true,

      });
      console.log(result);
      // request.file = result;
      request.cloudinaryResult = result;
    }
    next();
  } catch (error) {
    console.log(error);

    next(error);
  }
}

