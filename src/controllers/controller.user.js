import serviceUser from "../services/service.user.js"

async function createUser(req, res){

    const {name, email, password} = req.body;

    if (!name || !email || !password){
        return res.status(400).json({message: "All fields are required."});
    }

    try {
        const user = await serviceUser.createUser(name, email, password);
        if(!user){
            return res.status(400).json({message: "User could not be created."});
        }
        res.status(201).json(user);
        
    } catch (error) {
        console.log("Erro ao criar usuario: ", error);
        res.status(500).json({ message: "An error occurred while creating the user." });
    }

}

export default {createUser};