module.exports = {
nomes: ["hidetag"],
uso: ["fiquem de olho no grupo!"],
desc: ["Marque todos os usuários com uma mensagem (invisível)"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();

if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);
if (!isBotGroupAdmins) return enviar(resposta.bot_adm);
if (!q) return enviar(resposta.textologo);
async function marcac() {
if (!somembros || somembros.length === 0) {
return enviar(`❌️ Olá *${pushname}* - Não contém nenhum membro comum no grupo.`);
}

const blad = q ? `*Mensagem:* ${q}` : '';
const bla = somembros;
await mentions(blad, bla, true);
}

marcac().catch((error) => {
console.log(error);
});
},
};
