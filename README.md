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

**Nota Importante**: O projeto inclui um script de validação automático. Antes de avançares, preenche as variáveis obrigatórias no `.env` (DB_PASSWORD, API Keys do Gemini, etc.).

Podes verificar se tens tudo configurado corretamente correndo:

```bash
npm run check:env
```

(Se faltar alguma chave, o script irá avisar-te exatamente qual).

Consulta o post afixado no Discord para os valores corretos.

### 4. Base de Dados (MySQL + ChromaDB)

Este projeto requer dois serviços de base de dados: MySQL (dados normais) e ChromaDB (memória do Chatbot). Recomendamos usar o comando Docker incluído que levanta ambos.

**Levantar Serviços:**

```bash
npm run up:db #Se usares o docker para a base de dados
npm run up:chroma
```

Isto irá iniciar:
- **MySQL** (Porta 3310 foi configurada)
- **phpMyAdmin** (Acessível em http://localhost:8080)
- **ChromaDB** (Porta 8001 - Essencial para o Chatbot)

### 5. Setup do Projeto
Executa este comando apenas depois de configurar o .env e ter o Docker a correr. Ele irá:

1. Validar o ambiente
2. Instalar as dependências PHP
3. Gerar chaves
4. Correr migrações e seeds (MySQl)
5. Indexar dados para o Chatbot (ChromaDB)
6. Criar links de storage

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
npm run down:chroma
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
| `npm run up:db` | Inicia containers Docker (MySQL + phpMyAdmin). |
| `npm run down:db` | Para e remove os containers Docker (MySQL + phpMyAdmin). |
| `npm run up:chroma` | Inicia container Docker (Chroma DB). |
| `npm run down:chroma` | Para e remove o container Docker (Chroma DB). |
| `npm run db:migrate` | Executa as migrações pendentes. |
| `npm run db:seed` | Popula a base de dados com dados falsos (Seeds). |
| `npm run db:reset` | **Reset:** Apaga a BD, corre migrações do zero e seeds. |
| `npm run db:chroma` | **Indexação AI:** Envia dados do SQL para o ChromaDB (necessário para o Chatbot). |
| **Utilitários** | |
| `npm run setup:php` | Instala dependências do Composer. |
| `npm run setup:key` | Gera a `APP_KEY` do Laravel. |
| `npm run storage:link` | Cria o link simbólico para a pasta `storage`. |
| `npm run queue` | Inicia o worker de filas do Laravel. |