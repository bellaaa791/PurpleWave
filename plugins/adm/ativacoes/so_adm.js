"use strict";
module.exports = {
nomes: ["so_adm"],
desc: "Ativa ou desativa o sistema de so_adm no grupo",
tags: ["grupo", "config"],
run: async () => {
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);

const configAtual = lergrupo(from);
if (!q) {
const estado = configAtual.so_adm ? "✅ Ativado" : "❌ Desativado";
return enviar(`⛔ so_adm atualmente: ${estado}\nUse: ${prefix}so_adm on/off`);
}

const opcao = args[0].toLowerCase();

if (opcao === "on") {
if (configAtual.so_adm) {
return enviar("⚠ O so_adm já está ativado!");
}
await togglegrupoconfig(from, "so_adm"); 
return enviar("✅ so_adm ativado no grupo!");
} else if (opcao === "off") {
if (!configAtual.so_adm) {
return enviar("⚠ O so_adm já está desativado!");
}
await togglegrupoconfig(from, "so_adm"); 
return enviar("✅ so_adm desativado no grupo!");
} else {
return enviar(`⚠ Opção inválida. Use: ${prefix}so_adm on|off`);
}
},
};