module.exports = {
nomes: ["fazernick"],
desc: ["Transforma um texto normal em diferentes fontes!"],
uso: ["tokyo"],

run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();

if (!q) return enviar(resposta.textoparametro);

let nomety = Array.isArray(q) ? q.join(" ") : q;

try {
const url = `${urlapi}/api/ferramentas/fazernick?apikey=${apikey}&query=${encodeURIComponent(q)}`;
const data = await requisicaoComLimite(url);
if (data.limite) {
return enviar(`${resposta.limiteesgoted} ${data.limite} ⏳`);
}


if (
data &&
data.data &&
Array.isArray(data.data.texto) &&
data.data.texto.length > 0
) {
let mensagem = `*ミResultados de "${nomety}":*\n\n`;

data.data.texto.forEach((item, index) => {
if (item.fonte && item.fonte.trim() !== "") {
const emoji = index % 2 === 0 ? "🍁" : "💞";
mensagem += `${emoji} ${item.nome}: ${item.fonte}\n`;
}
});

enviar(mensagem);
} else {
return enviar("*⚠ Nenhum resultado encontrado. Tente outro termo!*");
}
} catch (erro) {
enviar(resposta.erro);
console.error("Erro ao processar fazernick:", erro);
}
},
};
