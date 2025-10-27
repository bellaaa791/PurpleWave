"use strict";
module.exports = {
nomes: ["antilink"],
desc: "Ativa ou desativa o sistema de antilink no grupo",
tags: ["grupo", "config"],
run: async () => {
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);
const configAtual = lergrupo(from);
if (!q) {
const estado = configAtual.antilinkgp ? "✅ Ativado" : "❌ Desativado";
return enviar(`⛔ Antilink atualmente: ${estado}\nUse: ${prefix}antilink on/off`);
}

const opcao = args[0].toLowerCase();

if (opcao === "on") {
if (configAtual.antilinkgp) {
return enviar("⚠ O antilink já está ativado!");
}
await togglegrupoconfig(from, "antilinkgp");
return enviar("✅ Antilink ativado no grupo!");
} else if (opcao === "off") {
if (!configAtual.antilinkgp) {
return enviar("⚠ O antilink já está desativado!");
}
await togglegrupoconfig(from, "antilinkgp");
return enviar("✅ Antilink desativado no grupo!");
} else {
return enviar(`⚠ Opção inválida. Use: ${prefix}antilink on|off`);
}
},
};