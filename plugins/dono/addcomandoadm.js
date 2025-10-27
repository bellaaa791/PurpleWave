"use strict";
const fs = require("fs");
const path = require("path");
module.exports = {
nomes: ["addcomandoadm"],
desc: "Adiciona comandos somente para ADM usar",
run: async () => {
if (!isGroup) return enviar(resposta.so_grupo);
if (!dono) return enviar(resposta.so_dono);
const configAtual = lergrupo(from);
if (!q) {
return enviar(`⚠ Use: ${prefix}addcomandoadm nomeDoComando`);
}
const comando = q.toLowerCase().trim();
if (!Array.isArray(configAtual.comandosadm)) {
configAtual.comandosadm = [];
}
if (configAtual.comandosadm.includes(comando)) {
return enviar(`⚠ O comando *${comando}* já está só para ADM!`);
}
configAtual.comandosadm.push(comando);
const filePath = path.join(__dirname, "../../utils/json/grupos", `${from}.json`);
try {
fs.writeFileSync(filePath, JSON.stringify(configAtual, null, 2), "utf8");
return enviar(`✅ O comando *${comando}* foi adicionado à lista de comandos só para ADM!`);
} catch (e) {
console.error(e);
return enviar("❌ Erro ao salvar a configuração do grupo.");
}
},
};