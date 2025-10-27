module.exports = {
nomes: ["apagar_aluguel", "del_aluguel"],
uso: ["<id>"],
desc: ["Apaga o aluguel de um grupo pelo ID"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!dono) return enviar(resposta.so_dono);
const id = args[0];
if (!id) {
return enviar(`⚠ Uso correto: ${prefix}apagar_aluguel <id>`);
}
const sucesso = apagarAluguel(id);
if (sucesso) {
enviar(`✅ Aluguel com ID ${id} foi removido com sucesso!`);
} else {
enviar(`❌ Não encontrei nenhum aluguel com o ID ${id}.`);
}
},
};