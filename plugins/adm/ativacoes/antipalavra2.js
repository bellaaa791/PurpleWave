"use strict";
module.exports = {
nomes: ["antipalavra2"],
desc: "Ativa ou desativa o sistema de antipalavra2 no grupo",
tags: ["grupo", "config"],
run: async () => {
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);

const configAtual = lergrupo(from);
if (!q) {
const estado = configAtual.antipalavra2 ? "✅ Ativado" : "❌ Desativado";
return enviar(`⛔ antipalavra2 atualmente: ${estado}\nUse: ${prefix}antipalavra2 on/off`);
}

const opcao = args[0].toLowerCase();

if (opcao === "on") {
if (configAtual.antipalavra2) {
return enviar("⚠ O antipalavra2 já está ativado!");
}
await togglegrupoconfig(from, "antipalavra2"); 
return enviar("✅ antipalavra2 ativado no grupo!");
} else if (opcao === "off") {
if (!configAtual.antipalavra2) {
return enviar("⚠ O antipalavra2 já está desativado!");
}
await togglegrupoconfig(from, "antipalavra2"); 
return enviar("✅ antipalavra2 desativado no grupo!");
} else {
return enviar(`⚠ Opção inválida. Use: ${prefix}antipalavra2 on|off`);
}
},
};