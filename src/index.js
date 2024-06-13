require("dotenv").config();
const { port } = require("./config/");
const server = require("./app");
const db = require("./integrations/mongoose");

async function main() {
  db.connect({ alter: true })
    .then(() => {
      console.log("Succesfully MongoDB connected");
      server.listen(port, () => console.log(`server listening on port ${port}`));
      })
    .catch((error) => console.error(error));
}

main();