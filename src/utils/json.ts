import fs from 'fs';
import path from 'node:path';

/**
 * Parse a JSON file and return the content as an array.
 * @param {fs.PathLike} filePath the path to the JSON file
 * @param {Array} defaultArray the default value to return if the file does not exist
 * @returns {Array} the content of the JSON file as an array
 */
export const parse = (filePath: fs.PathLike, defaultArray = []): Array<any> => {
    if (!fs.existsSync(filePath)) {
        return defaultArray;
    }
    const fileData = fs.readFileSync(filePath, 'utf8');
    try {
        return JSON.parse(fileData);
    } catch (err) {
        return defaultArray;
    }
};

/**
 * Serialize an object to a JSON file.
 * @param {fs.PathLike} filePath the path to the JSON file
 * @param {any} object the object to serialize
 */
export const serialize = (filePath: fs.PathLike, object: any): void => {
    const objectSerialized = JSON.stringify(object);
    createPotentialLastDirectory(filePath.toString());
    fs.writeFileSync(filePath, objectSerialized);
};

/**
 * Create the potential last directory of a file path.
 * @param {String} filePath the file path
 */
const createPotentialLastDirectory = (filePath: String): void => {
    const pathToLastDirectory = filePath.substring(
        0,
        filePath.lastIndexOf(path.sep)
    );
    if (fs.existsSync(pathToLastDirectory)) return;
    fs.mkdirSync(pathToLastDirectory);
};
