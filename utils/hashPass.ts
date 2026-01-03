import bcrypt from "bcryptjs";

export default async function hashPass(password: string) {
    return await bcrypt.hash(password, 10);
}