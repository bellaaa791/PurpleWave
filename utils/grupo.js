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
antisticker: false,
antistiimg: false,
antivideo: false,
antistatus: false,
bemvindo: false,
bemvindo2: false,
antiimg: false,
antidocumento: false,
anticontato: false,
antilocalizacao: false,
anticatalogo: false,
antiligacao: false,
antihidetag: false,
antipagamento: false,
bangp: false,
modobrincadeira: false,
so_adm: false,
limitecaracteres: false,
limite: 0,
rankingusers: false,
usuarios: [],
antipalavra: false,
comandoadm: false,
comandosadm: [],
comandodono: false,
comandosdono: false,
antipalavra2: false,
palavras: []
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
//console.log(`[DEBUG] Config do grupo ${groupId} não encontrada. Criando arquivo padrão...`);
await creategrupo(groupId);
}

try {
const data = fs.readFileSync(filePath, "utf-8");
const config = JSON.parse(data);
//console.log(`[DEBUG] Configuração do grupo ${groupId} carregada com sucesso.`);
return { ...defaultConfig, ...config };
} catch (error) {
console.error(
`[ERRO] Não foi possível ler o JSON do grupo ${groupId}. Usando padrão.`,
error
);
return defaultConfig;
}
}// ==============================
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
// SISTEMA DE RANKING DE MENSAGENS 
// ==============================
async function atualizarUsuarioNoGrupo(bot, from, normalizedSender, messageType) {
const gruposDir = path.join(__dirname, "json", "grupos");
const grupoPath = path.join(gruposDir, `${from}.json`);
let grupoConfig = {};

if (!fs.existsSync(gruposDir)) {
fs.mkdirSync(gruposDir, { recursive: true });
}

try {
if (fs.existsSync(grupoPath)) {
grupoConfig = JSON.parse(fs.readFileSync(grupoPath, "utf-8"));
} else {
grupoConfig = {
rankingusers: true,
usuarios: []
};
fs.writeFileSync(grupoPath, JSON.stringify(grupoConfig, null, 2), "utf-8");
}
} catch (err) {
console.error("Erro ao ler grupo JSON:", err);
return;
}


if (!grupoConfig.rankingusers) return;
let usuario = grupoConfig.usuarios.find(u => u.numero === normalizedSender);
if (!usuario) {
usuario = {
numero: normalizedSender,
mensagens: 0,
figurinhas: 0,
imagens: 0,
documentos: 0,
audios: 0
};
grupoConfig.usuarios.push(usuario);
}

switch (messageType) {
case 'texto':
usuario.mensagens++;
break;
case 'sticker':
usuario.figurinhas++;
break;
case 'imagem':
usuario.imagens++;
break;
case 'documento':
usuario.documentos++;
break;
case 'áudio':
usuario.audios++;
break;
}

try {
fs.writeFileSync(grupoPath, JSON.stringify(grupoConfig, null, 2), "utf-8");
} catch (err) {
console.error("Erro ao salvar grupo JSON:", err);
}
}


// ==============================
// Função utilitária para carregar JSON
// ==============================
const alugueisPath = path.join(__dirname, "alugueis.json");
function carregarAlugueis() {
if (!fs.existsSync(alugueisPath)) {
fs.writeFileSync(alugueisPath, JSON.stringify({}, null, 2));
}
return JSON.parse(fs.readFileSync(alugueisPath, "utf-8"));
}

// ==============================
// Gerar ID aleatório de 6 dígitos
// ==============================
function gerarId() {
return Math.floor(100000 + Math.random() * 900000).toString();
}

// ==============================
// Registrar aluguel
// ==============================
function registrarAluguel(groupId, tempo, tipo) {
let alugueis = carregarAlugueis();

const inicio = new Date();
let expira = new Date(inicio);

if (tipo === "dias") expira.setDate(expira.getDate() + tempo);
if (tipo === "horas") expira.setHours(expira.getHours() + tempo);

const id = gerarId();

alugueis[groupId] = {
id, // ID único
inicio: inicio.toISOString(),
expira: expira.toISOString(),
duracao: `${tempo} ${tipo}`
};

fs.writeFileSync(alugueisPath, JSON.stringify(alugueis, null, 2));
console.log(`[ALUGUEL] Grupo ${groupId} registrado (ID: ${id}) por ${tempo} ${tipo}`);
return alugueis[groupId];
}

// ==============================
// Listar alugueis
// ==============================
function listarAlugueis() {
return carregarAlugueis();
}

// ==============================
// Apagar aluguel (por ID)
// ==============================
function apagarAluguel(id) {
let alugueis = carregarAlugueis();
let encontrado = false;

for (const groupId in alugueis) {
if (alugueis[groupId].id === id) {
delete alugueis[groupId];
encontrado = true;
break;
}
}

if (encontrado) {
fs.writeFileSync(alugueisPath, JSON.stringify(alugueis, null, 2));
console.log(`[ALUGUEL] Aluguel com ID ${id} removido`);
return true;
} else {
console.log(`[ALUGUEL] ID ${id} não encontrado`);
return false;
}
}
// ==============================
//MENSAGEM PROGRAMADA NO GRUPO 
// ==============================
async function adicionarMsgProgramada(groupId, tipo, conteudo, intervalo) {
const tiposValidos = ["texto", "imagem", "audio", "gif", "sticker"];
if (!tiposValidos.includes(tipo)) throw new Error(`Tipo inválido: ${tipo}`);
if (!conteudo) throw new Error("Conteúdo não pode ser vazio");
if (typeof intervalo !== "number" || intervalo <= 0) throw new Error("Intervalo inválido");
const gruposDir = path.join(__dirname, "json", "grupos");
const filePath = path.join(gruposDir, `${groupId}.json`);
if (!fs.existsSync(gruposDir)) fs.mkdirSync(gruposDir, { recursive: true });
if (!fs.existsSync(filePath)) {
await creategrupo(groupId); 
}
const config = await getGrupoConfig(groupId);
if (!Array.isArray(config.msgpeogramada)) config.msgpeogramada = [];

const novaMsg = {
id: gerarId(),
tipo,
conteudo,
intervalo,
ultimaExecucao: null,
repeticoes: 0
};

config.msgpeogramada.push(novaMsg);
fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
console.log(`[OK] Mensagem programada adicionada ao grupo ${groupId}`);
return novaMsg;
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
atualizarUsuarioNoGrupo,
registrarAluguel,
listarAlugueis,
apagarAluguel,
adicionarMsgProgramada,
gerarId
};
