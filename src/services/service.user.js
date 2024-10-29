import repositoryUser from "../repositories/repository.user.js"
import bcrypt from "bcrypt";

async function createUser (name, email, password) {

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await repositoryUser.createUser(name, email, hashPassword);
    user.token = "00000000001234";
    return user;
}

async function loginUser(email, password) {
    try {
        const user = await repositoryUser.findUserByEmail(email);

        if (!user) {
            return { error: "Usuário não encontrado." }; 
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { error: "Senha incorreta." };
        }
        user.token = "00000000001234";
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword; 

    } catch (error) {
        console.log("Erro ao executar a query de login: ", error);
        throw error;
    }
}

export default {createUser, loginUser};