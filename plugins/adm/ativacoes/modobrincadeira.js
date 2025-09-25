module.exports = {
nomes: ["modobrincadeira", "brincadeiras"],
desc: ["Ativa ou desativa o sistema de brincadeiras no grupo!"],
uso: [""],
run: async () => {
aumentartotalcmds();
aumentarcmdsgeral();
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);
try {
const novaConfig = await togglegrupoconfig(from, "modobrincadeira");
if (novaConfig.modobrincadeira) {
enviar("✅ O *modo-bdincadeira* foi *ativado* com sucesso!");
} else {
enviar("❌ O *modo-brincadeira* foi *desativado* com sucesso!");
}
} catch (e) {
console.error(e);
enviar("⚠️ Ocorreu um erro ao tentar alterar a configuração do grupo.");
}
},
};
