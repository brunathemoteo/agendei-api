import "dotenv/config";
import sql from "mssql";

const config = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	server: process.env.DB_SERVER,
	database: process.env.DB_DATABASE,
	options: {
		encrypt: process.env.DB_ENCRYPT === "true", // Converte a string 'true' para booleano
		trustServerCertificate: true, // Pode ser útil para desenvolvimento local
	},
};

// Função para conectar ao banco de dados
let pool;
async function connectToDatabase() {
	if (!pool) {
		try {
			pool = await sql.connect(config);
			console.log("Conectado ao banco de dados");
		} catch (error) {
			console.error("Erro ao conectar ao banco de dados:", error);
			throw error; // Re-lança o erro para tratamento posterior
		}
	}
	return pool;
}

// Função para executar queries
function query(command, params = []) {
	return new Promise(async (resolve, reject) => {
		try {
			const pool = await connectToDatabase(); // Garante que a conexão esteja estabelecida
			const request = pool.request(); // Cria uma nova requisição
			// Aqui você pode adicionar os parâmetros se necessário
			params.forEach((param) => {
				request.input(param.name, param.value); // Adicione parâmetros como necessário
			});
			const result = await request.query(command); // Executa a consulta
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
}

export default { connectToDatabase, query };
