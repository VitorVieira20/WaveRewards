# WaveRewards

## Pré-requisitos
* PHP >= 8.2
* Composer
* Node.js >= 18
* NPM

---

## Instalação

1. Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_PROJETO>
```

2. Instalar as dependências do PHP:

```bash
composer install
```

3. Instalar as dependências do Node.js:

```bash
npm install
```

4. Gere a chave da aplicação Laravel:

```bash
php artisan key:generate
```

5. Copiar o ficheiro `.env.example` e criar o `.env`

---

## Executar o projeto

O projeto precisa de **dois terminais** abertos para correr corretamente:

1. Terminal 1 – Servidor Laravel:

```bash
php artisan serve
```

> Isto irá iniciar o servidor em `http://localhost:8000`.

2. Terminal 2 – Compilador do frontend:

```bash
npm run dev
```

> Isto irá compilar os assets e manter o frontend atualizado.

---

## Aceder à aplicação

Abra o navegador e aceda a:

```
http://localhost:8000
```
