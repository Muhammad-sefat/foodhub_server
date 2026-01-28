import app from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./lib/prisma.js";

async function main() {
  try {
    await prisma.$connect();
    console.log("Connent to the database successfully");
    app.listen(env.PORT, () => {
      console.log(`Server is running on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.log("An error occurd", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
