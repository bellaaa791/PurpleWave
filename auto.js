const conectarBot = require("./connect");
(async () => {
try {
await conectarBot();
console.log("Bot iniciado automaticamente!");
} catch (err) {
console.error("Erro ao iniciar o bot:", err);
process.exit(1);
}
})();