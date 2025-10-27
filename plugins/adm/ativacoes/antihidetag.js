"use strict";
module.exports = {
nomes: ["antihidetag"],
desc: "Ativa ou desativa o sistema de antihidetag no grupo",
tags: ["grupo", "config"],
run: async () => {
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);

const configAtual = lergrupo(from);
if (!q) {
const estado = configAtual.antihidetag ? "✅ Ativado" : "❌ Desativado";
return enviar(`⛔ antihidetag atualmente: ${estado}\nUse: ${prefix}antihidetag on/off`);
}

const opcao = args[0].toLowerCase();

if (opcao === "on") {
if (configAtual.antihidetag) {
return enviar("⚠ O antihidetag já está ativado!");
}
await togglegrupoconfig(from, "antihidetag"); 
return enviar("✅ antihidetag ativado no grupo!");
} else if (opcao === "off") {
if (!configAtual.antihidetag) {
return enviar("⚠ O antihidetag já está desativado!");
}
await togglegrupoconfig(from, "antihidetag"); 
return enviar("✅ antihidetag desativado no grupo!");
} else {
return enviar(`⚠ Opção inválida. Use: ${prefix}antihidetag on|off`);
}
},
};