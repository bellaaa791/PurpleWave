"use strict";

module.exports = {
nomes: ["antipv"],
desc: "Ativa ou desativa o modo antipv do bot",
tags: ["dono", "config"],
run: async () => {
const { salvarConfig, lerConfig } = require("../../../config.js");

const configAtual = lerConfig();

if (!dono) return enviar("⚠ Apenas o dono pode usar este comando.");
if (!q) {
const estado = configAtual.antipv ? "✅ Ativado" : "❌ Desativado";
return enviar(`Modo antipv atualmente: ${estado}\nUse: ${prefix}antipv on/off`);
}

const opcao = args[0].toLowerCase();

if (opcao === "on") {
if (configAtual.antipv) {
return enviar("⚠ O modo antipv já está ativado!");
}
if (salvarConfig({ antipv: true })) {
return enviar("✅ antipv ativado!");
} else {
return enviar("❌ Erro ao ativar antipv.");
}
} else if (opcao === "off") {
if (!configAtual.antipv) {
return enviar("⚠ O modo antipv já está desativado!");
}
if (salvarConfig({ antipv: false })) {
return enviar("✅ antipv desativado!");
} else {
return enviar("❌ Erro ao desativar antipv.");
}
} else {
return enviar(`⚠ Opção inválida. Use: ${prefix}antipv on|off`);
}
},
};