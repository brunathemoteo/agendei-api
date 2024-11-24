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



