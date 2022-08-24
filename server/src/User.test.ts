import { PrismaClient } from "@prisma/client";
import {
    describe,
    test,
    expect,
    afterEach,
    afterAll,
    beforeEach,
} from "vitest";
import { UserDataSource } from "./User";

const client = new PrismaClient();
const TestEmail = "test@test.com";

describe("HashPassword", () => {
    test("it hashes an input", async () => {
        const hash = await UserDataSource.HashPassword("test");
        expect(hash).toMatch("$2b$10");
    });
});

describe("VerifyPassword", () => {
    test("matching passwords return true", async () => {
        const password = "password";
        const hash = await UserDataSource.HashPassword(password);
        const result = await UserDataSource.ValidatePassword(password, hash);
        expect(result).toBe(true);
    });

    test("wrong password returns false", async () => {
        const password = "password";
        const hash = await UserDataSource.HashPassword(password);
        const result = await UserDataSource.ValidatePassword("badpassword", hash);
        expect(result).toBe(false);
    });
});

describe("User - add", () => {
    afterEach(async () => {
        if ((await client.user.count({ where: { email: TestEmail } })) > 0) {
            await client.user.delete({ where: { email: TestEmail } });
        }
    });

    test("throws if email is empty", async () => {
        await expect(
            UserDataSource.add({
                email: "",
                dob: new Date(),
                first_name: "first",
                last_name: "last",
                password: "password",
                confirmPassword: "password",
                phone: "1234567890",
            })
        ).rejects.toThrow('"email" is not allowed to be empty');
    });

    test("throws if email is invalid", async () => {
        await expect(
            UserDataSource.add({
                email: "bademail",
                dob: new Date(),
                first_name: "first",
                last_name: "last",
                password: "password",
                confirmPassword: "password",
                phone: "1234567890",
            })
        ).rejects.toThrow('"email" must be a valid email');
    });

    test("throws if email already exists", async () => {
        await client.user.create({
            data: {
                email: TestEmail,
                dob: new Date(),
                first_name: "first",
                last_name: "last",
                password: "password",
                phone: "1234567890",
            },
        });

        await expect(
            UserDataSource.add({
                email: TestEmail,
                dob: new Date(),
                first_name: "first",
                last_name: "last",
                password: "password",
                phone: "1234567890",
                confirmPassword: "password",
            })
        ).rejects.toThrow("Unique constraint failed on the fields: (`email`)");
    });

    test("throws if first name is empty", async () => {
        await expect(
            UserDataSource.add({
                email: TestEmail,
                dob: new Date(),
                first_name: "",
                last_name: "last",
                password: "password",
                confirmPassword: "password",
                phone: "1234567890",
            })
        ).rejects.toThrow('"first_name" is not allowed to be empty');
    });

    test("throws if last name is empty", async () => {
        await expect(
            UserDataSource.add({
                email: TestEmail,
                dob: new Date(),
                first_name: "first",
                last_name: "",
                password: "password",
                confirmPassword: "password",
                phone: "1234567890",
            })
        ).rejects.toThrow('"last_name" is not allowed to be empty');
    });

    test("throws if password is empty", async () => {
        await expect(
            UserDataSource.add({
                email: TestEmail,
                dob: new Date(),
                first_name: "first",
                last_name: "last",
                password: "",
                confirmPassword: "password",
                phone: "1234567890",
            })
        ).rejects.toThrow('"password" is not allowed to be empty');
    });

    test("throws passwords do not match", async () => {
        await expect(
            UserDataSource.add({
                email: TestEmail,
                dob: new Date(),
                first_name: "first",
                last_name: "last",
                password: "password",
                confirmPassword: "password1",
                phone: "1234567890",
            })
        ).rejects.toThrow('"confirmPassword" must be [ref:password]');
    });

    test("throws if dob is missing", async () => {
        await expect(
            UserDataSource.add({
                email: TestEmail,
                dob: undefined,
                first_name: "first",
                last_name: "last",
                password: "",
                confirmPassword: "password",
                phone: "1234567890",
            })
        ).rejects.toThrow('"dob" is required');
    });

    test("throws if phone is empty", async () => {
        await expect(
            UserDataSource.add({
                email: TestEmail,
                dob: new Date(),
                first_name: "first",
                last_name: "last",
                password: "",
                confirmPassword: "password",
                phone: "",
            })
        ).rejects.toThrow('"phone" is not allowed to be empty');
    });

    test("throws if phone is missing", async () => {
        await expect(
            UserDataSource.add({
                email: TestEmail,
                dob: new Date(),
                first_name: "first",
                last_name: "last",
                password: "",
                confirmPassword: "password",
                phone: undefined,
            })
        ).rejects.toThrow('"phone" is required');
    });

    test("valid input results in User", async () => {
        const result = await UserDataSource.add({
            email: TestEmail,
            dob: new Date(),
            first_name: "first",
            last_name: "last",
            password: "password",
            confirmPassword: "password",
            phone: "1234567890",
        });
        expect(result).toStrictEqual({
            id: expect.any(Number),
            email: TestEmail,
            phone: "1234567890",
            first_name: "first",
            last_name: "last",
            password: expect.any(String),
            dob: expect.any(Date),
        });
    });
});

describe("User - Remove", () => {
    test("email is valid", async () => {
        await expect(UserDataSource.delete({ email: "asd" })).rejects.toThrow('"email" must be a valid email');
    })

    test("missing email returns throws error", async () => {
        await expect(UserDataSource.delete({ email: TestEmail })).rejects.toThrow(new RegExp("(Record to delete does not exist)"));
    })

    test("existing email returns true and deletes user", async () => {
        await UserDataSource.add({
            email: TestEmail,
            confirmPassword: "password",
            password: "password",
            dob: new Date(),
            first_name: "first",
            last_name: "last",
            phone: "1234567890"
        });

        const result = await UserDataSource.delete({ email: TestEmail });
        const user_post_delete = await client.user.count({where:{email:TestEmail}});

        expect(result).toBe(true);
        
        expect(user_post_delete).toBe(0);
    })
})

describe("User - Login", () => {
    afterEach(async () => {
        if ((await client.user.count({ where: { email: TestEmail } })) > 0) {
            await client.user.delete({ where: { email: TestEmail } });
        }
    });

    test("email is not empty", async () => {
        await expect(
            UserDataSource.login({ email: "", password: "password" })
        ).rejects.toThrow('"email" is not allowed to be empty');
    });

    test("email is valid email", async () => {
        await expect(
            UserDataSource.login({ email: "asdf", password: "password" })
        ).rejects.toThrow('"email" must be a valid email');
    });

    test("password is not empty", async () => {
        await expect(
            UserDataSource.login({ email: TestEmail, password: "" })
        ).rejects.toThrow('"password" is not allowed to be empty');
    });

    test("non-existant user returns undefined", async () => {
        const user = await UserDataSource.login({
            email: TestEmail,
            password: "password",
        });
        expect(user).toBeUndefined();
    });

    test("incorrect password returns undefined", async () => {
        // First add test user
        await UserDataSource.add({
            email: TestEmail,
            password: "password",
            confirmPassword: "password",
            dob: new Date(),
            first_name: "first",
            last_name: "last",
            phone: "1234567890",
        });

        const user = await UserDataSource.login({
            email: TestEmail,
            password: "wrong password",
        });

        expect(user).toBeUndefined();
    });

    test("correct email and password returns LoginToken", async () => {
        // First add test user
        const added_user = await UserDataSource.add({
            email: TestEmail,
            password: "password",
            confirmPassword: "password",
            dob: new Date(),
            first_name: "first",
            last_name: "last",
            phone: "1234567890",
        });

        const token = await UserDataSource.login({
            email: TestEmail,
            password: "password",
        });

        expect(token).toStrictEqual({
            token: expect.any(String),
            ttl_minutes: expect.any(Number),
        });
    })
});
