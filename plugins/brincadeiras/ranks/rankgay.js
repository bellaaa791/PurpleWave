module.exports = {
nomes: ["rankgay"],
uso: [""],
desc: ["Mostra o rank dos 5 mais gays do grupo!"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();

if (!isGroup) return enviar(resposta.so_grupo);
if(!modobrincadeira) return enviar(resposta.modobrincadeira)
let ABC = `🏳️‍🌈 *RANK DOS 5 MAIS GAYS DO GRUPO!*`;

const TMGAYS = [
"Esse aí gosta de cheirar banana até umas horas kakak",
"Gosta de ser dominado e chicoteado.",
"Viadinho gente boa, nada contra os veados.",
"Esse aí roda mais que roda de caminhão.",
"Mapoa é você meu amor?",
"Esse aí ainda tá no armário, a franga tá presa!",
"Profissional na garganta profunda!",
"Essa bicha é finíssima!",
"Essa aí precisa sair do closet ainda!",
"Vixi esse aí é vitaminado!",
"Vixi um gay vulgo Irene!",
"Poc fechosa, amo tu mona!"
];

let mentions = []; 

for (let i = 0; i < 5; i++) {
const membro = somembros[Math.floor(Math.random() * somembros.length)];
const porcentagem = Math.floor(Math.random() * 100);
const frase = TMGAYS[Math.floor(Math.random() * TMGAYS.length)];
mentions.push(membro); 

ABC += `💜${i + 1}° *[${porcentagem}%]* - @${membro.split("@")[0]}\n╰»${frase}\n`;
}

await enviarimg(fotorankgay, ABC, mentions);
},
};
