const fs = require("fs");
const path = require("path");
module.exports = {
nomes: ["list_mensagens", "listar_mensagens"],
uso: [""],
desc: ["Lista todas as mensagens programadas do grupo"],
run: async () => {
if (!isGroup) return enviar("⚠ Este comando só pode ser usado em grupos");
if (!isGroupAdmins) return enviar("⚠ Apenas administradores podem usar este comando");
aumentartotalcmds();
aumentarcmdsgeral();
try {
const gruposDir = path.join(__dirname, "../../utils/json/grupos");
const filePath = path.join(gruposDir, `${from}.json`);
if (!fs.existsSync(filePath)) return enviar("⚠ Este grupo não possui mensagens programadas");
const config = JSON.parse(fs.readFileSync(filePath));
if (!Array.isArray(config.msgpeogramada) || config.msgpeogramada.length === 0) {
return enviar("⚠ Não há mensagens programadas neste grupo");
}
let lista = "📋 *Mensagens programadas neste grupo:*\n\n";
config.msgpeogramada.forEach((msg, i) => {
lista += `🔹 ID: ${msg.id}\n`;
lista += `📌 Tipo: ${msg.tipo}\n`;
if (msg.tipo === "texto") {
lista += `📝 Conteúdo: ${msg.conteudo}\n`;
} else if (msg.tipo === "imagem") {
lista += `🖼️ Legenda: ${msg.conteudo.caption || "(sem legenda)"}\n`;
}
lista += `⏱️ Intervalo: ${msg.intervalo / 1000}s\n`;
lista += `🔄 Repetições: ${msg.repeticoes}\n`;
lista += `🕒 Última execução: ${msg.ultimaExecucao || "Nunca"}\n`;
lista += "──────────────────────\n";
});
enviar(lista.trim());
} catch (err) {
console.error("❌ Erro ao listar mensagens programadas:", err);
enviar("❌ Erro ao listar mensagens programadas");
}
},
};