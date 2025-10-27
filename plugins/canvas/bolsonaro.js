module.exports = {
nomes: ["bolsonaro"],
uso: ["@imagem"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!isImagem) {
console.log("⚠ Nenhuma imagem marcada ou respondida");
return enviar("⚠ Marque ou responda uma imagem");
}
try {
console.log("⬇ Baixando conteúdo da imagem...");
const stream = await downloadContentFromMessage(isImagem, "image");
const chunks = [];
for await (const chunk of stream) chunks.push(chunk);
const buffer = Buffer.concat(chunks);
const url = await tourl(buffer);
if (!url) {
console.log("❌ Falha ao gerar URL");
return enviar("❌ Não foi possível gerar a URL");
}
const urlkk = `${urlapi}/api/canvas/bolsonaro?query=${encodeURIComponent(url)}&apikey=${apikey}`;
const response = await axios.get(urlkk, { responseType: "arraybuffer" });
if (response.limite) {
console.log("⏳ Limite da API atingido:", data.limite);
return enviar(`${resposta.limiteesgoted} ${data.limite} ⏳`);
}
const fotobuffer = Buffer.from(response.data);
await bot.sendMessage(from, { image: fotobuffer, caption: '*prontinho*'}, { quoted: info });
} catch (err) {
console.error("❌ Erro ao processar a imagem:", err);
enviar("❌ Erro ao processar a imagem");
}
},
};