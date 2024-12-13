import { isMainThread, Worker } from "node:worker_threads";

if (isMainThread) {
  const worker = new Worker("./worker.js");
  worker.on("exit", (code) => {
    console.log(`Worker excited with code ${code}`);
  });

  setTimeout(() => {
    worker.postMessage({
      type: "stop",
    });
  }, 5000);
}
