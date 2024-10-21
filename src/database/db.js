import "dotenv/config";
import sql from "mssql";

const config = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	server: process.env.DB_SERVER,
	database: process.env.DB_DATABASE,
	options: {
		encrypt: process.env.DB_ENCRYPT === "true", 
		trustServerCertificate: true,
	},
};

let pool;
async function connectToDatabase() {
	if (!pool) {
		try {
			pool = await sql.connect(config);
			console.log("Conectado ao banco de dados");
		} catch (error) {
			console.error("Erro ao conectar ao banco de dados:", error);
			throw error;
		}
	}
	return pool;
}

async function query(command, params = {}) {
    return new Promise(async (resolve, reject) => {
        try {
            const pool = await connectToDatabase(); 
            const request = pool.request(); 
            
            for (const key in params) {
                request.input(key, params[key]); 
            }

            const result = await request.query(command); 
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}


export default { connectToDatabase, query };
