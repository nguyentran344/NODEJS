import os from "node:os";
import htpp from "node:http";
import EventEmitter from "node:events";
import fs from "node:fs";

// Hàm thu thập thông tin hệ thống
function getSystemInfo() {
  const info = {
    Type: os.type(),
    Platform: os.platform(),
    RAM: os.totalmem(),
    USEDRAM: os.freemem(),
    CPU: os.cpus(),
  };
  const PrintInfo = JSON.stringify(info, null, 2);
  return PrintInfo;
}

// In ra thông tin hệ thống trình duyệt.
htpp
  .createServer((request, respone) => {
    respone.write(getSystemInfo());
    respone.end();
  })
  .listen(8080);

// Hàm ghi thông tin file
function writeFile(systemInfo, filePath) {
  fs.writeFile(filePath, systemInfo, (err) => {
    if (err) {
      console.error(err);
    } else {
      emit.emit("fileSaved");
    }
  });
}

// Ghi thông tin đó ra một file và lưu trong D:/Homework
const filePath = "D:/Homework/SystemInfo.txt";
writeFile(getSystemInfo(), filePath);

//Sau khi lưu xong file sẽ emit một sự kiện để console.log(‘Completed task!’)
const emit = new EventEmitter();
emit.on("fileSaved", () => {
  console.log("completed task!");
});
