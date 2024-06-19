import fs from "fs";
import path from "path";

const logFilePath = path.resolve(__dirname, '../../server.log');

const logger = (message:string):void => {

    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp}: ${message}`;

    fs.appendFile(logFilePath, logMessage, (error) => {

        if(error) {
            console.log('ERROR WRITING TO THE LOG FILE: ', error);
        }

    });

    // Log to the console as well
    console.log(logMessage);

};

export default logger;