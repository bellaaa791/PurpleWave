"use strict";
module.exports = {
nomes: ["resetrank"],
desc: "Reseta todo o ranking de usuários do grupo",
run: async () => {
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);
const fs = require("fs");
const path = require("path");
const grupoFilePath = path.join(__dirname, "../../utils/json/grupos", `${from}.json`);

try {
if (!fs.existsSync(grupoFilePath)) {
return enviar("⚠️ Nenhum ranking encontrado para este grupo.");
}
const configAtual = JSON.parse(fs.readFileSync(grupoFilePath, "utf-8"));
if (!configAtual.usuarios || configAtual.usuarios.length === 0) {
return enviar("⚠️ O ranking já está vazio.");
}
configAtual.usuarios = [];
fs.writeFileSync(grupoFilePath, JSON.stringify(configAtual, null, 2), "utf-8");

console.log(`[LOG] Ranking do grupo ${from} resetado com sucesso.`);
await enviar("✅ Ranking do grupo resetado com sucesso!");
} catch (err) {
console.error("[ERRO] Não foi possível resetar o ranking:", err);
await enviar("❌ Ocorreu um erro ao resetar o ranking.");
}
},
};