"use strict";
module.exports = {
nomes: ["limitecaracteres"],
desc: "Ativa ou desativa o sistema de limitecaracteres no grupo",
tags: ["grupo", "config"],
run: async () => {
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);

const configAtual = lergrupo(from);
if (!q) {
const estado = configAtual.limitecaracteres ? "✅ Ativado" : "❌ Desativado";
return enviar(`⛔ limitecaracteres atualmente: ${estado}\nUse: ${prefix}limitecaracteres on/off`);
}

const opcao = args[0].toLowerCase();

if (opcao === "on") {
if (configAtual.limitecaracteres) {
return enviar("⚠ O limitecaracteres já está ativado!");
}
await togglegrupoconfig(from, "limitecaracteres"); 
return enviar("✅ limitecaracteres ativado no grupo!");
} else if (opcao === "off") {
if (!configAtual.limitecaracteres) {
return enviar("⚠ O limitecaracteres já está desativado!");
}
await togglegrupoconfig(from, "limitecaracteres"); 
return enviar("✅ limitecaracteres desativado no grupo!");
} else {
return enviar(`⚠ Opção inválida. Use: ${prefix}limitecaracteres on|off`);
}
},
};