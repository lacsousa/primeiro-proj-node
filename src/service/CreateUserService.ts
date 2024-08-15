import { getRepository } from "typeorm";
import { hash } from "bcryptjs";
import User from "../models/User";

interface Request {
    name: string;
    email: string;
    password?: string;
}

// Install this library for to encrypt the password
//  - yarn add bcryptjs
// And then install
// yarn add -D @types/bcryptjs
class CreateUserService {
    public async execute({ name, email, password }): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: { email },
        });

        if (checkUserExists) {
            throw new Error(
                `User ${name} already exists with this email ${email}`,
            );
        }

        const hashPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashPassword,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;
