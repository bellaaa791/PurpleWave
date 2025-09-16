// ==============================
// Lê o total de comandos executados hoje
//Créditos: Tokyo (DAKI INFOS)
// Inspiração: Takeshi-bot
// ==============================
const moment = require("moment-timezone");
const path = require("path");
const fs = require("fs");
const os = require("os");
const axios = require("axios");
const {
detectarLinkDeGrupo,
creategrupo,
getGrupoConfig,
togglegrupoconfig,
detectarLinkDeCanal,
} = require("./utils/grupo");
const { mensagemSucesso } = require("./utils.js");
const {
totalcmds,
totalcmdsgeral,
aumentartotalcmds,
aumentarcmdsgeral,
tourl,
setfoto,
setconfig,
} = require("./utils/exports.js");
const hora = moment.tz("America/Sao_Paulo").format("HH:mm:ss");
const baileys = require("@whiskeysockets/baileys");
const fetch = require('node-fetch');

const {
default: makeWASocket,
useMultiFileAuthState,
makeInMemoryStore,
DisconnectReason,
WAGroupMetadata,
relayWAMessage,
MediaPathMap,
mentionedJid,
processTime,
MediaType,
Browser,
MessageType,
Presence,
Mimetype,
Browsers,
delay,
fetchLatestBaileysVersion,
MessageRetryMap,
extractGroupMetadata,
generateWAMessageFromContent,
proto,
otherOpts,
makeCacheableSignalKeyStore,
prepareWAMessageMedia,
getContentTyp,
downloadContentFromMessage,
} = baileys;

module.exports = (bot, numeroFormatado, saveCreds) => {
bot.ev.on("creds.update", saveCreds);

process.on("beforeExit", (code) => {
console.log("⚠ Bot finalizou, forçando erro para reiniciar...");
process.exit(1);
});

const configPath = path.join(__dirname, "./json/config.json");

let configCache = {};
function lerConfig() {
if (fs.existsSync(configPath)) {
try {
const raw = fs.readFileSync(configPath, "utf8");
if (raw.trim() === "") throw new Error("Arquivo config.json vazio");

configCache = JSON.parse(raw);
} catch (err) {
console.error("Erro ao ler config:", err.message);
}
}
return configCache;
}



fs.watch(configPath, (eventType) => {
if (eventType === "change") {
console.log("Arquivo config.json alterado, recarregando...");
lerConfig();
}
});


function getConfig() {
return configCache;
}

function lerJSON(nomeArquivo) {
const filePath = path.join(__dirname, "json", nomeArquivo);
try {
return JSON.parse(fs.readFileSync(filePath, "utf8"));
} catch (err) {
console.error(`Erro ao ler ${nomeArquivo}:`, err);
return {};
}
}


const resposta = () => lerJSON("respostas.json");
const fotos = () => lerJSON("fotos.json");

const videomenu = () => fotos().videomenu;
const videomenuadm = () => fotos().videomenuadm;
const fotomenu = () => fotos().fotomenu;
const profilebot = () => fotos().profilebot;
const bannerbot = () => fotos().bannerbot;

const pluginsDir = path.resolve("./plugins");
const eventHandlersDir = path.resolve("./event_handlers");
const axios = require("axios");

const fetchJson = (url, options) =>
new Promise(async (resolve, reject) => {
if (!url || typeof url !== "string") {
return reject(new Error(`[fetchJson] URL inválida: ${url}`));
}
try {
const response = await fetch(url, options);
const json = response;
resolve(json);
} catch (err) {
reject(err);
}
});

lerConfig();
global.ctx = {
bot,
info: null,
hora,
nome: null,
from: null,
isGroupAdmins: null,
enviar: null,
isGroup: null,
menc_os2: null,
isBotGroupAdmins: null,
// agora são funções que leem sempre na hora
get resposta() {
return lerJSON("respostas.json");
},

get videomenu() { return lerJSON("fotos.json").videomenu },
get videomenuadm() { return lerJSON("fotos.json").videomenuadm },
get fotomenu() { return lerJSON("fotos.json").fotomenu },
get profilebot() { return lerJSON("fotos.json").profilebot },
get bannerbot() { return lerJSON("fotos.json").bannerbot },

nomety: null,
q: null,
args: null,
isBot: null,
fetch: fetchJson,
fetchJson,
getBuffer: async function (url, opcoes) { /* ... */ },
enviarimg: null,
enviarvideo: null,
body: null,
togglegrupoconfig,
puxararquivos: function(dir) {
const arquivos = [];
function lerDir(d) {
if (!fs.existsSync(d)) return;
for (const item of fs.readdirSync(d)) {
const itemPath = path.join(d, item);
const stat = fs.lstatSync(itemPath);
if (stat.isDirectory()) {
lerDir(itemPath);
} else if (stat.isFile() && itemPath.endsWith(".js")) {
arquivos.push(itemPath);
}
}
}
lerDir(dir);
return arquivos;
},

pluginsDir,

get NomeDoBot() { return getConfig().bot },
get criador() { return getConfig().criador },
get prefix() { return getConfig().prefix },
get urlapi() { return getConfig().urlapi },
get apikey() { return getConfig().apikey },

totalcmds,
totalcmdsgeral,
aumentartotalcmds,
aumentarcmdsgeral,
tourl,
isImagem: null,
isVideo: null,
downloadContentFromMessage,
setfoto,
dono: null,
setconfig,
axios,
DisconnectReason,
numeroFormatado,
creategrupo,
getGrupoConfig,
detectarLinkDeGrupo,
detectarLinkDeCanal,
fs,
moment,
lerConfig
};



function loadEventHandlers() {
if (!fs.existsSync(eventHandlersDir)) {
console.log("⚠ Pasta event_handlers não encontrada:", eventHandlersDir);
return;
}

const arquivosJs = global.ctx.puxararquivos(eventHandlersDir);

for (const file of arquivosJs) {
delete require.cache[require.resolve(file)];
const handlerModule = require(file);

if (!handlerModule.eventNames || !handlerModule.start) continue;

const eventNames = Array.isArray(handlerModule.eventNames) ? handlerModule.eventNames : [handlerModule.eventNames];

for (const eventName of eventNames) {
bot.ev.on(eventName, async (update) => {
try {
await handlerModule.start(bot, update, global.ctx);
} catch (err) {
console.error(`❌ Erro ao executar evento ${eventName}:`, err);
}
});
}
}
}

loadEventHandlers();

if (!bot.authState.creds.registered) {
console.log("🔐 Gerando código de emparelhamento...");
setTimeout(async () => {
try {
let code = await bot.requestPairingCode(numeroFormatado);
code = code?.match(/.{1,4}/g)?.join("-") || code;
console.log(`✅ Seu código de emparelhamento: ${code}`);
console.log(
"📲 Insira o código no WhatsApp em Dispositivos Vinculados > Vincular com número de telefone."
);
} catch (err) {
console.error("❌ Erro ao gerar código:", err.message);
console.error("🔍 Detalhes do erro:", JSON.stringify(err, null, 2));
throw new Error("Falha ao gerar código de emparelhamento");
}
}, 3000);
}
};