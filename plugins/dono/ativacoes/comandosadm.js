"use strict";
module.exports = {
nomes: ["comandosadm"],
desc: "Ativa ou desativa o sistema de comandosadm no grupo",
tags: ["grupo", "config"],
run: async () => {
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);

const configAtual = lergrupo(from);
if (!q) {
const estado = configAtual.comandosadm ? "✅ Ativado" : "❌ Desativado";
return enviar(`⛔ comandosadm atualmente: ${estado}\nUse: ${prefix}comandosadm on/off`);
}

const opcao = args[0].toLowerCase();

if (opcao === "on") {
if (configAtual.comandosadm) {
return enviar("⚠ O comandosadm já está ativado!");
}
await togglegrupoconfig(from, "comandosadm"); 
return enviar("✅ comandosadm ativado no grupo!");
} else if (opcao === "off") {
if (!configAtual.comandosadm) {
return enviar("⚠ O comandosadm já está desativado!");
}
await togglegrupoconfig(from, "comandosadm"); 
return enviar("✅ comandosadm desativado no grupo!");
} else {
return enviar(`⚠ Opção inválida. Use: ${prefix}comandosadm on|off`);
}
},
};