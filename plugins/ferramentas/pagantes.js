const axios = require("axios");
const moment = require("moment-timezone");

module.exports = {
nomes: ["horarios", "pagantes"],
desc: ["Obtenha os melhores horários para apostar nos sites de apostas!"],
uso: [""],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();

try {
const { data } = await axios.get(
"https://api.sabrinabot.xyz/api/outros/horarios-pagantes?apikey=@mosca_virus"
);

const resultado = data.resultado.schedules
.map((v) => {
const times = v.times.map((v2) => `\t${v2}`).join("\n");
return `${v.name}\n${times}`;
})
.join("\n\n");

await enviar(
`HORÁRIO PAGANTE DAS ${moment
.tz("America/Sao_Paulo")
.format("HH")}:00\n\n${resultado}`
);
} catch (error) {
console.error("Erro ao buscar horários:", error.message);
return enviar(resposta.erro || "❌ Ocorreu um erro ao obter os horários.");
}
},
};