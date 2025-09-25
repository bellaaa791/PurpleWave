module.exports = {
nomes: ["todesenho", "desenhar"],
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

urlkk = `${urlapi}/api/ias/todesenho?query=${url}&apikey=${apikey}`
const data = await requisicaoComLimite(urlkk);
if (data.limite) {
return enviar(`${resposta.limiteesgoted} ${data.limite} ⏳`);
}



if (data?.data?.texto) {
  return enviarimg(data.data.texto, "*Pronto*");
}


} catch (err) {
console.error("Erro:", err.message);
enviar("❌ Erro ao processar a imagem");
}
},
};
