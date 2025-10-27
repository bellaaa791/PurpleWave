"use strict";
module.exports = {
nomes: ["rankingusers"],
desc: "Ativa ou desativa o sistema de rankingusers no grupo",
tags: ["grupo", "config"],
run: async () => {
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);

const configAtual = lergrupo(from);
if (!q) {
const estado = configAtual.rankingusers ? "✅ Ativado" : "❌ Desativado";
return enviar(`⛔ rankingusers atualmente: ${estado}\nUse: ${prefix}rankingusers on/off`);
}

const opcao = args[0].toLowerCase();

if (opcao === "on") {
if (configAtual.rankingusers) {
return enviar("⚠ O rankingusers já está ativado!");
}
await togglegrupoconfig(from, "rankingusers"); 
return enviar("✅ rankingusers ativado no grupo!");
} else if (opcao === "off") {
if (!configAtual.rankingusers) {
return enviar("⚠ O rankingusers já está desativado!");
}
await togglegrupoconfig(from, "rankingusers"); 
return enviar("✅ rankingusers desativado no grupo!");
} else {
return enviar(`⚠ Opção inválida. Use: ${prefix}rankingusers on|off`);
}
},
};