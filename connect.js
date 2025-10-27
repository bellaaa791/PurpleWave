// ==============================
//Créditos: Tokyo (DAKI INFOS)
// ==============================
const { getConfig } = require("./config");
const pino = require("pino");
const NodeCache = require("node-cache");
const crypto = require("crypto");

const sessionDir = "sessoes";

async function conectarBot(telefone) {
console.log("[BOT] Iniciando...");

const config = getConfig();

try {

if (!globalThis.crypto) {
globalThis.crypto = {
subtle: crypto.webcrypto.subtle, 
getRandomValues: (arr) => crypto.randomFillSync(arr),
};
}

const baileys = await import("@whiskeysockets/baileys");
    const { useMultiFileAuthState, Browsers } = baileys;




const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
const msgRetryCounterCache = new NodeCache();

const bot = baileys.makeWASocket({
logger: pino({ level: "silent" }),
printQRInTerminal: false,
browser: Browsers.ubuntu("Chrome"),
version: [ 2, 3000, 1027934701 ],
auth: {
creds: state.creds,
keys: baileys.makeCacheableSignalKeyStore(
state.keys,
pino({ level: "fatal" })
),
},
markOnlineOnConnect: true,
generateHighQualityLinkPreview: true,
getMessage: async (key) => {
const jid = baileys.jidNormalizedUser(key.remoteJid);
return (await store.loadMessage(jid, key.id))?.message || "";
},
msgRetryCounterCache,
});

require("./events")(bot, telefone || "Sessão Existente", saveCreds, baileys);


bot.ev.on("creds.update", saveCreds);

return bot;
} catch (err) {
console.error("[BOT] Erro ao iniciar:", err.message);
throw new Error("Erro interno ao iniciar o bot");
}
}

module.exports = conectarBot;