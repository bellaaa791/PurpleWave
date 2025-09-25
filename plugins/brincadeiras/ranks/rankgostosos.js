module.exports = {
nomes: ["rankgostosos", "gostosos"],
uso: [""],
desc: ["Mostra o rank dos 5 mais gostosos do grupo!"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();

if (!isGroup) return enviar(resposta.so_grupo);
if(!modobrincadeira) return enviar(resposta.modobrincadeira)
let ABC = `🔥 *RANK DOS 5 MAIS GOSTOSOS DO GRUPO!*\n`;

const TMGOSTOSOS = [
"❤️‍🔥Olha quem tá abalando corações! ❤️‍🔥",
"😎Esse(a) é pura simpatia e beleza! 😎",
"😏Pode passar que o charme já chega junto! 😏",
" ✨A beleza desse(a) é de outro nível! ✨",
"🚨Se o charme fosse crime, estaria preso(a)! 🚨",
"😍Olha o corpo e o sorriso desse(a)! 😍",
"💘O(a) crush oficial do grupo! 💘",
"🏆Pode colocar na vitrine que tá valendo! 🏆",
"😚Esse(a) faz todos suspirarem! 😚",
"💖Simplesmente irresistível! 💖",
"🔥Olha o poder de sedução! 🔥"
];
let mentions = []; 

for (let i = 0; i < 5; i++) {
const membro = somembros[Math.floor(Math.random() * somembros.length)];
const porcentagem = Math.floor(Math.random() * 100);
const frase = TMGOSTOSOS[Math.floor(Math.random() * TMGOSTOSOS.length)];
mentions.push(membro); 

ABC += `💜${i + 1}° *[${porcentagem}%]* - @${membro.split("@")[0]}\n╰»${frase}\n`;
}

await enviarimg(fotorankgostosos, ABC, mentions);
},
};
