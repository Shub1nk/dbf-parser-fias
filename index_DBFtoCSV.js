const fs           = require('fs');
const parseAddrObj = require('./addr_obj');
const parseHouse   = require('./house');



const parseFileName = (filename, index, counterAddrObj, counterHouse) => new Promise(async (resolve, reject) => {
  try {

    const counter = { addrObj: counterAddrObj, house: counterHouse};
    // отбрасываем ненужные файлы
    if (!(/^ADDROB/gi).test(filename) && !(/^HOUSE/gi).test(filename)) {
      // console.log(`${index}, ${filename} - файл не нужно обрабатывать`)
      return resolve();
    }
  
    if ((/^ADDROB72/gi).test(filename)) {
      console.log(`${index}. ${filename} - Заходим в парсер объектов адресов`);
      counterAddrObj += await parseAddrObj(filename);
      counter.addrObj += counterAddrObj;
      // console.log("counterAddrObj", counterAddrObj);
      index++;
      return resolve(counter);
    } 
    
    if ((/^HOUSE72/gi).test(filename)) {
      console.log(`${index}. ${filename} - Заходим в парсер домов`);
      counterHouse += await parseHouse(filename);
      counter.house += counterHouse;
      // console.log("counterHouse", counterHouse);
      index++;
      return resolve(counter);
    } 

    return resolve(counter);
  } catch (error) {
    console.log(error);
    reject(error);
  }
});

const ParserDBFtoCSV = async () => {
  console.time("Parser")

  const filenameArr = fs.readdirSync("./files/fias_dbf", () => {
    console.log("finished")
  })
  
  let index          = 1;
  let counterAddrObj = 0;
  let counterHouse   = 0;
  let commonCounter  = {addrObj: 0, house: 0};
  
  console.log();
  console.log(`========== Запуск парсера ==========`);
  console.log();

  for (const filename of filenameArr) {
    let tempCounter = await parseFileName(filename, index, counterAddrObj, counterHouse);
    commonCounter.addrObj = commonCounter.addrObj + incrementCounter(tempCounter, "addrObj");
    commonCounter.house = commonCounter.house + incrementCounter(tempCounter, "house");
  };
  console.timeEnd("Parser")
  console.log(`========== Парсер закончил свою работу ==========`);  
  console.log();
  console.log(`Парсер собрал с ФИАС:`)
  console.log(` - объектов адресов: ${commonCounter.addrObj}`);
  console.log(` - объектов домов:   ${commonCounter.house}`);
}

function incrementCounter(object, field) {
  if (object && (Object.keys(object)).length) {
    return object[field];
  }
  return 0;
};

module.exports = ParserDBFtoCSV;
