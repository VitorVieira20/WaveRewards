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

3. Fazer a conexão do storage
- Abrir mais um terminal e rodar

```bash
php artisan storage:link
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


## 🐳 Como rodar o projeto com Docker

Este projeto utiliza **Docker** para garantir que todo o ambiente de desenvolvimento (PHP, Node, Base de Dados, etc.) é igual para todos os membros da equipa, independentemente do Sistema Operativo.


### 🚀 Instalação e Primeiro Arranque

Siga estes passos apenas na **primeira vez** que configurar o projeto:

1.  **Configurar variáveis de ambiente:**
    Copie o ficheiro de exemplo e ajuste as credenciais da base de dados para o Docker.
    ```bash
    cp .env.example .env
    ```
    *Abra o ficheiro `.env` e garanta que estas linhas estão assim:*
    ```ini
    DB_CONNECTION=mysql
    DB_HOST=db
    DB_PORT=3306
    DB_DATABASE=waverewards
    DB_USERNAME=laravel
    DB_PASSWORD=secret

    QUEUE_CONNECTION=redis

    SESSION_DRIVER=redis

    REDIS_CLIENT=phpredis
    REDIS_HOST=waverewards-redis
    REDIS_PASSWORD=null
    REDIS_PORT=6379

    VITE_APP_URL=http://localhost:8000
    ```

3.  **Arrancar os contentores:**
    Este comando vai construir as imagens e iniciar o projeto.
    ```bash
    docker-compose up -d --build
    ```
    > **Nota:** O arranque inicial pode demorar alguns minutos. O script automático (`entrypoint.sh`) irá instalar o Composer, NPM, gerar a Key e correr as Migrations sozinho.

4.  **Acompanhar a instalação:**
    Para saber quando o site está pronto, veja os logs:
    ```bash
    docker-compose logs -f app
    ```
    *Quando vir a mensagem `🏁 Arranque concluído. A iniciar PHP-FPM...`, pode fechar os logs (Ctrl+C).*

### 🌐 Aceder à Aplicação

* **Site:** [http://localhost:8000](http://localhost:8000)
* **phpMyAdmin:** [http://localhost:8080](http://localhost:8080)
    * *User:* `laravel`
    * *Password:* `secret`

### 🛠 Comandos Úteis no Dia a Dia

Como o PHP e o Node estão dentro do Docker, **não deve** correr comandos `php` ou `npm` diretamente no seu terminal. Use estes comandos:

**Parar e Iniciar:**
```bash
docker-compose stop       # Parar (mantém os dados)
docker-compose up -d      # Iniciar novamente
docker-compose down       # Parar e remover contentores


```

### Como expandir:
Para adicionar mais inteligência, basta adicionares novos objetos ao array `knowledgeBase`.

Exemplo:
```javascript
{
    id: 'dicas_seguranca',
    keywords: ['seguranca', 'perigoso', 'colete', 'nadar'],
    answer: "A segurança é prioritária! Usa sempre colete salva-vidas, verifica a meteorologia na Dashboard antes de sair e nunca remes sozinho em zonas desconhecidas."
}
```
