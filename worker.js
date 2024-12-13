import { isMainThread, parentPort } from "node:worker_threads";
import { SerialPort, ReadlineParser } from "serialport";

async function main() {
  await new Promise((resolve) => {
    const port = new SerialPort({
      path: "/dev/tty.usbmodem101", // Replace with valid path
      baudRate: 115200,
      parser: new ReadlineParser({
        delimiter: "\r\n",
      }),
    });

    port.on("data", (data) => {
      console.log(data);
    });

    parentPort.on("message", (message) => {
      if (message.type === "stop") {
        resolve();
      }
    });
  });
}

if (!isMainThread) {
  main();
}
