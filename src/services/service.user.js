import repositoryUser from "../repositories/repository.user.js"
import bcrypt from "bcrypt";

async function createUser (name, email, password) {

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await repositoryUser.createUser(name, email, hashPassword);
    return user;
}

export default {createUser};