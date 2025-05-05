import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;

import qrcode from 'qrcode-terminal';


const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true, // ✅ runs the browser invisible mode
        args: [
        '--no-sandbox', // ✅ disables sandboxing
        '--disable-setuid-sandbox' // ✅ needed in some Linux environments
        ]
    }
});

function login() {
    client.on('qr', (qr) => {
        qrcode.generate(qr, { small: true });
    });

    client.on('authenticated', () => {
        console.log('✅ Authenticated');
    });

    client.on('ready', () => {
        console.log('✅ Client is ready');
    });

    client.on('auth_failure', msg => {
        console.error('❌ Authentication failed:', msg);
    });

    client.initialize();
}


export { client, login}
