"use strict";
module.exports = {
nomes: ["antistatus"],
desc: "Ativa ou desativa o sistema de antistatus no grupo",
tags: ["grupo", "config"],
run: async () => {
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);

const configAtual = lergrupo(from);
if (!q) {
const estado = configAtual.antistatus ? "✅ Ativado" : "❌ Desativado";
return enviar(`⛔ antistatus atualmente: ${estado}\nUse: ${prefix}antistatus on/off`);
}

const opcao = args[0].toLowerCase();

if (opcao === "on") {
if (configAtual.antistatus) {
return enviar("⚠ O antistatus já está ativado!");
}
await togglegrupoconfig(from, "antistatus"); 
return enviar("✅ antistatus ativado no grupo!");
} else if (opcao === "off") {
if (!configAtual.antistatus) {
return enviar("⚠ O antistatus já está desativado!");
}
await togglegrupoconfig(from, "antistatus"); 
return enviar("✅ antistatus desativado no grupo!");
} else {
return enviar(`⚠ Opção inválida. Use: ${prefix}antistatus on|off`);
}
},
};