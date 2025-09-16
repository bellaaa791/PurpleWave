module.exports = {
nomes: ["setfotomenu", "fotomenu"],
uso: ["@imagem"],
desc: ["Altera a foto do menu!"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!dono) return enviar(resposta.so_dono);
if (!isImagem) return enviar(resposta.marca_foto);

const stream = await downloadContentFromMessage(isImagem, "image");
const chunks = [];
for await (const chunk of stream) chunks.push(chunk);
const buffer = Buffer.concat(chunks);

const url = await tourl(buffer);
if (!url) return enviar("❌ Não foi possível gerar a URL");

setfoto("fotomenu", url);
enviar(
`✅ fotomenu atualizado com sucesso!.`
);
},
};
