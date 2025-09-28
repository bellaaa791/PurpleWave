module.exports = {
nomes: ["unblockcmd"], 
uso: ["<comando>"],
desc: ["Desbloqueia um comando."],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();

if (!dono) return enviar(resposta.so_dono);
if (!q) return enviar("⚠️ Informe o comando que deseja desbloquear.");

const comando = q.toLowerCase();
const bloqueados = carregarBloqueados();

if (!bloqueados.includes(comando)) {
return enviar(`⚠️ O comando *${comando}* não está bloqueado.`);
}

removerBloqueado(comando);
enviar(`✅ O comando *${comando}* foi desbloqueado com sucesso!`);
},
};