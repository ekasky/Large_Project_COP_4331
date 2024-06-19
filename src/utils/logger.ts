import fs from "fs";
import path from "path";
import express, { Request, Response, NextFunction } from "express";

const logFilePath = path.resolve(__dirname, '../../server.log');

const logger = (req:Request, res:Response, message:string):void => {

    const start = Date.now();

    res.on('finish', () => {

        const responseTime = Date.now() - start;
        const timestamp = new Date().toISOString();
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
        const method = req.method;
        const url = req.originalUrl;
        const code = res.statusCode;
        const userAgent = req.headers['user-agent'] || 'unknown';
        const logMessage = `${timestamp} -- IP ADDRESS: ${ip} -- METHOD: ${method} -- URL: ${url} -- STATUS CODE: ${code} -- USER AGENT: ${userAgent} -- RESPONSE TIME: ${responseTime}ms -- MESSAGE: ${message}\n`;

        fs.appendFile(logFilePath, logMessage, (error) => {

            if(error) {
                console.error('ERROR WRITING TO THE LOG FILE:', error);
            }

        });

        // Log to the console as well
        console.log(logMessage);

    });

};

export default logger;