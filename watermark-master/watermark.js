import Jimp from 'jimp';

export default function watermark(inputImage, watermarkImage, maxWidth = 450) {
  const inputP = Jimp.read(inputImage);
  const watermarkP = Jimp.read(watermarkImage);

  return Promise.all([inputP, watermarkP]).then((data) => {
    const width = Math.min(maxWidth, data[0].bitmap.width);
    const watermarkHeight = data[1].bitmap.height;
    const height = Math.ceil(data[0].bitmap.height * (width / data[0].bitmap.width));
    return data[0].resize(width, Jimp.AUTO)
                  .composite(data[1], 0, height - watermarkHeight);
  });
}

