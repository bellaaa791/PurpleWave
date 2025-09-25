module.exports = {
nomes: ["tktk4", "tiktokmp4"],
desc: ["Baixe vídeos do tiktok através do link!"],
uso: ["https://vm.tiktok.com/ZMAS7RHw1/"],

run: async () => {
if (!q) return enviar("Envie o link do vídeo do tiktok!");

try {
aumentartotalcmds();
aumentarcmdsgeral();

const url = `${urlapi}/api/downloads/tiktok?query=${q}&apikey=${apikey}`


const data = await requisicaoComLimite(url);
if (data.limite) {
return enviar(`${resposta.limiteesgoted} ${data.limite} ⏳`);
}


const json = data.data;
const videoUrl = json.texto?.video;

if (videoUrl) {
enviarvideo(videoUrl, "*Aqui está*");
} else {
enviar("⚠ Não foi possível encontrar o vídeo. Verifique o link.");
}
} catch (err) {
console.error(err);
enviar("Ocorreu um erro ao buscar o vídeo.");
}
},
};
