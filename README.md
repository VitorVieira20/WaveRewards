# 🌊 WaveRewards

Bem-vindo ao **WaveRewards**. Este projeto é uma aplicação web completa que utiliza **Laravel** para o backend (API) e **React/Vite** para o frontend.

Este guia explica como configurar o ambiente de desenvolvimento do zero utilizando os scripts automatizados configurados no projeto.

---

## 🛠 Tech Stack

- **Backend:** PHP, Laravel
- **Frontend:** React, Vite
- **Base de Dados:** MySQL (via Docker ou Local)
- **Gestor de Pacotes:** NPM & Composer

---

## 📋 Pré-requisitos

Antes de começar, garante que tens as seguintes ferramentas instaladas na tua máquina:

- [Node.js](https://nodejs.org/) (Versão 18 ou superior)
- [PHP](https://www.php.net/) & [Composer](https://getcomposer.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (Recomendado para a base de dados)
- Git

---

## 🚀 Instalação e Setup

Siga estes passos pela ordem indicada para configurar o projeto.

### 1. Clonar o Repositório
```bash
git clone https://github.com/VitorVieira20/WaveRewards.git
cd WaveRewards
```

### 2. Instalar Dependências (Node)

```bash
npm install
```

### 3. Configuração de Ambiente (.env)
Cria o ficheiro de configuração local copiando o exemplo:

```bash
cp .env.example .env
```

**Nota**: Preenche as variáveis do .env com as credenciais corretas (DB_PASSWORD, API Keys, etc.).

Consulta o post afixado no Discord para os valores corretos.

### 4. Base de Dados
Recomendamos o uso do Docker para garantir compatibilidade.

**Opção A: Via Docker (Recomendado)** Levanta o MySQL e phpMyAdmin automaticamente:

```bash
npm run up:db
```
(O phpMyAdmin ficará acessível em http://localhost:8080)


**Opção B: Localmente** Se não usares Docker, cria uma base de dados local e atualiza o ficheiro `.env` com as tuas credenciais.


### 5. Setup do Projeto
Executa este comando apenas depois de configurar o .env e ter a base de dados a correr. Ele irá instalar dependências PHP, gerar chaves, migrar a BD e criar links.

```bash
npm run project:setup
```


## 💻 Como Correr o Projeto
**Terminal 1 (Backend)**

```bash
npm run serve
```

**Terminal 2 (Frontend)**

```bash
npm run dev
```

**Processamento de filas (se necessário)**
```bash
npm run queue
```


## 🛑 Parar o Projeto
Para parar, basta cancelar a execução nos terminais `(Ctrl + C)`.

Se a base de dados foi iniciada via Docker, corre este comando para parar e remover os contentores:

```bash
npm run down:db
```


## 📖 Referência de Comandos (NPM Scripts)

Abaixo encontras a explicação de todos os scripts úteis configurados no `package.json`.

| Comando | Descrição |
| :--- | :--- |
| **Setup & Build** | |
| `npm run project:setup` | **Comando Principal:** Instala Composer, chaves, migrações, seeds e storage link. |
| `npm run build` | Compila o frontend para produção. |
| **Dev Server** | |
| `npm run serve` | Inicia servidor Laravel (`php artisan serve`). |
| `npm run dev` | Inicia servidor Vite (Frontend). |
| **Base de Dados** | |
| `npm run up:db` | Inicia contentores Docker (MySQL + phpMyAdmin). |
| `npm run down:db` | Para e remove os contentores Docker. |
| `npm run db:migrate` | Executa as migrações pendentes. |
| `npm run db:seed` | Popula a base de dados com dados falsos (Seeds). |
| `npm run db:reset` | **Reset:** Apaga a BD, corre migrações do zero e seeds. |
| **Utilitários** | |
| `npm run setup:php` | Instala dependências do Composer. |
| `npm run setup:key` | Gera a `APP_KEY` do Laravel. |
| `npm run storage:link` | Cria o link simbólico para a pasta `storage`. |
| `npm run queue` | Inicia o worker de filas do Laravel. |