import { ExpectedFieldsReturn } from "./interfaces";


export class MissingFieldsError extends Error {

    missingFields: ExpectedFieldsReturn['missingFields'];

    constructor(message:string, missingFields:ExpectedFieldsReturn['missingFields']) {
        super(message);
        this.name = 'MissingFieldsError';
        this.missingFields = missingFields;
    }

};

export class IncorrectTypesError extends TypeError {
  
    incorrectTypes: ExpectedFieldsReturn['incorrectTypes'];

    constructor(message:string, incorrectTypes:ExpectedFieldsReturn['incorrectTypes']) {
        super(message);
        this.name = 'IncorrectTypesError';
        this.incorrectTypes = incorrectTypes;
    }
    
};

export class MissingFieldsAndIncorrectTypesError extends Error {

    expectedFields:ExpectedFieldsReturn;

    constructor(message:string, expectedFields:ExpectedFieldsReturn) {
        super(message);
        this.name = 'MissingFieldsAndIncorrectTypesError';
        this.expectedFields = expectedFields;
    }

};

export class InvalidEmailFormatError extends Error {
  
    constructor(message:string) {
        super(message);
        this.name = 'InvalidInputFormat';
    }
    
};