import multer from 'multer';

const uploadAvatar = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 400 * 1024
  },
  fileFilter: (_req, file, callback) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.mimetype)) return callback(new Error('Unsupported media type'));

    callback(null, true);
  }
});

export { uploadAvatar };
