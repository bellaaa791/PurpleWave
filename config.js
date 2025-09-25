// ==============================
//Créditos: Tokyo (DAKI INFOS)
// Inspiração: Takeshi-bot
// ==============================
const fs = require("fs");
const path = require("path");

const configPath = path.join(__dirname, "./json/config.json");
const { creategrupo } = require("./utils/grupo");
function getConfig() {
try {
const data = fs.readFileSync(configPath, "utf8"); 
return JSON.parse(data);
} catch (err) {
console.error("Erro ao ler config:", err);
return {};
}
}


let configCache = {};
function lerConfig() {
if (fs.existsSync(configPath)) {
try {
configCache = JSON.parse(fs.readFileSync(configPath, "utf8"));
} catch (err) {
console.error("Erro ao ler config:", err);
}
}
return configCache;
}


function salvarConfig(novasConfigs) {
try {

const configAtual = JSON.parse(fs.readFileSync(configPath, "utf8"));

const configAtualizada = { ...configAtual, ...novasConfigs };

fs.writeFileSync(configPath, JSON.stringify(configAtualizada, null, 2), "utf8");
return true;
} catch (err) {
console.error("Erro ao salvar config:", err);
return false;
}
}



function lergrupo(grupoid) {
if (!grupoid.endsWith('@g.us')) {
return {};
}
const configPath = path.join(__dirname, `./utils/Json/grupos/${grupoid}.json`);
try {
const data = fs.readFileSync(configPath, "utf8"); 
return JSON.parse(data);
} catch (err) {
creategrupo()
console.error("Erro ao ler config:", err);
return {};
}
}


async function requisicaoComLimite(url) {
try {
const response = await axios.get(url, {
headers: {
Accept: "application/json",
"User-Agent": "Node.js",
},
});

const data = response.data;

if (data?.resultado) {
return { success: true, data: data.resultado };
}
if (data?.data) {
return { success: true, data: data.data };
}

return { success: false, data: null };

} catch (erro) {
if (erro.response?.status === 429 && erro.response?.data?.error) {
const horaReset = erro.response.data.message?.match(/\d{2}:\d{2}:\d{2}/)?.[0] || "amanhã";
return { success: false, limite: horaReset };
}
console.error("Erro na requisição:", erro);
return { success: false, data: null };
}
}

module.exports = { getConfig, lerConfig, salvarConfig,lergrupo, requisicaoComLimite };