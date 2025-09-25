module.exports = {
nomes: ["tourl"],
uso: ["@imagem"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!isImagem) return enviar("⚠ Marque ou responda uma imagem");
try {
const stream = await downloadContentFromMessage(isImagem, "image");
const chunks = [];
for await (const chunk of stream) chunks.push(chunk);
const buffer = Buffer.concat(chunks);
const url = await tourl(buffer);
if (!url) return enviar("❌ Não foi possível gerar a URL");
enviar(`✅ Imagem enviada com sucesso: ${url}`);
} catch (err) {
console.error("Erro:", err.message);
enviar("❌ Erro ao processar a imagem");
}
},
};
