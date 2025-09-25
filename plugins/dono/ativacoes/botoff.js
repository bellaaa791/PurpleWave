"use strict";

module.exports = {
nomes: ["botoff"],
desc: "Ativa ou desativa o modo Botoff do bot",
tags: ["dono", "config"],
run: async () => {
const { salvarConfig, lerConfig } = require("../../../config.js");

const configAtual = lerConfig();
if (!dono) return enviar(resposta.so_dono);
if (!q) {
const estado = configAtual.botoff ? "✅ Ativado" : "❌ Desativado";
return enviar(`Modo Botoff atualmente: ${estado}\nUse: ${prefix}botoff on/off`);
}

const opcao = args[0].toLowerCase();

if (opcao === "on") {
if (salvarConfig({ botoff: true })) {
return enviar("✅ Botoff ativado!");
} else {
return enviar("❌ Erro ao ativar botoff.");
}
} else if (opcao === "off") {
if (salvarConfig({ botoff: false })) {
return enviar("✅ Botoff desativado!");
} else {
return enviar("❌ Erro ao desativar botoff.");
}
} else {
return enviar(`⚠ Opção inválida. Use: ${prefix}botoff on|off`);
}
},
};
