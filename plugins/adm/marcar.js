module.exports = {
nomes: ["marcar"],
uso: [""],
desc: ["Marque todos os usuários do grupo!"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();

if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);
if (!isBotGroupAdmins) return enviar(resposta.bot_adm);
async function marcac() {
const bla = [];
let blad = `• Mencionando os membros comuns do grupo ou de uma comunidade. ${!q ? "" : `\n*Mensagem:* ${q}`}\n\n`;

for (let i of somembros) {
blad += `» @${i.split("@")[0]}\n`;
bla.push(i);
}

const blam = JSON.stringify(somembros);
if (blam.length === 2) {
return reply(`❌️ Olá *${pushname}* - Não contém nenhum membro comum no grupo, apenas administradores.`);
}

await mentions(blad, bla, true);
}
marcac().catch((error) => {
console.log(error);
});
},
};
