module.exports = {
nomes: ["tapa"],
uso: ["@user"],
desc: ["Envia uma foto com uma legenda aleatória para o usuário mencionado."],
run: async (message, args) => {
aumentartotalcmds();
aumentarcmdsgeral();

if (!isGroup) return enviar(resposta.so_grupo);
if (!modobrincadeira) return enviar(resposta.modobrincadeira);
if (!menc_os2) return enviar(resposta.marcar_alguem);
const frases = [
"👋Tomou um tapa muito forte! 👋",
"😳Esse tapa foi incrível! 😳",
"💥Olha o tapa chegando! 💥",
"😵Ai! Isso doeu demais! 😵",
"😏Cuidado! Tapa nível mestre! 😏",
"😲Foi na cara! Que tapa! 😲",
"😱Surpresa! Um tapa inesperado! 😱",
"⚡Tapa lendário, ninguém segura! ⚡"
];
const frase = frases[Math.floor(Math.random() * frases.length)];
await enviarimg(fototapa, `${frase}\n╰» @${menc_os2.split("@")[0]}`, [menc_os2]);
},
};
