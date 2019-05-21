const fs           = require('fs');
const parseAddrObj = require('./index_csv_addr_obj');
const parseHouse   = require('./index_csv_house');

const filenameArr = fs.readdirSync("./files/fias_dbf", () => {
  console.log("finished")
})

let index          = 1;
let counterAddrObj = 0;
let counterHouse   = 0;

console.log();
console.log(`========== Запуск парсера ==========`);
console.log();

const parseFileName = (filename) => new Promise(async (resolve, reject) => {
  try {
    // отбрасываем ненужные файлы
    if (!(/^ADDROB/gi).test(filename) && !(/^HOUSE/gi).test(filename)) {
      // console.log(`${index}, ${filename} - файл не нужно обрабатывать`)
      return resolve();
    }
  
    if ((/^ADDROB/gi).test(filename)) {
      console.log(`${index}. ${filename} - Заходим в парсер объектов адресов`);
      counterAddrObj += await parseAddrObj(filename);
      console.log("counterAddrObj", counterAddrObj);
      index++;
      return resolve();
    } 
    
    if ((/^HOUSE/gi).test(filename)) {
      console.log(`${index}. ${filename} - Заходим в парсер домов`);
      counterHouse += await parseHouse(filename);
      console.log("counterHouse", counterHouse);
      index++;
      return resolve();
    } 

    return resolve();
  } catch (error) {
    console.log(error);
    reject(error);
  }
});

const parse = async () => {
  console.time("Parser")
  for (const filename of filenameArr) {
    await parseFileName(filename);
  };
  console.timeEnd("Parser")
  console.log(`========== Парсер закончил свою работу ==========`);  
  console.log();
  console.log(`Парсер собрал с ФИАС:`)
  console.log(` - объектов адресов: ${counterAddrObj}`);
  console.log(` - объектов домов:   ${counterHouse}`);
}

parse();