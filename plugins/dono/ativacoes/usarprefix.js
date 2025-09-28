"use strict";

module.exports = {
nomes: ["usarprefix"],
desc: "Ativa ou desativa o usode usarprefixo.",
tags: ["dono", "config"],
run: async () => {
const { salvarConfig, lerConfig } = require("../../../config.js");

const configAtual = lerConfig();

if (!args[0]) {
const estado = configAtual.usarprefixo ? "✅ Ativado" : "❌ Desativado";
return enviar(`Modo usarprefixo atualmente: ${estado}\nUse: ${prefix}usarprefixo on/off`);
}

const opcao = args[0].toLowerCase();

if (opcao === "on") {
if (salvarConfig({ usarprefixo: true })) {
return enviar("✅ usarprefixo ativado!");
} else {
return enviar("❌ Erro ao ativar usarprefixo.");
}
} else if (opcao === "off") {
if (salvarConfig({ usarprefixo: false })) {
return enviar("✅ usarprefixo desativado!");
} else {
return enviar("❌ Erro ao desativar usarprefixo.");
}
} else {
return enviar(`⚠ Opção inválida. Use: ${prefix}usarprefixo on|off`);
}
},
};
