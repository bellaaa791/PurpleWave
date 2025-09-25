module.exports = {
nomes: ["instagram", "instamp4"],
desc: ["Baixe vídeos do instagram através do link!"],
uso: ["https://www.instagram.com/reel/DNnwK8fzrrc/?igsh=MXFpZnh5Nm55ZXg0MQ=="],

run: async () => {
if (!q) return enviar("Envie o link do vídeo do Instagram!");

try {
aumentartotalcmds();
aumentarcmdsgeral();

const response = await axios.get(
`${urlapi}/api/downloads/instagram?query=${encodeURIComponent(q)}&apikey=${apikey}`,
{
headers: {
Accept: "application/json",
"User-Agent": "Node.js",
},
}
);

const json = response.data;
const videoUrl = json.resultado?.texto[0]?.url_download;

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
