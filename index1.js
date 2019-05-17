const fs = require('fs');

const arr = fs.readdirSync("./files/fias_dbf", () => {
  console.log("finished")
})

const addrObj = arr.filter(name => (/^ADDROB/gi).test(name));

console.log(arr);
console.log();
console.log(addrObj, addrObj.length + ' файлов');