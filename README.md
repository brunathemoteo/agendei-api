
<h1 align="center" style="font-weight: bold">agendei-api </h1>

## Descrição 

Sistema para agendamento de consultas médicas.

## **Autenticação**

A maioria das rotas exige autenticação via **JWT**. Os tokens devem ser enviados no cabeçalho da requisição:

```http
Authorization: Bearer <seu_token_jwt>
```

## Endpoints 📌

### Usuário

- **GET** `/users/:me`: retorna os dados do usuário logado
- **POST** `/users/register`: cria um novo usuário
- **POST** `/users/login`: usuário faz o login

### Médicos

- **GET** `/doctors`: lista todos os médicos cadastrados
- **POST** `/doctors`: cadastra novo médico no sistema
- **PUT** `/doctors/:idDoctor`: atualiza as informações do médico
- **GET** `/doctors/:idDoctor/services`: lista de serviços prestados pelo médico
- **DELETE** `/doctors/:idDoctor`: deleta um médico

### Agendamentos

- **GET** `/appointments`: lista todos os agendamentos feitos pelo usuário
- **POST** `/appointments`: cria um novo agendamento
- **DELETE** `/appointments/:idAppointment/cancel`: deleta um agendamento

### Administradores

- **POST** `/admin/register`: cadastra novo administrador
- **POST** `/admin/login`: login do administrador
- **GET** `/admin/appointments`: lista todos os agendamentos
- **GET** `/admin/appointments/:idAppointment`: lista um agendamento buscando pelo id
- **POST** `/admin/appointments`: cria um novo agendamento
- **PUT** `/admin/appointments/:idAppointment`: atualiza as informações de um agendamento
