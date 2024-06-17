import { User, UserDocument } from "../model/User";

const findUserByUsername = async (username:string):Promise<UserDocument | null> => {


    try {

        // Attempt to find the user by username
        const user = await User.findOne({username});

        return user;

    }
    catch(error) {

        return null;

    }


};

export default findUserByUsername;