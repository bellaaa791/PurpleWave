module.exports = {
nomes: ["xvideos"],
desc: ["Busca informações de um usuário no Xvideos."],
uso: ["raissaconte_official"],
run: async () => {
try {
aumentartotalcmds();
aumentarcmdsgeral();
if (!q) return enviar("❌ Você deve informar o nome de usuário. Exemplo: xvideos raissaconte_official");
const url = `${urlapi}/api/stalks/xvideos?query=${q}&apikey=${apikey}`;
const data = await requisicaoComLimite(url);
if (data.limite) {
return enviar(`${resposta.limiteesgoted} ${data.limite} ⏳`);
}
const resultado = data.data?.texto;
if (!resultado) {
return enviar("❌ Nenhum resultado encontrado para este usuário no Xvideos.");
}
const {
Foto_perfil,
Usuário,
Visualizações_de_vídeo,
Inscritos,
Descrição,
Quantidade_de_vídeos,
Quantidade_de_vídeos_no_RED,
Visualizações_do_perfil,
Idiomas,
Data_de_registro,
Última_atividade,
} = resultado;
const caption = `
🔞 *Perfil XVIDEOS*
━━━━━━━━━━━━━━━
👤 *Usuário:* ${Usuário}
📅 *Registrado em:* ${Data_de_registro}
🕓 *Última atividade:* ${Última_atividade}

📈 *Inscritos:* ${Inscritos}
🎬 *Vídeos:* ${Quantidade_de_vídeos}
❤️ *Vídeos no RED:* ${Quantidade_de_vídeos_no_RED}
👁️ *Visualizações de vídeo:* ${Visualizações_de_vídeo}
📊 *Visualizações do perfil:* ${Visualizações_do_perfil}

🌐 *Idiomas:* ${Idiomas}
📝 *Descrição:* ${Descrição || "Nenhuma descrição disponível."}
━━━━━━━━━━━━━━━
🔗 *Perfil:* https://www.xvideos.com/profiles/${q}
`.trim();
bot.sendMessage(
from,
{
image: { url: Foto_perfil || fotomenu },
caption: caption,
},
{ quoted: info }
);

} catch (e) {
bot.sendMessage(
from,
{ text: "❌ Erro ao buscar informações do Xvideos." },
{ quoted: info }
);
}
},
};