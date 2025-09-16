module.exports = {
nomes: ["antilink"],
desc: ["Ativa ou desativa o sistema de antilink no grupo!"],
uso: [""],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);
try {
const novaConfig = await togglegrupoconfig(from, "antilinkgp");
if (novaConfig.antilinkgp) {
enviar("✅ O *antilink de grupo* foi *ativado* com sucesso!");
} else {
enviar("❌ O *antilink de grupo* foi *desativado* com sucesso!");
}
} catch (e) {
console.error(e);
enviar("⚠️ Ocorreu um erro ao tentar alterar a configuração do grupo.");
}
},
};
