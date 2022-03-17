import fs from 'fs';
import fsPromises from 'fs/promises';
import config from './config.js';
import { join, extname } from 'path';
const {
    dir: {
        publicDIrectory
    }
} = config

export class Service {
    createFileStream(fileName) {
        fs.createReadStream(fileName)
    }

    async getFileInfo(file) {
        // file = home/index.html
        const fullFilePath = join(publicDIrectory, file);
        // valida se existe, se não existe estoura erro!
        await fsPromises.access(fullFilePath);
        const fileType = extname(fullFilePath);

        return {
            type: fileType,
            name: fullFilePath
        }

    }

    async getFileStream(file) {
        const {
            type,
            name
        } = this.getFileInfo(file);

        return {
            stream: this.getFileStream(name),
            type
        }
    }
}