export interface PasswordRequirements {
    minLength: number,
    minLowerCase: number,
    minUpperCase: number,
    minNumbers: number,
    minSymbols: number
};

export interface ExpectedFields {

    name: string;
    type: 'string' | 'number' | 'boolean';

};

export interface ExpectedFieldsReturn {

    missingFields: string[],
    incorrectTypes: {
        field: string,
        expected: string
    }[]

};
