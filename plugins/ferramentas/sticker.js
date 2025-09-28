const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
module.exports = {
nomes: ["sticker", "s"],
uso: ["@imagem/video"],
desc: ["Faça stickers de whatsapp de uma foto ou um vídeo de até 9 segundos!"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();

if (!isImagem && !isVideo)
return enviar("⚠ Marque ou responda uma imagem ou um vídeo de até 9 segundos");

try {
const tipo = isImagem ? "image" : "video";
const stream = await downloadContentFromMessage(isImagem || isVideo, tipo);
const chunks = [];
for await (const chunk of stream) chunks.push(chunk);
const buffer = Buffer.concat(chunks);
const ext = isImagem ? "jpg" : "mp4";
const inputPath = path.join(__dirname, `temp_${Date.now()}.${ext}`);
const outputPath = path.join(__dirname, `temp_${Date.now()}.webp`);
fs.writeFileSync(inputPath, buffer);
const ffmpegCmd = isImagem
? `ffmpeg -y -i "${inputPath}" -vf "scale=512:512:force_original_aspect_ratio=increase,crop=512:512,setsar=1" -c:v libwebp -lossless 1 -qscale 75 -preset default -loop 0 -an -vsync 0 "${outputPath}"`
: `ffmpeg -y -i "${inputPath}" -t 9 -vf "scale=512:512:force_original_aspect_ratio=increase,crop=512:512,fps=15,setsar=1" -c:v libwebp -lossless 1 -qscale 75 -preset default -loop 0 -an -vsync 0 "${outputPath}"`;
await new Promise((resolve, reject) => {
exec(ffmpegCmd, (err, _, stderr) => {
if (err) {
console.error("FFmpeg error:", stderr);
reject(err);
} else resolve();
});
});
if (!fs.existsSync(outputPath))
throw new Error("❌ FFmpeg não gerou o arquivo WebP");
const stickerBuffer = fs.readFileSync(outputPath);
await bot.sendMessage(info.key.remoteJid, {
sticker: stickerBuffer
}, { quoted: info });
[inputPath, outputPath].forEach(f => fs.existsSync(f) && fs.unlinkSync(f));
} catch (err) {
console.error("Erro:", err);
enviar("❌ Erro ao transformar mídia em figurinha");
}
},
};