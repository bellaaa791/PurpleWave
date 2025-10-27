module.exports = {
nomes: ["rg_aluguel"],
uso: ["<tempo> <dias|horas>"],
desc: ["Registra o aluguel do grupo atual"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!isGroup) return enviar(resposta.so_grupo);
if (!dono) return enviar(resposta.so_dono);
const tempo = parseInt(args[0]);
const tipo = args[1]; 
if (!tempo || !["dias", "horas"].includes(tipo)) {
return enviar(`⚠ Uso correto: ${prefix}rg_aluguel <tempo> <dias|horas>`);
}
const alugueis = listarAlugueis();
if (alugueis[from]) {
return enviar(
`❌ Este grupo já possui um aluguel ativo!\n\n` +
`🔑 ID: ${alugueis[from].id}\n` +
`📅 Expira em: ${alugueis[from].expira}\n\n` +
`👉 Se quiser modificar os dias/horas restantes, apague o aluguel com:\n` +
`> apagar_aluguel ${alugueis[from].id}\n` +
`e depois registre novamente.`
);
}
const aluguel = registrarAluguel(from, tempo, tipo);
enviar(
`✅ Grupo alugado com sucesso!\n\n` +
`🔑 ID: ${aluguel.id}\n` +
`⏳ Duração: ${aluguel.duracao}\n` +
`📅 Expira em: ${aluguel.expira}`
);
},
};