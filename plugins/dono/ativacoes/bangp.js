module.exports = {
nomes: ["bangp"],
desc: ["Ativa ou desativa o sistema de botoff no grupo!"],
uso: [""],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!isGroup) return enviar(resposta.so_grupo);
if (!dono) return enviar(resposta.so_dono);
try {
const novaConfig = await togglegrupoconfig(from, "bangp");
if (novaConfig.bangp) {
enviar("✅ O *ban-gp* foi *ativado* com sucesso!");
} else {
enviar("❌ O *ban-gp* foi *desativado* com sucesso!");
}
} catch (e) {
console.error(e);
enviar("⚠️ Ocorreu um erro ao tentar alterar a configuração do grupo.");
}
},
};
