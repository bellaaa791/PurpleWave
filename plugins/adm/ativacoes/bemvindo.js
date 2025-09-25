module.exports = {
nomes: ["bemvindo"],
desc: ["Ativa ou desativa o sistema de bem-vindo no grupo!"],
uso: [""],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);
try {
const novaConfig = await togglegrupoconfig(from, "bemvindo");
if (novaConfig.bemvindo) {
enviar("✅ O *bem-vindo* foi *ativado* com sucesso!");
} else {
enviar("❌ O *bem-vindo* foi *desativado* com sucesso!");
}
} catch (e) {
console.error(e);
enviar("⚠️ Ocorreu um erro ao tentar alterar a configuração do grupo.");
}
},
};
