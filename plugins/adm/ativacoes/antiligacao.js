"use strict";
module.exports = {
nomes: ["antiligacao"],
desc: "Ativa ou desativa o sistema de antiligacao no grupo",
tags: ["grupo", "config"],
run: async () => {
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);

const configAtual = lergrupo(from);
if (!q) {
const estado = configAtual.antiligacao ? "✅ Ativado" : "❌ Desativado";
return enviar(`⛔ antiligacao atualmente: ${estado}\nUse: ${prefix}antiligacao on/off`);
}

const opcao = args[0].toLowerCase();

if (opcao === "on") {
if (configAtual.antiligacao) {
return enviar("⚠ O antiligacao já está ativado!");
}
await togglegrupoconfig(from, "antiligacao"); 
return enviar("✅ antiligacao ativado no grupo!");
} else if (opcao === "off") {
if (!configAtual.antiligacao) {
return enviar("⚠ O antiligacao já está desativado!");
}
await togglegrupoconfig(from, "antiligacao"); 
return enviar("✅ antiligacao desativado no grupo!");
} else {
return enviar(`⚠ Opção inválida. Use: ${prefix}antiligacao on|off`);
}
},
};