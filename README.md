# Agendei API
Sistema para agendamento de consultas médicas

Autenticação
A maioria das rotas exige autenticação via JWT. Os tokens devem ser enviados no cabeçalho da requisição:
Authorization: Bearer <seu_token_jwt>

Endpoints
1. Doctors (Médicos)
Listar todos os médicos
Rota: GET /doctors
Descrição: Retorna uma lista de todos os médicos cadastrados.
Autenticação: Sim (JWT)
Resposta:
[
  {
    "idDoctor": 1,
    "name": "Dr. João Silva",
    "specialty": "Cardiologia"
  }
]
