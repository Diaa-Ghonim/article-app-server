import { Request, Response } from 'express';
import { BaseController } from '../BaseController';

export default new (class ImageController extends BaseController {
  constructor() {
    super();
  }
  /**
   *
   * @param request
   * @param response
   *
   * this method to handle images that uploaded in article from tinymce
   */
  uploadImages(request: Request, response: Response) {
    // let files = request.files as Express.Multer.File[]
    let { url } = request.cloudinaryResult;
    response.endWithSuccess(201, {
      location: url,
    });
  }
})();
