const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../json/estatisticas.json");
const axios = require("axios");
const FormData = require("form-data");
// ==============================
// Lê o total de comandos executados hoje
// ==============================
function totalcmds() {
try {
const data = fs.readFileSync(filePath, "utf-8");
const json = JSON.parse(data);
return json.cmdshj || 0;
} catch (err) {
console.error("❌ Erro ao ler estatisticas.json:", err.message);
return 0;
}
}
// ==============================
// Lê o total de comandos executados ao todo
// ==============================
function totalcmdsgeral() {
try {
const data = fs.readFileSync(filePath, "utf-8");
const json = JSON.parse(data);
return json.cmdstotal || 0;
} catch (err) {
console.error("❌ Erro ao ler estatisticas.json:", err.message);
return 0;
}
}
// ==============================
// Incrementa comandos de hoje (+1)
// ==============================
function aumentartotalcmds() {
try {
const data = fs.readFileSync(filePath, "utf-8");
const json = JSON.parse(data);
json.cmdshj = (json.cmdshj || 0) + 1;
fs.writeFileSync(filePath, JSON.stringify(json, null, 2), "utf-8");
return json.cmdshj;
} catch (err) {
console.error("❌ Erro ao atualizar estatisticas.json:", err.message);
return 0;
}
}

// ==============================
// Incrementa comandos totais (+1)
// ==============================
function aumentarcmdsgeral() {
try {
const data = fs.readFileSync(filePath, "utf-8");
const json = JSON.parse(data);
json.cmdstotal = (json.cmdstotal || 0) + 1;
fs.writeFileSync(filePath, JSON.stringify(json, null, 2), "utf-8");
return json.cmdstotal;
} catch (err) {
console.error("❌ Erro ao atualizar estatisticas.json:", err.message);
return 0;
}
}

// ==============================
// Gerar link de imagens e vídeos
// ==============================
async function tourl(buffer, nomeArquivo = "imagem.jpg") {
try {
const form = new FormData();
form.append("imagem", buffer, {
filename: nomeArquivo,
contentType: "image/jpeg",
});
const response = await axios.post(
"https://uploader.hobsidian.shop/upload",
form,
{
headers: form.getHeaders(),
}
);
return response.data.url;
} catch (err) {
console.error("Erro ao enviar imagem:", err.message);
return null;
}
}
// ==============================
// Alterar fotos do bot
// ==============================
function setfoto(campo, link) {
const fotosPath = path.join(__dirname, "../json/fotos.json");
if (!campo || !link) return false;
try {
const fotos = JSON.parse(fs.readFileSync(fotosPath, "utf-8"));
if (!fotos.hasOwnProperty(campo)) {
//console.log(`⚠ Campo "${campo}" não existe em fotos.json`);
return false;
}
fotos[campo] = link;
fs.writeFileSync(fotosPath, JSON.stringify(fotos, null, 2), "utf-8");
//console.log(`✅ Campo "${campo}" atualizado com sucesso!`);
return true;
} catch (err) {
console.error("❌ Erro ao atualizar fotos.json:", err.message);
return false;
}
}
// ==============================
// Alterar as coisas no config.json
// ==============================
function setconfig(campo, link) {
const fotosPath = path.join(__dirname, "../json/config.json");
if (!campo || !link) return false;
try {
const fotos = JSON.parse(fs.readFileSync(fotosPath, "utf-8"));
if (!fotos.hasOwnProperty(campo)) {
//console.log(`⚠ Campo "${campo}" não existe em config.json`);
return false;
}
fotos[campo] = link;
fs.writeFileSync(fotosPath, JSON.stringify(fotos, null, 2), "utf-8");
//console.log(`✅ Campo "${campo}" atualizado com sucesso!`);
return true;
} catch (err) {
console.error("❌ Erro ao atualizar fotos.json:", err.message);
return false;
}
}

module.exports = {
totalcmds,
totalcmdsgeral,
aumentartotalcmds,
aumentarcmdsgeral,
tourl,
setfoto,
setconfig,
};
