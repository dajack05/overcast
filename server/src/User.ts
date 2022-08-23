import { PrismaClient } from "@prisma/client";
import Joi from "joi";
import bcrypt from "bcrypt";
import { joinKeys } from "unstorage";

export interface User {
    id: number;
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    password: string;
    dob: Date;
}

export interface AddUserParams {
    email: string;
    phone: string;
    dob: Date;
    first_name: string;
    last_name: string;
    password: string;
    confirmPassword: string;
}

const AddUserSchema = Joi.object({
    dob: Joi.date().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

export interface DeleteUserParams {
    email: string;
}

const DeleteUserSchema = Joi.object({
    email: Joi.string().email().required(),
})

export interface LoginUserParams {
    email: string;
    password: string;
}

const LoginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export interface LoginToken {
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    dob: Date;
}

const client = new PrismaClient();

export class UserDataSource {
    static async HashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    static async ValidatePassword(
        password: string,
        hash: string
    ): Promise<boolean> {
        return await bcrypt.compare(hash, hash);
    }

    static async add(data: AddUserParams) {
        const params: AddUserParams = await AddUserSchema.validateAsync(data);
        const result = await client.user.create({
            data: {
                dob: params.dob,
                email: params.email,
                first_name: params.first_name,
                last_name: params.last_name,
                phone: params.phone,
                password: await UserDataSource.HashPassword(params.password),
            },
        });
        return result;
    }

    static async delete(data: DeleteUserParams): Promise<boolean> {
        const params: DeleteUserParams = await DeleteUserSchema.validateAsync(data);
        await client.user.delete({
            where: {
                email: params.email,
            }
        });
        return true;
    }

    static async login(data: LoginUserParams): Promise<LoginToken | undefined> {
        const params: LoginUserParams = await LoginUserSchema.validateAsync(data);
        const user = await client.user.findUnique({
            where: { email: params.email },
        });
        if (!user) {
            return undefined;
        }
        if (!await UserDataSource.ValidatePassword(params.password, user.password)) {
            return undefined;
        }
        return {
            first_name: user.first_name,
            last_name: user.last_name,
            dob: user.dob,
            email: user.email,
            phone: user.phone,
        };
    }
}
