import { MulterModuleOptions } from '@nestjs/platform-express';

export const multerConfig: MulterModuleOptions = {
  dest: './images',
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter(req, file, callback) {
    if (file.mimetype.match(/\/(jpg|jpeg|png|pdf)$/)) {
      callback(null, true);
    } else {
      return callback(
        new Error('Only .png, .jpg, .jpeg and .pdf format allowed'),
        false,
      );
    }
  },
};
