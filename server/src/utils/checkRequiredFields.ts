

const checkRequiredFields = (req:any, expectedFields:string[]):boolean => {

    const missingFields = expectedFields.filter(field => !req.body[field]); 

    if(missingFields.length > 0) {
        return false;
    }

    return true;

};

export default checkRequiredFields;