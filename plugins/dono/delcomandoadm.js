"use strict";
const fs = require("fs");
const path = require("path");
module.exports = {
nomes: ["delcomandoadm"],
desc: "Remove comandos da lista somente para ADM",
run: async () => {
if (!isGroup) return enviar(resposta.so_grupo);
if (!dono) return enviar(resposta.so_dono);
const configAtual = lergrupo(from);
if (!q) {
return enviar(`⚠ Use: ${prefix}delcomandoadm nomeDoComando`);
}
const comando = q.toLowerCase().trim();
if (!Array.isArray(configAtual.comandosadm) || configAtual.comandosadm.length === 0) {
return enviar("⚠ Nenhum comando está definido como só para ADM neste grupo.");
}
if (!configAtual.comandosadm.includes(comando)) {
return enviar(`❌ O comando *${comando}* não está marcado como só para ADM.`);
}
configAtual.comandosadm = configAtual.comandosadm.filter(c => c !== comando);
const filePath = path.join(__dirname, "../../utils/json/grupos", `${from}.json`);
try {
fs.writeFileSync(filePath, JSON.stringify(configAtual, null, 2), "utf8");
return enviar(`✅ O comando *${comando}* foi removido da lista de comandos só para ADM!`);
} catch (e) {
console.error(e);
return enviar("❌ Erro ao salvar a configuração do grupo.");
}
},
};