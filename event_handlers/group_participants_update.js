"use strict";
const path = require("path");
Object.defineProperty(module.exports, "__esModule", { value: true });
const fs = require("fs");
module.exports = {
file: 'group_participants_update.js',
eventNames: ['group-participants.update'],
desc: 'Sistema para mandar bem vindo',
tags: ['bem', 'vindo', 'bem-vindo', 'group', 'participants'],
async start(bot, update, ctx) {
try {
const groupId = update.id;
const participantes = update.participants;
const action = update.action;
const grupoPath = path.join(
"..",
"utils",
"json",
"grupos",
`${groupId}.json`
);
if (!fs.existsSync(grupoPath)) return;
const jsonGp = JSON.parse(fs.readFileSync(grupoPath, "utf-8"));
if (action !== "add" || !jsonGp.bemvindo) return;
const metadata = await bot.groupMetadata(groupId);
const nomeGrupo = metadata.subject || "Daki Infos";
const recentlyAdded = readTempJson();
for (const participante of participantes) {
if (recentlyAdded.includes(participante)) continue;
recentlyAdded.push(participante);
writeTempJson(recentlyAdded);
const entryTime = new Date();
console.log(
`Usuário ${participante} adicionado em: ${entryTime.toLocaleString()}`
);
try {
let imgPerfil = "https://files.catbox.moe/u4wb4y.jpg";
try {
imgPerfil = await bot.profilePictureUrl(participante, "image");
} catch {}
const safePushname = encodeURIComponent(
participante.replace(/@s\.whatsapp\.net$/, "")
);
const apiUrl = `${ctx.urlapi}/api/canvas/bemvindoV2?query=Bem%20vindo%20(a)&nomegrupo=${encodeURIComponent(
nomeGrupo
)}&numerouser=${safePushname}&imgperfil=${encodeURIComponent(
imgPerfil
)}&imgbanner=&apikey=${ctx.apikey}`;
const response = await ctx.axios.get(apiUrl, {
responseType: "arraybuffer",
});
const buffer = Buffer.from(response.data, "binary");
await bot.sendMessage(groupId, {
image: buffer,
caption: `Olá @${participante.replace(
/@s\.whatsapp\.net$/,
""
)}, seja bem-vindo(a)!`,
mentions: [participante],
});
const sentTime = new Date();
console.log(
`Mensagem de boas-vindas enviada para ${participante} em: ${sentTime.toLocaleString()}`
);
} catch (err) {
console.error(
`Erro ao enviar boas-vindas para ${participante}:`,
err.message
);
}
setTimeout(() => {
const temp = readTempJson().filter((p) => p !== participante);
writeTempJson(temp);
}, 60 * 1000);
}
} catch (err) {
console.error(
"Erro no evento group-participants.update:",
err.message
);
}

const tempJsonPath = path.join("..", "json", "recentlyAdded.json");
if (!fs.existsSync(tempJsonPath)) {
fs.mkdirSync(path.dirname(tempJsonPath), { recursive: true });
fs.writeFileSync(tempJsonPath, JSON.stringify([]));
}

function readTempJson() {
return JSON.parse(fs.readFileSync(tempJsonPath, "utf-8"));
}

function writeTempJson(data) {
fs.writeFileSync(tempJsonPath, JSON.stringify(data, null, 2));
}
}
};






