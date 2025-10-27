"use strict";
const fs = require("fs");
const path = require("path");
module.exports = {
nomes: ["listarcomandosdono"],
desc: "Lista todos os comandos que atualmente são só para ADM",
run: async () => {
const filePath = path.join(__dirname, "../../utils/json/grupos", `${from}.json`);
if (!fs.existsSync(filePath)) {
return enviar("❌ Configuração do grupo não encontrada.");
}
const configAtual = JSON.parse(fs.readFileSync(filePath, "utf8"));
if (!Array.isArray(configAtual.comandosdono) || configAtual.comandosdono.length === 0) {
return enviar("⚠ Não há comandos restritos a dono neste grupo.");
}
const listaComandos = configAtual.comandosdono.map((cmd, i) => `${i + 1}. ${cmd}`).join("\n");

return enviar(`📋 Comandos restritos a dono:\n\n${listaComandos}`);
},
};