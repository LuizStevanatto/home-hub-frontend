
> A HomeHub é uma plataforma onde pessoas podem encontrar e/ou anúnciar imóveis para vender ou alugar.

## 📌 Funcionalidades
- [x] Usuário
  - [x] Cadastro de usuário 
  - [x] Login de usuário
- [x] Pàgina inicial - "/"
  - [x] Listagem dos imóveis recentes 
  - [x] Listagem dos imóveis mais visualizados 
- [x] Paǵina dos imóveis
  - [x] Listagem dos imóveis recentes
  - [x] Listagem dos imóveis de acordo com os filtros selecionados
  - [x] Filtros
    - [x] Estado e/ou cidade 
    - [x] Vender ou alugar
    - [x] Condomínio ou rua 
    - [x] Tipo de imóvel
    - [x] Detalhes do imóvel
 - [x] Página de anúncios/imóveis do usuário
   - [x] Listagem dos anúncios/imóveis do usuário
   - [x] Desativar anúncio   
   - [x] Excluir anúncio
 - [x] Página para anúnciar um imóvel 
   - [x] Fomulário de anúncio 
- [x] Deslogar
  

## 🛠️ Tecnologias
 Este projeto foi desenvolvido com as principais tecnologias
- NextJs
- TailwindCSS
- Chakra UI
- React-Icons
- React-Toastify
- TypeScript
- Axios
- Zod
- Nookies
- Zustand


## 🚀 Executando o projeto localmente

### 💻 Pré-requisitos
Para rodar o projeto é necessário que você tenha instalado na sua máquina as seguintes ferramentas:
- Git
- Node.js
- VSCode
- Yarn

### 💿 Rodando
```bash
# Clone este repositório através do terminal
$ git clone github.com/LuizStevanatto/home-hub-frontend

# Acesse a pasta do projeto
$ cd home-hub-frontend

# Instale as dependências do projeto
$ yarn install

# Rode o projeto 
$ yarn dev
```

> *O projeto está configurado para rodar com uma API local, será necessário seguir as instruções que estão no repositório da <a href="https://github.com/LuizStevanatto/home-hub-backend" target="_blank"> API. </a> E também, caso seja necessário, terá que alterar a baseUrl que está em: services api.ts para a url local do back-end.
