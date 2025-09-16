module.exports = {
nomes: ["grupo"],
desc: [
"Ativa ou desativa que somente os administradores possam enviar mensagens!",
],
uso: [""],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);
if (!isBotGroupAdmins) return enviar(resposta.bot_adm);

try {
const metadata = await bot.groupMetadata(from);
const isClosed = metadata.announce;

if (isClosed) {
enviar(resposta.grupo_on);
await bot.groupSettingUpdate(from, "not_announcement");
} else {
enviar(resposta.grupo_off);
await bot.groupSettingUpdate(from, "announcement");
}
} catch (error) {
console.error("Erro ao obter informações do grupo:", error);
enviar("Ocorreu um erro ao tentar modificar as configurações do grupo.");
}
},
};
