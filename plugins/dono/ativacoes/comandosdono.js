"use strict";
module.exports = {
nomes: ["comandosdono"],
desc: "Ativa ou desativa o sistema de comandosdono no grupo",
tags: ["grupo", "config"],
run: async () => {
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);

const configAtual = lergrupo(from);
if (!q) {
const estado = configAtual.comandosdono ? "✅ Ativado" : "❌ Desativado";
return enviar(`⛔ comandosdono atualmente: ${estado}\nUse: ${prefix}comandosdono on/off`);
}

const opcao = args[0].toLowerCase();

if (opcao === "on") {
if (configAtual.comandodono) {
return enviar("⚠ O comandosdono já está ativado!");
}
await togglegrupoconfig(from, "comandodono"); 
return enviar("✅ comandosdono ativado no grupo!");
} else if (opcao === "off") {
if (!configAtual.comandodono) {
return enviar("⚠ O comandosdono já está desativado!");
}
await togglegrupoconfig(from, "comandodono"); 
return enviar("✅ comandosdono desativado no grupo!");
} else {
return enviar(`⚠ Opção inválida. Use: ${prefix}comandosdono on|off`);
}
},
};