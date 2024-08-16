import { getRepository } from "typeorm";
import User from "../models/User";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";


interface Request {
    email:string;
    password:string;
}

interface Response {
    user: User;
    token:string;
}
class  AuthenticateUserService {
    public async execute ({ email, password }: Request): Promise<Response>{

        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: { email }
        });

        if (!user) {
            throw new Error(`Incorrect email/password combination! `);
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new Error(`Incorrect email/password combination! `);
        }

        const token = sign({}, '5f956917c2a24e1317695eaef0c86838',{
            subject: user.id,
            expiresIn: '1d'
        } );
        // Since the sign method doesn't return a promise, threre is no need to use await
        return{
            user,
            token,
        };
    }
}

export default AuthenticateUserService;
