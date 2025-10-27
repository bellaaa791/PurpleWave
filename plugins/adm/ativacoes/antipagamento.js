"use strict";
module.exports = {
nomes: ["antipagamento"],
desc: "Ativa ou desativa o sistema de antipagamento no grupo",
tags: ["grupo", "config"],
run: async () => {
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);

const configAtual = lergrupo(from);
if (!q) {
const estado = configAtual.antipagamento ? "✅ Ativado" : "❌ Desativado";
return enviar(`⛔ antipagamento atualmente: ${estado}\nUse: ${prefix}antipagamento on/off`);
}

const opcao = args[0].toLowerCase();

if (opcao === "on") {
if (configAtual.antipagamento) {
return enviar("⚠ O antipagamento já está ativado!");
}
await togglegrupoconfig(from, "antipagamento"); 
return enviar("✅ antipagamento ativado no grupo!");
} else if (opcao === "off") {
if (!configAtual.antipagamento) {
return enviar("⚠ O antipagamento já está desativado!");
}
await togglegrupoconfig(from, "antipagamento"); 
return enviar("✅ antipagamento desativado no grupo!");
} else {
return enviar(`⚠ Opção inválida. Use: ${prefix}antipagamento on|off`);
}
},
};