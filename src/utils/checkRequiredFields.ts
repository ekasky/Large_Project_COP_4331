import { Request } from "express";

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

const checkRequiredFields = (req:Request, expectedFields:ExpectedFields[]):ExpectedFieldsReturn | null => {

    const result:ExpectedFieldsReturn = {
        missingFields: [],
        incorrectTypes: []
    };

    expectedFields.forEach( field => {

        // Check if the required field is in the request bosy
        if( !(field.name in req.body) ) {

            result.missingFields.push(field.name);

        }
        else {

            if(typeof req.body[field.name] !== field.type) {

                result.incorrectTypes.push({
                    field: field.name,
                    expected: field.type
                });

            }

        }

    });


    if(result.missingFields.length > 0 || result.incorrectTypes.length > 0) {
        return result;
    }

    return null;

};

export default checkRequiredFields;