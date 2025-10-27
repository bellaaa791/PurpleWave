const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch"); 

module.exports = {
nomes: ["rg_mensagem"],
uso: ["<mensagem ou mídia>/<intervalo> (ex: 30s, 5m, 1h)"],
run: async () => {
if (!isGroup) return enviar("⚠ Este comando só pode ser usado em grupos");
if (!isGroupAdmins) return enviar("⚠ Apenas administradores podem usar este comando");

aumentartotalcmds();
aumentarcmdsgeral();

let tipo, conteudo, intervaloMs;
const isImagem =
info.message?.imageMessage ||
info.message?.message?.imageMessage ||
info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage;

if (isImagem) {
const imagemMsg =
info.message.imageMessage ||
info.message.message?.imageMessage ||
info.message.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage;

if (!imagemMsg) {
return enviar("⚠ Não foi possível obter a imagem");
}

let bufferImagem;
try {
const stream = await downloadContentFromMessage(imagemMsg, "image");
const chunks = [];
for await (const chunk of stream) chunks.push(chunk);
bufferImagem = Buffer.concat(chunks);
} catch (err) {
console.error("❌ Erro ao baixar a imagem:", err);
return enviar("⚠ Não foi possível processar a imagem");
}

let urlImagem;
try {
urlImagem = await tourl(bufferImagem);
if (!urlImagem) return enviar("❌ Não foi possível gerar a URL da imagem");
} catch (err) {
console.error("❌ Erro ao gerar URL da imagem:", err);
return enviar("❌ Erro ao processar a imagem");
}

const legendaImagem = imagemMsg.caption || "";
conteudo = { url: urlImagem, caption: legendaImagem };
tipo = "imagem";
} else if (args[0]) {
console.log("📌 isTexto: true");
tipo = "texto";
conteudo = args.join(" ");
} else if (q) {
console.log("📌 Usando variável q para texto");
tipo = "texto";
conteudo = q;
} else {
console.log("⚠ Nenhuma mensagem ou imagem detectada");
return enviar("⚠ Envie uma mensagem de texto ou marque uma imagem para registrar");
}


console.log("📌 Processando intervalo");

const textoOuArgs = args.length > 0 ? args.join(" ") : q || "";
const ultimaBarra = textoOuArgs.lastIndexOf("/");
if (ultimaBarra === -1) {
return enviar("⚠ Você precisa definir o intervalo! Exemplo: .rg_mensagem Olá/30s ou .rg_mensagem Boa noite/5m");
}

const conteudoMsg = textoOuArgs.slice(0, ultimaBarra).trim();
const intervaloStr = textoOuArgs.slice(ultimaBarra + 1).trim();

if (!intervaloStr) {
return enviar("⚠ Intervalo inválido! Use números seguidos de s/m/h (ex: 30s, 5m, 1h)");
}

const match = intervaloStr.match(/^(\d+)(s|m|h)$/i);
if (!match) {
return enviar("⚠ Intervalo inválido! Use números seguidos de s/m/h (ex: 30s, 5m, 1h)");
}
const valor = parseInt(match[1]);
const unidade = match[2].toLowerCase();

if (unidade === "s") intervaloMs = valor * 1000;
else if (unidade === "m") intervaloMs = valor * 60 * 1000;
else if (unidade === "h") intervaloMs = valor * 60 * 60 * 1000;

try {
const gruposDir = path.join(__dirname, "../../utils/json/grupos");
if (!fs.existsSync(gruposDir)) fs.mkdirSync(gruposDir, { recursive: true });

const filePath = path.join(gruposDir, `${from}.json`);
if (!fs.existsSync(filePath)) await creategrupo(from);

const config = await getGrupoConfig(from);
if (!Array.isArray(config.msgpeogramada)) config.msgpeogramada = [];

const novaMsg = {
id: gerarId(),
tipo,
conteudo: tipo === "texto" ? conteudoMsg : conteudo,
intervalo: intervaloMs,
ultimaExecucao: null,
repeticoes: 0
};

config.msgpeogramada.push(novaMsg);
fs.writeFileSync(filePath, JSON.stringify(config, null, 2));

console.log("✅ Mensagem automática registrada com sucesso");
enviar(`✅ Mensagem automática registrada!\nTipo: ${tipo}\nIntervalo: ${intervaloStr}`);
} catch (err) {
console.error("❌ Erro ao salvar mensagem automática:", err);
enviar("❌ Erro ao registrar mensagem automática");
}
},
};