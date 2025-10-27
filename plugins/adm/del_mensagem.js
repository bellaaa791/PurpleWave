const fs = require("fs");
const path = require("path");
module.exports = {
nomes: ["del_mensagem"],
uso: ["<id>"],
desc: ["Apaga uma mensagem programada pelo ID"],
run: async () => {
if (!isGroup) return enviar("⚠ Este comando só pode ser usado em grupos");
if (!isGroupAdmins) return enviar("⚠ Apenas administradores podem usar este comando");
aumentartotalcmds();
aumentarcmdsgeral();
const idMsg = args[0];
if (!idMsg) return enviar(`⚠ Informe o ID da mensagem programada que deseja remover\nExemplo: ${prefix}del_mensagem 550666`);
try {
const gruposDir = path.join(__dirname, "../../utils/json/grupos");
const filePath = path.join(gruposDir, `${from}.json`);

if (!fs.existsSync(filePath)) return enviar("⚠ Este grupo não possui mensagens programadas");
const config = JSON.parse(fs.readFileSync(filePath));
if (!Array.isArray(config.msgpeogramada) || config.msgpeogramada.length === 0) {
return enviar("⚠ Este grupo não possui mensagens programadas");
}
const index = config.msgpeogramada.findIndex(msg => msg.id === idMsg);

if (index === -1) {
return enviar(`⚠ Nenhuma mensagem programada encontrada com o ID: ${idMsg}`);
}
const removida = config.msgpeogramada.splice(index, 1)[0];
fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
enviar(`✅ Mensagem programada removida com sucesso!\nID: ${removida.id}\nTipo: ${removida.tipo}`);
} catch (err) {
console.error("❌ Erro ao apagar mensagem programada:", err);
enviar("❌ Erro ao apagar mensagem programada");
}
},
};