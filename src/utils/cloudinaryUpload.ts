import { cloudinary } from "../configs/cloudinary.config";

export const uploadBufferToCloudinary = (
  buffer: Buffer,
  folder: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error || !result?.secure_url) {
          return reject(error || new Error("Cloudinary upload failed"));
        }
        return resolve(result.secure_url);
      }
    );

    stream.end(buffer);
  });
};
