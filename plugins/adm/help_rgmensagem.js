module.exports = {
nomes: ["help_rgmensagem"],
uso: [""],
desc: ["Entenda como funciona o comando rg_mensagem!"],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);
enviar(`📖 Comando: ${prefix}rg_mensagem

Esse comando serve para registrar mensagens programadas que serão enviadas automaticamente no grupo, em um intervalo de tempo definido.

Você pode programar textos ou imagens (com ou sem legenda).

────────────────────────────
📌 Como usar

1. Mensagem de texto  
${prefix}rg_mensagem Bom dia grupo!/30s  
✅ Vai enviar “Bom dia grupo!” a cada 30 segundos  

2. Imagem com legenda original  
Responda ou marque a imagem e digite:  
${prefix}rg_mensagem /5m  
✅ Vai reenviar a imagem marcada a cada 5 minutos, com a legenda original  

3. Imagem com nova legenda  
Responda ou marque a imagem e digite:  
${prefix}rg_mensagem /1h Lembre-se de beber água! 💧  
✅ Vai reenviar a imagem marcada a cada 1 hora, mas com a legenda “Lembre-se de beber água! 💧”  

────────────────────────────
⏱️ Intervalos aceitos
- s = segundos → 30s = 30 segundos  
- m = minutos → 10m = 10 minutos  
- h = horas → 2h = 2 horas  

────────────────────────────
🚫 Observações
- Só funciona se o bot estiver ativo no grupo  
- Não use intervalos muito curtos (ex: 1s) para evitar flood  
- Para remover uma mensagem programada, use o comando: .del_mensagem
`);
},
};
