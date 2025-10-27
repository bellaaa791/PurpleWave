"use strict";
module.exports = {
nomes: ["antisticker"],
desc: "Ativa ou desativa o sistema de antisticker no grupo",
tags: ["grupo", "config"],
run: async () => {
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);

const configAtual = lergrupo(from);
if (!q) {
const estado = configAtual.antisticker ? "✅ Ativado" : "❌ Desativado";
return enviar(`⛔ antisticker atualmente: ${estado}\nUse: ${prefix}antisticker on/off`);
}

const opcao = args[0].toLowerCase();

if (opcao === "on") {
if (configAtual.antisticker) {
return enviar("⚠ O antisticker já está ativado!");
}
await togglegrupoconfig(from, "antisticker"); 
return enviar("✅ antisticker ativado no grupo!");
} else if (opcao === "off") {
if (!configAtual.antisticker) {
return enviar("⚠ O antisticker já está desativado!");
}
await togglegrupoconfig(from, "antisticker"); 
return enviar("✅ antisticker desativado no grupo!");
} else {
return enviar(`⚠ Opção inválida. Use: ${prefix}antisticker on|off`);
}
},
};