"use strict";
const { togglegrupoconfig, getGrupoConfig } = require("../../../utils/grupo.js");

module.exports = {
nomes: ["bemvindo"],
desc: "Ativa ou desativa o sistema de bem-vindo no grupo",
tags: ["grupo", "config"],
run: async () => {
const configAtual = await getGrupoConfig(from);

if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);

if (!q) {
const estado = configAtual.bemvindo ? "✅ Ativado" : "❌ Desativado";
return enviar(`Bem-vindo atualmente: ${estado}\nUse: ${prefix}bemvindo on/off`);
}

const opcao = args[0].toLowerCase();

if (opcao === "on") {
if (configAtual.bemvindo) return enviar("⚠ O bem-vindo já está ativado!");
await togglegrupoconfig(from, "bemvindo");
return enviar("✅ Bem-vindo ativado no grupo!");
} 

else if (opcao === "off") {
if (!configAtual.bemvindo) return enviar("⚠ O bem-vindo já está desativado!");
await togglegrupoconfig(from, "bemvindo");
return enviar("✅ Bem-vindo desativado no grupo!");
} 

else {
return enviar(`⚠ Opção inválida. Use: ${prefix}bemvindo on|off`);
}
},
};