"use strict";
const fs = require("fs");
const path = require("path");

module.exports = {
    nomes: ["legendasaiu"],
    desc: "Definir a legenda de saída.",
    tags: ["grupo", "config"],
    run: async () => {
        if (!isGroup) return enviar(resposta.so_grupo);
        if (!isGroupAdmins) return enviar(resposta.so_adm);
        const grupoPath = path.join(__dirname, "../../../utils/json/grupos", `${from}.json`);
        let configAtual = {};
        try {
            configAtual = JSON.parse(fs.readFileSync(grupoPath, "utf-8"));
        } catch (error) {
            console.log("⚠ Erro ao ler config do grupo: " + from, error);
        }
        if (!q) {
            return enviar(`📝 Para configurar a mensagem de saída, use:\n${prefix}legendasaiu <mensagem>\n—\nVocê pode usar:\n- *#numerodele#* → Menciona quem saiu\n- *#nomedogp#* → Nome do grupo\n- *#membros#* → Total de membros\n- *#desc#* → Descrição do grupo`);
        }
        try {
            configAtual.textexit = q;
            await enviar("✅ Legenda de saída definida com sucesso!");
            await fs.writeFileSync(grupoPath, JSON.stringify(configAtual, null, 2), "utf-8");
        } catch (e) {
            return enviar("❌ Erro ao salvar configuração do grupo: Legenda não definida.");
        }
    },
};