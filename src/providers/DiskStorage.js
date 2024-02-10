const fs = require('fs');
const path = require('path');
const uploadConfig = require('../config/upload');
const AppError = require('../utils/AppError');

class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    );

    return file;
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

    const fileExists = await fs.promises.stat(filePath);

    if(fileExists) {
      await fs.promises.unlink(filePath);
    } else {
      throw new AppError("File not exists", 401);
    }
  } 
}

module.exports = DiskStorage;