module.exports = {
nomes: ["beijar"],
uso: ["@user"],
desc: ["Envia uma foto com uma legenda aleatória para o usuário mencionado."],
run: async (message, args) => {
aumentartotalcmds();
aumentarcmdsgeral();

if (!isGroup) return enviar(resposta.so_grupo);
if (!modobrincadeira) return enviar(resposta.modobrincadeira);
if (!menc_os2) return enviar(resposta.marcar_alguem);
const frases = [
"💋Mandando um beijo carinhoso 💋",
"😘Olha só quem vai receber um beijinho 😘",
"💖Esse beijo é só pra você 💖",
"💜Receba esse beijo virtual 💜",
"💌Surpresa! Um beijo especial 💌"
];
const frase = frases[Math.floor(Math.random() * frases.length)];
await enviarimg(fotobeijo, `${frase}\n╰» @${menc_os2.split("@")[0]}`, [menc_os2]);
},
};
