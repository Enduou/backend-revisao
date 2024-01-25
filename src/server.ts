import { app } from "./app";

app.listen({ port: 3001 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`
  🧢 Server ready at: ${address}`);
});