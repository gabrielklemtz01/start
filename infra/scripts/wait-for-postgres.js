const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);
  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(":");
      checkPostgres();
      return;
    }
    console.log("\nPOSTGRES esta ativo e aceitando conexões");
  }
}

console.log("Aguardando conexão com POSTGRES");
checkPostgres();
