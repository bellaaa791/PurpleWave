"use strict";
module.exports = {
nomes: ["antiimg"],
desc: "Ativa ou desativa o sistema de antiimg no grupo",
tags: ["grupo", "config"],
run: async () => {
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);

const configAtual = lergrupo(from);
if (!q) {
const estado = configAtual.antiimg ? "✅ Ativado" : "❌ Desativado";
return enviar(`⛔ antiimg atualmente: ${estado}\nUse: ${prefix}antiimg on/off`);
}

const opcao = args[0].toLowerCase();

if (opcao === "on") {
if (configAtual.antiimg) {
return enviar("⚠ O antiimg já está ativado!");
}
await togglegrupoconfig(from, "antiimg"); 
return enviar("✅ antiimg ativado no grupo!");
} else if (opcao === "off") {
if (!configAtual.antiimg) {
return enviar("⚠ O antiimg já está desativado!");
}
await togglegrupoconfig(from, "antiimg"); 
return enviar("✅ antiimg desativado no grupo!");
} else {
return enviar(`⚠ Opção inválida. Use: ${prefix}antiimg on|off`);
}
},
};