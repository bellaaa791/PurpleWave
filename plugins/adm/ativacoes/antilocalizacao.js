"use strict";
module.exports = {
nomes: ["antilocalizacao"],
desc: "Ativa ou desativa o sistema de antilocalizacao no grupo",
tags: ["grupo", "config"],
run: async () => {
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);

const configAtual = lergrupo(from);
if (!q) {
const estado = configAtual.antilocalizacao ? "✅ Ativado" : "❌ Desativado";
return enviar(`⛔ antilocalizacao atualmente: ${estado}\nUse: ${prefix}antilocalizacao on/off`);
}

const opcao = args[0].toLowerCase();

if (opcao === "on") {
if (configAtual.antilocalizacao) {
return enviar("⚠ O antilocalizacao já está ativado!");
}
await togglegrupoconfig(from, "antilocalizacao"); 
return enviar("✅ antilocalizacao ativado no grupo!");
} else if (opcao === "off") {
if (!configAtual.antilocalizacao) {
return enviar("⚠ O antilocalizacao já está desativado!");
}
await togglegrupoconfig(from, "antilocalizacao"); 
return enviar("✅ antilocalizacao desativado no grupo!");
} else {
return enviar(`⚠ Opção inválida. Use: ${prefix}antilocalizacao on|off`);
}
},
};