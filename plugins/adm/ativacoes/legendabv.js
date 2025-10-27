"use strict";
const fs = require("fs");
const path = require("path");

module.exports = {
    nomes: ["legendabv"],
    desc: "Definir a legenda de boas vindas.",
    tags: ["grupo", "config"],
    run: async () => {
        if (!isGroup) return enviar(resposta.so_grupo);
        if (!isGroupAdmins) return enviar(resposta.so_adm);
        const grupoPath = path.join(__dirname, "../../../utils/json/grupos", `${from}.json`);
        let configAtual = {};
        try {
            configAtual = JSON.parse(fs.readFileSync(grupoPath, "utf-8"));
        } catch (error) {
            console.log("⚠ Erro ao ler config do grupo:", from);
        }
        if (!q) {
            return enviar(`📝 *Configuração da Mensagem de Boas-Vindas*\n—\nPara definir uma mensagem personalizada, digite o comando seguido do texto desejado. Você pode usar as seguintes variáveis:\n—\n- *#numerodele#* → Marca o novo membro.\n- *#nomedogp#* → Nome do grupo.\n- *#desc#* → Descrição do grupo.\n- *#membros#* → Número total de membros no grupo.\n—\n📌 *Exemplo:*\n${prefix}legendabv Bem-vindo(a) #numerodele# ao grupo *#nomedogp#*! Agora somos #membros# membros. Leia a descrição: #desc#`);
        }
        try {
            configAtual.textbv = q;
            await enviar("✅ Legenda de boas vindas definida com sucesso!");
            await fs.writeFileSync(grupoPath, JSON.stringify(configAtual, null, 2), "utf-8");
        } catch (e) {
            return enviar("❌ Erro ao salvar configuração do grupo: Legenda não definida.");
        }
    },
};