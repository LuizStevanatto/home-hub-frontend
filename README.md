#  webcasas

![GitHub](https://img.shields.io/github/license/steinerstt/webcasas?style=for-the-badge)
![Website](https://img.shields.io/website?color=gree&label=Status&style=for-the-badge&up_message=finalizado&url=https://github.com/steinerstt/webcasas)
<br><br>

https://github.com/steinerstt/webcasas/assets/106714068/a6d2dfdd-9aa0-46bd-84f6-b0b2e4bb9363

<br>

> A WebCasas é uma plataforma onde pessoas podem encontrar e/ou anúnciar imóveis para vender ou alugar.


## 🔰 Ao Vivo
Para acessar o deploy <a href="https://webcasas-theta.vercel.app/" target="_blank" > Clique Aqui! </a>


## 🌐 Apis
- <a href="https://github.com/steinerstt/api-webcasas" target="_blank"> api-webcasas API </a> criada por mim 
- <a href="https://servicodados.ibge.gov.br/api/docs" target="_blank"> IBGE - API </a>  

## 📌 Funcionalidades
- [x] Usuário
  - [x] Cadastro de usuário 
  - [x] Login de usuário
- [x] Pàgina inicial - "/"
  - [x] Listagem dos imóveis recentes 
  - [x] Listagem dos imóveis mais visualizados 
- [x] Paǵina dos imóveis - "/properties" 
  - [x] Listagem dos imóveis recentes
  - [x] Listagem dos imóveis de acordo com os filtros selecionados
  - [x] Filtros
    - [x] Estado e/ou cidade 
    - [x] Vender ou alugar
    - [x] Condomínio ou rua 
    - [x] Tipo de imóvel
    - [x] Detalhes do imóvel
 - [x] Página de atualizar cadastro - "/my-register"
   - [x] Atualizar dados de cadastro e/ou foto de perfil   
   - [x] Desativar conta
   - [x] Excluir conta
 - [x] Pàgina de ativar conta de usuário - "/active-account"
   - [x] Ativar conta
 - [x] Página de anúncios/imóveis do usuário - "/my-ads"
   - [x] Listagem dos anúncios/imóveis do usuário
   - [x] Desativar anúncio   
   - [x] Excluir anúncio
 - [x] Página para anúnciar um imóvel - "/form-property"
   - [x] Fomulário de anúncio 
- [x] Delogar
  

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
$ git clone git@github.com:steinerstt/webcasas.git

# Acesse a pasta do projeto
$ cd webcasas

# Instale as dependências do projeto
$ yarn install

# Rode o projeto 
$ yarn dev
```

> *O projeto está configurado para rodar com uma API local, será necessário seguir as instruções que estão no repositório da <a href="https://github.com/steinerstt/api-webcasas" target="_blank"> API. </a> E também, caso seja necessário, terá que alterar a baseUrl que está em: services api.ts para a url local do back-end.

<br>

## 📸 Screenshots


![página-login](https://github.com/steinerstt/webcasas/assets/106714068/858d2112-0332-430a-8151-46ad24538629)
![página-cadastro](https://github.com/steinerstt/webcasas/assets/106714068/485978af-8c78-4f61-95a0-8cfedd6e458c)
![página-inicial](https://github.com/steinerstt/webcasas/assets/106714068/6435040d-a772-480a-bf64-5d5f8d2decac)
![página-inicial-logado](https://github.com/steinerstt/webcasas/assets/106714068/c77c4c24-3405-42ad-9807-a2832c89aad9)
![página-imóveis](https://github.com/steinerstt/webcasas/assets/106714068/4431e702-8e40-4a7d-8a35-4fea9be0327d)
![página-imóveis-estato-selecionado](https://github.com/steinerstt/webcasas/assets/106714068/c0256f6d-b4cc-4a2d-85e8-cc21bf7cb406)
![página-imóveis-modal-filtros](https://github.com/steinerstt/webcasas/assets/106714068/5ed5f289-81c9-417f-b16b-feb80aa56483)
![página-imóveis-filtros-aplicados](https://github.com/steinerstt/webcasas/assets/106714068/913d5a52-3211-4dc6-9577-4e6996aa6ce7)
![página-imóveis-menu-usuário-aberto](https://github.com/steinerstt/webcasas/assets/106714068/d17c4223-ed1d-4951-adf6-14b90be6938e)
![página-meu-cadastro](https://github.com/steinerstt/webcasas/assets/106714068/d9348409-191e-43fe-bf25-33512ce3b59d)
![página-meu-cadastro-gerenciamento-conta-aberto](https://github.com/steinerstt/webcasas/assets/106714068/c7e256cb-34cb-4d3b-87f0-4b3a52610d94)
![página-meu-cadastro-gerenciamento-conta-aberto-modal-desativar-conta](https://github.com/steinerstt/webcasas/assets/106714068/34e01984-a8e4-44aa-a0e4-d9ebd9d3c2ad)
![página-meu-cadastro-gerenciamento-conta-aberto-modal-excluir-conta](https://github.com/steinerstt/webcasas/assets/106714068/5ae5556d-dfe1-4ff9-804b-505bff5c422c)
![página-ativar-conta](https://github.com/steinerstt/webcasas/assets/106714068/abd99960-1642-478d-b664-68c3ed15d8f3)
![página-meus-anúncios](https://github.com/steinerstt/webcasas/assets/106714068/97577b95-46f3-4b81-97e0-0620db3dd9d2)
![página-meus-anúncios-modal-desativar-aberto](https://github.com/steinerstt/webcasas/assets/106714068/87efdc55-658b-43df-afdf-779ca903d301)
![página-meus-anúncios-modal-excluir-aberto](https://github.com/steinerstt/webcasas/assets/106714068/49e40b08-d7f7-468b-86aa-8334ee4cf27a)
![página-meus-anúncios-modal-ativar-aberto](https://github.com/steinerstt/webcasas/assets/106714068/2abb021d-21d4-4ce3-acc5-e78b729c46c8)
![página-anunciar-imóvel](https://github.com/steinerstt/webcasas/assets/106714068/6e946dec-2715-44fa-8458-66f39eeea2f2)

<br>

## 📄 Licença
Este projeto está sob a licença do MIT - veja o arquivo [LICENSE](https://github.com/steinerstt/webcasas/blob/main/LICENSE) para detalhes.

Feito com ❤ por [Steiner](https://github.com/steinerstt)
