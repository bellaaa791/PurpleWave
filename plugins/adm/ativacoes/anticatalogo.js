"use strict";
module.exports = {
nomes: ["anticatalogo"],
desc: "Ativa ou desativa o sistema de anticatalogo no grupo",
tags: ["grupo", "config"],
run: async () => {
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);

const configAtual = lergrupo(from);
if (!q) {
const estado = configAtual.anticatalogo ? "✅ Ativado" : "❌ Desativado";
return enviar(`⛔ anticatalogo atualmente: ${estado}\nUse: ${prefix}anticatalogo on/off`);
}

const opcao = args[0].toLowerCase();

if (opcao === "on") {
if (configAtual.anticatalogo) {
return enviar("⚠ O anticatalogo já está ativado!");
}
await togglegrupoconfig(from, "anticatalogo"); 
return enviar("✅ anticatalogo ativado no grupo!");
} else if (opcao === "off") {
if (!configAtual.anticatalogo) {
return enviar("⚠ O anticatalogo já está desativado!");
}
await togglegrupoconfig(from, "anticatalogo"); 
return enviar("✅ anticatalogo desativado no grupo!");
} else {
return enviar(`⚠ Opção inválida. Use: ${prefix}anticatalogo on|off`);
}
},
};