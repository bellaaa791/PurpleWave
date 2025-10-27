"use strict";
module.exports = {
nomes: ["statusgp", "configuracoes"],
desc: "Mostra todas as configurações do grupo (ativadas/desativadas)",
run: async () => {
if (!isGroup) return enviar(resposta.so_grupo);
if (!isGroupAdmins) return enviar(resposta.so_adm);

const configAtual = lergrupo(from);

let texto = "⚙️ *Configurações do Grupo*\n\n";
for (const [chave, valor] of Object.entries(configAtual)) {
if (typeof valor === "boolean") {
texto += `🔹 ${chave}: ${valor ? "✅ Ativado" : "❌ Desativado"}\n`;
} else {
texto += `🔹 ${chave}: ${valor}\n`;
}
}

return enviar(texto);
},
};