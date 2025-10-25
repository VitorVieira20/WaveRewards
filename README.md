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
git clone https://github.com/VitorVieira20/WaveRewards.git
cd WaveRewards
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

## Base de dados

1. Rodar as migrations:

```bash
php artisan migrate
```

2. Adicionar os dados com os seeders:

```bash
php artisan db:seed
```

---


## Configuração do mailer

1. Adicionar os dados do mailer no `.env`:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=projectmanager.vitorvieiradev@gmail.com
MAIL_PASSWORD=xwbizbefkggiouzf
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS={o email que vai recebers os contactos}
MAIL_FROM_NAME="WaveRewards"
```

2. Rodar a fila para os mails serem enviados:
- Abrir mais um terminal e rodar

```bash
php artisan queue:work
```

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
