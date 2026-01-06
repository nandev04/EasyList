import sharp from 'sharp/lib';

const processAvatarImage = async (fileBuffer: Buffer) => {
  return sharp(fileBuffer)
    .rotate()
    .resize(256, 256, { fit: 'cover', position: 'center' })
    .flatten({ background: '#0E0E0E' })
    .webp({ quality: 80, effort: 4 })
    .toBuffer();
};

export default processAvatarImage;
