"use strict";
const fs = require("fs");
const path = require("path");
module.exports = {
nomes: ["setilimite"],
desc: "Define ou consulta o limite máximo de caracteres no grupo",
tags: ["grupo", "config"],
run: async () => {
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);
const grupoPath = path.join(__dirname, "../../../utils/json/grupos", `${from}.json`);
let configAtual = {};
try {
configAtual = JSON.parse(fs.readFileSync(grupoPath, "utf-8"));
} catch (e) {
console.log("⚠ Erro ao ler config do grupo, criando padrão");
configAtual = { limitecaracteres: false, limite: 0 };
}
const limiteAtual = configAtual.limite || 0;
if (!q) {
return enviar(`⛔ Limite de caracteres atual no grupo: ${limiteAtual}`);
}
const valor = parseInt(args[0]);
if (isNaN(valor) || valor < 0) {
return enviar(`⚠ Valor inválido. Use: ${prefix}limitecaracteres [numero igual ou maior que 0]`);
}
configAtual.limite = valor;
configAtual.limitecaracteres = valor > 0; 
try {
fs.writeFileSync(grupoPath, JSON.stringify(configAtual, null, 2), "utf-8");
} catch (e) {
return enviar("❌ Erro ao salvar configuração do grupo!");
}

return enviar(`✅ Limite de caracteres atualizado!\nAnterior: ${limiteAtual}\nNovo: ${valor}`);
},
};