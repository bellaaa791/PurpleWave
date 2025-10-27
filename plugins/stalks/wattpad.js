const axios = require("axios");
module.exports = {
nomes: ["wattpad"],
desc: ["Obtenha informações detalhadas de um perfil do Wattpad."],
uso: ["KRafyra"],
run: async () => {
try {
aumentartotalcmds();
aumentarcmdsgeral();
if (!q)
return enviar(
"❌ Você deve informar o nome de usuário. Exemplo: wattpad KRafyra"
);
const url = `${urlapi}/api/stalks/wattpad?query=${q}&apikey=${apikey}`;
const data = await requisicaoComLimite(url);

if (data.limite) {
return enviar(`${resposta.limiteesgoted} ${data.limite} ⏳`);
}
const resultado = data?.data?.texto;
if (!resultado)
return enviar("❌ Nenhum resultado encontrado para este usuário no Wattpad.");
const { usuario, estatisticas, historias } = resultado;
const {
nome,
avatar,
descricao,
localizacao,
dataCriacaoConta
} = usuario;

const {
numeroObras,
numeroListasLeitura,
numeroSeguidores,
numeroSeguindo
} = estatisticas;

let caption = `
📚 *Perfil Wattpad*
━━━━━━━━━━━━━━━
👤 *Usuário:* ${nome}
📅 *Conta criada:* ${dataCriacaoConta}
📍 *Localização:* ${localizacao || "Não informada"}

📊 *Estatísticas:*
📖 Obras: ${numeroObras}
📚 Listas: ${numeroListasLeitura}
👥 Seguidores: ${numeroSeguidores}
➡️ Seguindo: ${numeroSeguindo}

📝 *Descrição:* ${descricao || "Nenhuma descrição disponível."}
━━━━━━━━━━━━━━━
`.trim();

if (historias && historias.length > 0) {
caption += `\n📘 *Histórias populares:*\n`;
for (const h of historias.slice(0, 3)) {
caption += `\n• *${h.titulo}*\n📖 Leituras: ${h.leituras}\n❤️ Votos: ${h.votos}\n🧩 Partes: ${h.partes}\n🔗 https://www.wattpad.com${h.url}\n`;
}
}

bot.sendMessage(
from,
{
image: { url: avatar || fotomenu },
caption: caption,
},
{ quoted: info }
);
} catch (e) {
console.error("❌ Erro ao buscar informações do Wattpad:", e);
bot.sendMessage(
from,
{ text: "❌ Erro ao buscar informações do Wattpad." },
{ quoted: info }
);
}
},
};