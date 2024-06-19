

export class MissingFieldsError extends Error {

    constructor(message:string) {
        super(message);
        this.name = 'MissingFieldsError';
    }

};

export class IncorrectTypesError extends TypeError {
  
    constructor(message:string) {
        super(message);
        this.name = 'IncorrectTypesError';
    }
    
};

export class MissingFieldsAndIncorrectTypesError extends Error {

    constructor(message:string) {
        super(message);
        this.name = 'MissingFieldsAndIncorrectTypesError';
    }

};