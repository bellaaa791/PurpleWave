module.exports = {
nomes: ["listar_alugueis", "alugueis"],
uso: [],
desc: ["Lista todos os alugueis ativos, mostrando nome do grupo e ID do aluguel"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
const alugueis = listarAlugueis();
const grupos = Object.keys(alugueis);
if (grupos.length === 0) {
return enviar("❌ Nenhum aluguel ativo no momento.");
}

let mensagem = "📋 Aluguéis ativos:\n\n";

for (const groupId of grupos) {
const aluguel = alugueis[groupId];
let nomeGrupo = "Grupo desconhecido";

try {
const metadata = await bot.groupMetadata(groupId); 
nomeGrupo = metadata.subject || groupId;
} catch (err) {
nomeGrupo = groupId;
}

mensagem += `🏷️ Nome: ${nomeGrupo}\n` +
`🆔 ID do grupo: ${groupId}\n` +
`🔑 ID do aluguel: ${aluguel.id}\n` +
`📅 Expira em: ${aluguel.expira}\n\n`;
}

enviar(mensagem);
},
};