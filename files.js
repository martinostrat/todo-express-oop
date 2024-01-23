import fs from 'node:fs/promises';

class FileManager {

    async writeFile(filename, data) {
        try {
            // Convert data to json
            data = JSON.stringify(data, null, 2);

            await fs.writeFile(filename, data);
        } catch (error) {
            console.log(error);
        }
    }

    async readFile(filename) {
        try {
            // Get data from file in text format
            const fileContent = await fs.readFile(filename, 'utf-8');

            const fileData = JSON.parse(fileContent);
            return fileData;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}

export const fileManager = new FileManager();