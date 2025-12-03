import fs from 'fs';
import path from 'path';

const REQUIRED_KEYS = [
    'APP_KEY',
    'APP_URL',
    'DB_HOST',
    'DB_PORT',
    'DB_DATABASE',
    'DB_USERNAME',
    'DB_PASSWORD',
    'MAIL_MAILER',
    'MAIL_HOST',
    'MAIL_PORT',
    'MAIL_USERNAME',
    'MAIL_PASSWORD',
    'MAIL_ENCRYPTION',
    'MAIL_FROM_NAME',
    'DISCORD_WEBHOOK',
    'WEATHER_API_KEY',
    'CHAT_SECRET_KEY',
    'GEMINI_API_KEY',
    'CHROMA_URL',
    'CHROMA_DB_HOST',
    'CHROMA_DB_PORT',
    'CHROMA_DB_API_KEY',
];

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

console.log(`${YELLOW}🔍 Verifying environment variables...${RESET}`);

const envPath = path.resolve(process.cwd(), '.env');

if (!fs.existsSync(envPath)) {
    console.error(`${RED}❌ Error: .env file does not exist!${RESET}`);
    console.log(`Run: cp .env.example .env`);
    process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const missingKeys = [];

const envVars = {};
envContent.split('\n').forEach(line => {
    if (!line || line.startsWith('#') || !line.includes('=')) return;

    const [key, ...valueParts] = line.split('=');
    let value = valueParts.join('=').trim();

    if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
    }

    envVars[key.trim()] = value;
});

REQUIRED_KEYS.forEach(key => {
    if (!envVars[key] || envVars[key] === '') {
        missingKeys.push(key);
    }
});

if (missingKeys.length > 0) {
    console.error(`${RED}❌ Error: Some evironment variables missing in .env file:${RESET}`);
    missingKeys.forEach(key => {
        console.error(`   - ${key}`);
    });
    console.log(`\n💡 Add them to .env file and try again.`);
    process.exit(1);
}

console.log(`${GREEN}✅ All ready! Environment is all set.${RESET}\n`);