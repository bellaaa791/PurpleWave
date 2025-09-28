module.exports = {
nomes: ["blockcmd"], 
uso: ["<comando>"],
desc: ["Bloqueia um comando."],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();

if (!dono) return enviar(resposta.so_dono);
if (!q) return enviar("⚠️ Informe o comando que deseja bloquear.");

if (q === "blockcmd") {
return enviar("❌ Você não pode bloquear o comando *bloquearcmd*.");
}
const comando = q.toLowerCase();
const bloqueados = carregarBloqueados();

if (bloqueados.includes(comando)) {
return enviar(`⚠️ O comando *${comando}* já está bloqueado.`);
}

adicionarBloqueado(comando);
enviar(`🚫 O comando *${comando}* foi bloqueado com sucesso!`);
},
};