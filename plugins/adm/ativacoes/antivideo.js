"use strict";
module.exports = {
nomes: ["antivideo"],
desc: "Ativa ou desativa o sistema de antivideo no grupo",
tags: ["grupo", "config"],
run: async () => {
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);

const configAtual = lergrupo(from);
if (!q) {
const estado = configAtual.antivideo ? "✅ Ativado" : "❌ Desativado";
return enviar(`⛔ antivideo atualmente: ${estado}\nUse: ${prefix}antivideo on/off`);
}

const opcao = args[0].toLowerCase();

if (opcao === "on") {
if (configAtual.antivideo) {
return enviar("⚠ O antivideo já está ativado!");
}
await togglegrupoconfig(from, "antivideo"); 
return enviar("✅ antivideo ativado no grupo!");
} else if (opcao === "off") {
if (!configAtual.antivideo) {
return enviar("⚠ O antivideo já está desativado!");
}
await togglegrupoconfig(from, "antivideo"); 
return enviar("✅ antivideo desativado no grupo!");
} else {
return enviar(`⚠ Opção inválida. Use: ${prefix}antivideo on|off`);
}
},
};