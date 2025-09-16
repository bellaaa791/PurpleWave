// ==============================
// Lê o total de comandos executados hoje
//Créditos: Tokyo (DAKI INFOS)
// Inspiração: Takeshi-bot
// ==============================
const fs = require("fs");
const path = require("path");

const configPath = path.join(__dirname, "./json/config.json");

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
module.exports = { getConfig, lerConfig, salvarConfig };
