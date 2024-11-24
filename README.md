# Agendei API
Sistema para agendamento de consultas médicas

---

## **Autenticação**
A maioria das rotas exige autenticação via **JWT**. Os tokens devem ser enviados no cabeçalho da requisição:

```http
Authorization: Bearer <seu_token_jwt>
```
## **Endpoints**

### **1. Doctors (Médicos)**

#### **Listar todos os médicos**

-   **Rota**: `GET /doctors`
-   **Descrição**: Retorna uma lista de todos os médicos cadastrados.
-   **Autenticação**: Sim (JWT)

#### **Cadastrar médico**

-   **Rota**: `POST /doctors`
-   **Descrição**: Cadastra um novo médico no sistema (Somente Admins).
-   **Autenticação**: Sim (JWT)
-   **Parâmetros no Body**:
```    
{
  "name": "Dr. João Silva",
  "specialty": "Cardiologia",
  "email": "joao.silva@example.com"
}
```

#### **Atualizar médico**

-   **Rota**: `PUT /doctors/:idDoctor`
-   **Descrição**: Atualiza as informações de um médico específico (Somente Admins).
-   **Autenticação**: Sim (JWT)
-   **Parâmetros na URL**:
    -   `idDoctor`: ID do médico.
-   **Parâmetros no Body**:
```
 {
  "name": "Dr. João Silva",
  "specialty": "Cardiologia"
}
```
#### **Excluir  médico**

-   **Rota**: `DELETE /doctors/:idDoctor`
-   **Descrição**: Remove um médico do sistema (Somente Admins).
-   **Autenticação**: Sim (JWT)
-   **Parâmetros na URL**:
    -   `idDoctor`: ID do médico.
#### **Listar serviços de um médico**

-   **Rota**: `GET /doctors/:idDoctor/services`
-   **Descrição**: Retorna uma lista de serviços prestados por um médico específico.
-   **Autenticação**: Sim (JWT)
-   **Parâmetros na URL**:
    -   `idDoctor`: ID do médico.

### **2. Users (Usuários)**

#### **Registrar um usuário**

-   **Rota**: `POST /user/register`
-   **Descrição**: Cadastra um novo usuário no sistema.
-   **Autenticação**: Não.
-   **Parâmetros no Body**:
``` 
{
  "name": "Maria Oliveira",
  "email": "maria.oliveira@example.com",
  "password": "senha123"
}
```
----------

#### **Login de usuário**

-   **Rota**: `POST /users/login`
-   **Descrição**: Realiza o login de um usuário.
-   **Autenticação**: Não.
-   **Parâmetros no Body**:
```
{
   "email": "maria.oliveira@example.com",
   "password": "senha123"
}
```
----------
#### **Perfil do usuário**

-   **Rota**: `GET /users/me`
-   **Descrição**: Retorna os dados do perfil do usuário autenticado.
-   **Autenticação**: Sim (JWT)
----------

### **3. Appointments (Agendamentos)**

#### **Listar agendamentos do usuário**

-   **Rota**: `GET /appointments`
-   **Descrição**: Retorna os agendamentos feitos pelo usuário autenticado.
-   **Autenticação**: Sim (JWT)
----------
#### **Criar um agendamento**

-   **Rota**: `POST /appointments`
-   **Descrição**: Cria um novo agendamento.
-   **Autenticação**: Sim (JWT)
-   **Parâmetros no Body**:
```
{ 	
	"idDoctor": 1, 
	"date": "2024-11-30" 
}
```
----------
#### **Cancelar um agendamento**

-   **Rota**: `DELETE /appointments/:idAppointment/cancel`
-   **Descrição**: Cancela um agendamento específico.
-   **Autenticação**: Sim (JWT)
-   **Parâmetros na URL**:
    -   `idAppointment`: ID do agendamento.



