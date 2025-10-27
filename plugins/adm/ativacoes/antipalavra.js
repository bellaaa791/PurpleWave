"use strict";
module.exports = {
nomes: ["antipalavra"],
desc: "Ativa ou desativa o sistema de antipalavra no grupo",
tags: ["grupo", "config"],
run: async () => {
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);

const configAtual = lergrupo(from);
if (!q) {
const estado = configAtual.antipalavra ? "✅ Ativado" : "❌ Desativado";
return enviar(`⛔ antipalavra atualmente: ${estado}\nUse: ${prefix}antipalavra on/off`);
}

const opcao = args[0].toLowerCase();

if (opcao === "on") {
if (configAtual.antipalavra) {
return enviar("⚠ O antipalavra já está ativado!");
}
await togglegrupoconfig(from, "antipalavra"); 
return enviar("✅ antipalavra ativado no grupo!");
} else if (opcao === "off") {
if (!configAtual.antipalavra) {
return enviar("⚠ O antipalavra já está desativado!");
}
await togglegrupoconfig(from, "antipalavra"); 
return enviar("✅ antipalavra desativado no grupo!");
} else {
return enviar(`⚠ Opção inválida. Use: ${prefix}antipalavra on|off`);
}
},
};