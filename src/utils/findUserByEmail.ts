import { UserDocument, User } from "../model/User";


const findUserByEmail = async (email:string):Promise<UserDocument | null> => {

    try {

        // Attempt to find a user by their email address
        const user = await User.findOne({email});

        return user;

    }
    catch(error) {

        return null;

    }

};

export default findUserByEmail;