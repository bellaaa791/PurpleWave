"use strict";
const fs = require("fs");
const path = require("path");
module.exports = {
nomes: ["delcomandodono"],
desc: "Remove comandos da lista somente para dono",
run: async () => {
if (!isGroup) return enviar(resposta.so_grupo);
if (!dono) return enviar(resposta.so_dono);
const configAtual = lergrupo(from);
if (!q) {
return enviar(`⚠ Use: ${prefix}delcomandodono nomeDoComando`);
}
const comando = q.toLowerCase().trim();
if (!Array.isArray(configAtual.comandosdono) || configAtual.comandosdono.length === 0) {
return enviar("⚠ Nenhum comando está definido como só para dono neste grupo.");
}
if (!configAtual.comandosdono.includes(comando)) {
return enviar(`❌ O comando *${comando}* não está marcado como só para dono.`);
}
configAtual.comandosdono = configAtual.comandosdono.filter(c => c !== comando);
const filePath = path.join(__dirname, "../../utils/json/grupos", `${from}.json`);
try {
fs.writeFileSync(filePath, JSON.stringify(configAtual, null, 2), "utf8");
return enviar(`✅ O comando *${comando}* foi removido da lista de comandos só para dono!`);
} catch (e) {
console.error(e);
return enviar("❌ Erro ao salvar a configuração do grupo.");
}
},
};