module.exports = {
nomes: ["rankprogramers", "programadores"],
uso: [""],
desc: ["Mostra o rank dos 5 melhores programadores do grupo!"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();

if (!isGroup) return enviar(resposta.so_grupo);
if (!modobrincadeira) return enviar(resposta.modobrincadeira);

let ABC = `*💻RANK DOS 5 MELHORES PROGRAMADORES DO GRUPO!*\n`;

const TMPROG = [
"Dominando o Git como ninguém! 🏆",
"Rei(a) dos bugs solucionados no último minuto! 🐛",
"Esse(a) não dorme sem antes debugar o código! 😴",
"Café na veia e código funcionando! ☕",
"Mestre das funções recursivas! 🔄",
"Sempre sabe qual variável causou o problema! 🔍",
"Front-end, back-end e full-stack: domina tudo! 🌐",
"Código limpo, mente limpa! ✨",
"Debug nível Deus! 👑",
"O(a) programador(a) que faz magia com JS! ✨",
"Quando esse(a) digita, até o compilador se curva! 😎",
"Pode confiar, esse(a) nunca comete 'typo'! 🔤"
];

let mentions = [];

for (let i = 0; i < 5; i++) {
const membro = somembros[Math.floor(Math.random() * somembros.length)];
const porcentagem = Math.floor(Math.random() * 100);
const frase = TMPROG[Math.floor(Math.random() * TMPROG.length)];
mentions.push(membro);

ABC += `💜${i + 1}° *[${porcentagem}%]* - @${membro.split("@")[0]}\n╰»${frase}\n`;
}

await enviarimg(fotorankpgs, ABC, mentions);
},
};
