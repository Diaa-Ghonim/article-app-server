
// const cloudinary = require('cloudinary').v2;
import { v2 as cloudinary } from 'cloudinary';
// const cloudinary = v2;
cloudinary.config({
  cloud_name: 'abo-mandella',
  api_key: '719215592854856',
  api_secret: 'bspEe4Te2QxvJMla5TFfb22-oD8'
});
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

export { cloudinary };