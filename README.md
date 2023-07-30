
# API Simulador de crédito

API para realizar simulação de crédito, desenvolvida para teste Técnico. 




## Stack utilizada

**Back-end:** Node, Framework Serverless

**Hospedagem**: AWS Lambda + API Gateway

**Banco de dados**: MYSQL > Google Cloud





## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/DevRafaelCena/CreditoRural.git
```

Entre no diretório do projeto

```bash
  cd my-project
```

Instale as dependências

```bash
  npm install
```

Rode  com o serverless offline

```bash
 serverless plugin install -n serverless-offline
```




## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run test
```


## Deploy

Para fazer o deploy desse projeto configure as credenciais da aws (tenha instalado a AWS CLI ).

```bash
    aws configure
```

Execute o deploy

```bash
     serverless deploy
```
