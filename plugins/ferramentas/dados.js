module.exports = {
nomes: ["dados", "estatisticas"],
uso: [""],
run: async () => {
const grupos = await bot.groupFetchAllParticipating();
const total = Object.keys(grupos).length;
tals = totalcmds();
tals2 = totalcmdsgeral();
enviar(`🤖 O bot está em ${total} grupos.
🔟 ${tals} comandos executados hoje.
📈 ${tals2} comandos executados ao todo.
`);
aumentartotalcmds();
aumentarcmdsgeral();
},
};
