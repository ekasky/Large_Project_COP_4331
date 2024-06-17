

const checkRequiredFields = (req:any, expectedFields:string[]):string[] | null => {

    const missingFields = expectedFields.filter(field => !req.body[field]); 

    if(missingFields.length > 0) {
        return missingFields;
    }

    return null;

};

export default checkRequiredFields;