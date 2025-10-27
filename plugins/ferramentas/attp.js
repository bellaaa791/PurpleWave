const axios = require("axios");
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
module.exports = {
nomes: ["attp"],
desc: ["Transforma um texto normal em figurinha colorida!"],
uso: ["tokyo"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!q) return enviar(resposta.textoparametro);
try {
const url = `${urlapi}/api/canvas/attp?apikey=${apikey}&query=${encodeURIComponent(q)}`;
const response = await axios.get(url, { responseType: "arraybuffer" });
if (!response.data || response.data.length < 100) {
return enviar("*⚠ Nenhum resultado encontrado!*");
}
const tempDir = path.join(__dirname, "../temp");
if (!fs.existsSync(tempDir)) {
fs.mkdirSync(tempDir, { recursive: true });
}
const tmpGif = path.join(tempDir, `attp_${Date.now()}.gif`);
const tmpWebp = path.join(tempDir, `attp_${Date.now()}.webp`);
fs.writeFileSync(tmpGif, response.data);
await new Promise((resolve, reject) => {
exec(
`ffmpeg -i "${tmpGif}" -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -qscale 50 -preset default -loop 0 -an -vsync 0 -s 512:512 "${tmpWebp}"`,
(err) => {
if (err) reject(err);
else resolve();
}
);
});
const webpBuffer = fs.readFileSync(tmpWebp);
await bot.sendMessage(from, { sticker: webpBuffer }, { quoted: info });
fs.unlinkSync(tmpGif);
fs.unlinkSync(tmpWebp);
} catch (e) {
enviar(resposta.erro);
}
},
};