import fs from "fs";
import path from "path";
import express, { Request, Response, NextFunction } from "express";

const logFilePath = path.resolve(__dirname, '../../server.log');

const requestLogger = (req:Request, message:string, level:string="INFO"):void => {


    const timestamp = new Date().toISOString();
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    const method = req.method;
    const url = req.originalUrl;
    const userAgent = req.headers['user-agent'] || 'unknown';
    const logMessage = `${timestamp} -- IP ADDRESS: ${ip} -- METHOD: ${method} -- URL: ${url} -- USER AGENT: ${userAgent} -- MESSAGE: [${level}]: ${message}\n`;

    fs.appendFile(logFilePath, logMessage, (error) => {

        if(error) {
            console.error('ERROR WRITING TO THE LOG FILE:', error);
        }

    });

    // Log to the console as well
    console.log(logMessage);


};

export default requestLogger;