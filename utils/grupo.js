const fs = require("fs");
const path = require("path");
const axios = require("axios");
// ==============================
// FUNÇÃO DETECTAR LINK DE GRUPO
// ==============================
function detectarLinkDeGrupo(texto) {
const regex = /(https?:\/\/chat\.whatsapp\.com\/([a-zA-Z0-9-]{22}))/g;
const match = regex.exec(texto);
if (match) {
return match[1];
} else {
return null;
}
}
// ==============================
// FUNÇÃO CRIAR JSON DO GRUPO
// ==============================
const gruposDir = path.join(__dirname, "json", "grupos");
if (!fs.existsSync(gruposDir)) {
fs.mkdirSync(gruposDir, { recursive: true });
}

async function creategrupo(groupId) {
const filePath = path.join(gruposDir, `${groupId}.json`);
if (fs.existsSync(filePath)) return;

try {
const initialData = {
antilinkgp: false,
antilinkchannel: false,
bemvindo: false,
bemvindo2: false,
bangp: false,
modobrincadeira: false
};
fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2));
console.log(`[GRUPO] Arquivo ${groupId}.json criado.`);
} catch (error) {
console.error(
`[ERRO] Não foi possível criar o arquivo para o grupo ${groupId}:`,
error
);
}
}
// ==============================
// FUNÇÃO LER CONFIGURAÇÃO DO GRUPO
// ==============================
async function getGrupoConfig(groupId) {
const filePath = path.join(gruposDir, `${groupId}.json`);
const defaultConfig = { antilinkgp: false, antilinkchannel: false };

if (!fs.existsSync(filePath)) {
await creategrupo(groupId);
return defaultConfig;
}

try {
const data = fs.readFileSync(filePath, "utf-8");
const config = JSON.parse(data);
return { ...defaultConfig, ...config };
} catch (error) {
console.error(
`[ERRO] Não foi possível ler o JSON do grupo ${groupId}. Usando padrão.`,
error
);
return defaultConfig;
}
}
// ==============================
// FUNÇÃO DE ATIVAR/DESATIVAR ALGUMA FUNÇÃO DE GRUPO
// ==============================
async function togglegrupoconfig(groupId, key) {
const filePath = path.join(gruposDir, `${groupId}.json`);
const config = await getGrupoConfig(groupId);
if (!(key in config)) {
throw new Error(`A chave "${key}" não existe na configuração do grupo.`);
}
config[key] = !config[key];
fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
console.log(
`[OK] Configuração "${key}" do grupo ${groupId} alterada para: ${config[key]}`
);
return config;
}

// ==============================
// FUNÇÃO DETECTAR LINK DE CANAL
// ==============================
function detectarLinkDeCanal(texto) {
const regex = /https:\/\/chat\.whatsapp\.com\/channel\/[0-9a-zA-Z]{22}/gi;
const match = regex.exec(texto);
return match ? match[0] : null;
}
// ==============================
// EXPORTS
// ==============================
module.exports = {
detectarLinkDeGrupo,
creategrupo,
getGrupoConfig,
togglegrupoconfig,
detectarLinkDeCanal,
};
