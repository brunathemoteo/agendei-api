import repositoryUser from "../repositories/repository.user.js"

async function createUser (name, email, password) {
    const user = await repositoryUser.createUser(name, email, password);
    return user;
}

export default {createUser};