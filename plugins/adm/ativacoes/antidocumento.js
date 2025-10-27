"use strict";
module.exports = {
nomes: ["antidocumento"],
desc: "Ativa ou desativa o sistema de antidocumento no grupo",
tags: ["grupo", "config"],
run: async () => {
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);

const configAtual = lergrupo(from);
if (!q) {
const estado = configAtual.antidocumento ? "✅ Ativado" : "❌ Desativado";
return enviar(`⛔ antidocumento atualmente: ${estado}\nUse: ${prefix}antidocumento on/off`);
}

const opcao = args[0].toLowerCase();

if (opcao === "on") {
if (configAtual.antidocumento) {
return enviar("⚠ O antidocumento já está ativado!");
}
await togglegrupoconfig(from, "antidocumento"); 
return enviar("✅ antidocumento ativado no grupo!");
} else if (opcao === "off") {
if (!configAtual.antidocumento) {
return enviar("⚠ O antidocumento já está desativado!");
}
await togglegrupoconfig(from, "antidocumento"); 
return enviar("✅ antidocumento desativado no grupo!");
} else {
return enviar(`⚠ Opção inválida. Use: ${prefix}antidocumento on|off`);
}
},
};