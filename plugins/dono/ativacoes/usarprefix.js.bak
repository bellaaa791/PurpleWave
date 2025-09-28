"use strict";

module.exports = {
nomes: ["usarprefix"],
desc: "Ativa ou desativa o usode prefixo.",
tags: ["dono", "config"],
run: async () => {
const { salvarConfig, lerConfig } = require("../../../config.js");

const configAtual = lerConfig();

if (!args[0]) {
const estado = configAtual.prefixo ? "✅ Ativado" : "❌ Desativado";
return enviar(`Modo prefixo atualmente: ${estado}\nUse: ${prefix}prefixo on/off`);
}

const opcao = args[0].toLowerCase();

if (opcao === "on") {
if (salvarConfig({ prefixo: true })) {
return enviar("✅ prefixo ativado!");
} else {
return enviar("❌ Erro ao ativar prefixo.");
}
} else if (opcao === "off") {
if (salvarConfig({ prefixo: false })) {
return enviar("✅ prefixo desativado!");
} else {
return enviar("❌ Erro ao desativar prefixo.");
}
} else {
return enviar(`⚠ Opção inválida. Use: ${prefix}prefixo on|off`);
}
},
};
