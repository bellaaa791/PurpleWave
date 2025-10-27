module.exports = {
nomes: ["blockuser"], 
uso: ["@user"],
desc: ["Bloqueia um usuário de usar comandos."],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();

if (!dono) return enviar(resposta.so_dono);
if (!menc_os2) return enviar("⚠️ Informe o usuário que deseja bloquear.");

if (menc_os2 === numerodono) {
return enviar("❌ Você não pode bloquear o dono do bot.");
}
const comando = q.toLowerCase();
const bloqueados = carregarBlocks();

if (bloqueados.includes(menc_os2)) {
return enviar(`⚠️ O user já está bloqueado.`);
}

adicionarBlock(menc_os2);
enviar(`🚫 O user foi bloqueado com sucesso!`);
},
};