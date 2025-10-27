module.exports = {
nomes: ["unblockuser"], 
uso: ["@user"],
desc: ["Desbloqueia um usuário de usar comandos."],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral
if (!dono) return enviar(resposta.so_dono);
if (!menc_os2) return enviar("⚠️ Informe o usuário que deseja desbloquear.");

if (menc_os2 === numerodono) {
return enviar("❌ Você não pode desbloquear o dono do bot.");
}

const comando = q.toLowerCase();
const bloqueados = carregarBlocks();

if (!bloqueados.includes(menc_os2)) {
return enviar(`⚠️ O user não está bloqueado.`);
}
removerBlock(menc_os2);
enviar(`✅ O user foi desbloqueado com sucesso!`);
},
};