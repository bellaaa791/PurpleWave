"use strict";

Object.defineProperty(module.exports, "__esModule", { value: true });

module.exports = {
file: 'connection_update.js',
eventNames: ['connection.update'],
desc: 'Handler para atualizações de conexão',
tags: ['connection', 'update', 'reconnect'],
async start(bot, update, ctx) {
const { connection, lastDisconnect } = update;
if (connection === "close") {
const statusCode = lastDisconnect?.error?.output?.statusCode;
const shouldReconnect = statusCode !== ctx.DisconnectReason.loggedOut;
if (shouldReconnect) {
const conectarBot = require("../connect.js");
conectarBot(ctx.numeroFormatado);
} else {
console.log("[FIM] Desconectado permanentemente.");
process.exit(1);
}
} else {
console.log("[CONEXÃO] Status:", connection);
}
}
};