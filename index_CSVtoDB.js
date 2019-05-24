const fs  = require('fs');
const csv = require('csv-parser');
const pgh = require('./db');

const REGION = process.argv[2];

const addrobj = 'ADDROB' + REGION;
const house = 'HOUSE' + REGION;

console.log(addrobj, house);

const ADDROB = new RegExp(addrobj, 'gmi');
const HOUSE = new RegExp(house, "gmi");

console.log(ADDROB, HOUSE);
// debugger;

// Получаем массив файлов по объектам адресов
const filenameArrAddrObj = fs.readdirSync('./files/csv/addrobj', () => {
  console.log('read addrobj finished');
});

// Получаем массив файлов по домам
const filenameArrHouse = fs.readdirSync('./files/csv/house', () => {
  console.log('read addrobj finished');
});

// Читаем и записываем информацию по объектам адресов. Функция для разбора 1 файла
const readCSVAddrObj = (filename) => new Promise(async (resolve, reject) => {
  try {
    let result = [];
    console.log(filename);
    fs.createReadStream(`./files/csv/addrobj/${filename}`)
    .pipe(csv())
    .on("data", (data) => {
    result.push(data);
    })
    .on('error', reject)
    .on("end", async () => {
      console.log(`Read ${filename} finished. Rows:`, result.length);
      console.log();

      let pginstance;
      let index = 1;
      const limit = 5000;
      const scope = result.length;

      try {
        pginstance = await pgh.instance();
        await pginstance.begin();

        let values = '';
        let recordPart = []

        for (let record of result) {

          recordPart.push(record);

          if (index%limit == 0 || index >= scope) {
            console.log("Длина части", recordPart.length);
            console.time("write part")
            values = recordPart.map(
              item => (
                `(${sortField(item, index)})`
              )).join(',');

            recordPart = [];

            console.log("index: ", index)
            console.log()
      
            await pginstance.query(`
       insert into fias_addr_obj (actstatus, aoguid, aoid, aolevel, areacode, autocode, cadnum, centstatus, citycode, code, ctarcode, currstatus, divtype, enddate, extrcode, formalname, ifnsfl, ifnsul, livestatus, nextid, normdoc, offname, okato, oktmo, operstatus, parentguid, placecode, plaincode, plancode, postalcode, previd, regioncode, sextcode, shortname, startdate, streetcode, terrifnsfl, terrifnsul, updatedate) values ${values}`);

            console.timeEnd("write part")
          }

          index++;            
        }

      } catch (error) {
        pginstance && await pginstance.rollback();
        return reject(error);
      } finally {
        pginstance && await pginstance.close(true);
      }
      

      return resolve()
    });
  } catch (error) {
    console.log(error);
    reject(error);
  }
});

// Читаем и записываем информацию по домам. Функция для разбора 1 файла
const readCSVHouse = (filename) => new Promise(async (resolve, reject) => {
  try {
    let result = [];
    console.log(filename);
    fs.createReadStream(`./files/csv/house/${filename}`)
    .pipe(csv())
    .on("data", (data) => {
    result.push(data);
    })
    .on('error', reject)
    .on("end", async () => {
      console.log(`Read ${filename} finished. Rows:`, result.length);
      console.log();

      let pginstance;
      let index = 1;
      const limit = 5000;
      const scope = result.length;

      try {
        pginstance = await pgh.instance();
        await pginstance.begin();

        let values = '';
        let recordPart = []

        for (let record of result) {

          // console.log((Object.keys(record)).sort());

          recordPart.push(record);

          if (index%limit == 0 || index >= scope) {
            console.log("Длина части", recordPart.length);
            console.time("write part")
            values = recordPart.map(
              item => (
                `(${sortField(item, index)})`
              )).join(',');

            recordPart = [];

            console.log("index: ", index)
            console.log()
      
            await pginstance.query(`
       insert into fias_house (aoguid, buildnum, cadnum, counter, divtype, enddate, eststatus, houseguid, houseid, housenum,
         ifnsfl, ifnsul, normdoc, okato, oktmo, postalcode, startdate, statstatus, strstatus, strucnum, terrifnsfl, terrifnsul,
        updatedate) values ${values}`);

            console.timeEnd("write part")
          }

          index++;            
        }

      } catch (error) {
        pginstance && await pginstance.rollback();
        return reject(error);
      } finally {
        pginstance && await pginstance.close(true);
      }
      

      return resolve()
    });
  } catch (error) {
    console.log(error);
    reject(error);
  }
});

const readAllCSV = async () => {
  console.log("===== Start read =====");
  console.time("Common timer");

  for (const filename of filenameArrAddrObj) {
    // if ((ADDROB).test(filename)) { // загрузка конкретного региона (файл может состоять из нескольких частей)
    if (filename.indexOf(addrobj) !== -1) {
      console.time(`${filename}`);
        await readCSVAddrObj(filename);
      console.timeEnd(`${filename}`);
      console.log(filename, "writed");
    }
  }

  for (const filename of filenameArrHouse) {
    if (filename.indexOf(house) !== -1) { // загрузка конкретного региона (файл может состоять из нескольких частей)
      console.log(filename)
      console.time(`${filename}`);
        await readCSVHouse(filename);
      console.timeEnd(`${filename}`);
      console.log(filename, "writed");
    }
  }

  console.timeEnd("Common timer");
  console.log("===== Finish read =====");
};

readAllCSV();

function sortField(array, i) {
  let str = '';
  const keys = (Object.keys(array)).sort();
  let couter_key = 0

  for (let key of keys) {
    str += (couter_key == 0) ? `'${array[key]}'` : `, '${array[key]}'`
    couter_key++;
  }
  return str
}






























      //     await pginstance.query(`
      // insert into fias_addr_obj (actstatus, aoguid, aoid, aolevel, areacode, autocode, cadnum, centstatus, citycode, code, ctarcode, currstatus, divtype, enddate, extrcode, formalname, ifnsfl, ifnsul, livestatus, nextid, normdoc, offname, okato, oktmo, operstatus, parentguid, placecode, plaincode, plancode, postalcode, previd, regioncode, sextcode, shortname, startdate, streetcode, terrifnsfl, terrifnsul, updatedate)
      // values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39)  
      //   `, [
      //     record.ACTSTATUS ,
      //     record.AOGUID    ,
      //     record.AOID      ,
      //     record.AOLEVEL   ,
      //     record.AREACODE  ,
      //     record.AUTOCODE  ,
      //     record.CADNUM    ,
      //     record.CENTSTATUS,
      //     record.CITYCODE  ,
      //     record.CODE      ,
      //     record.CTARCODE  ,
      //     record.CURRSTATUS,
      //     record.DIVTYPE   ,
      //     record.ENDDATE   ,
      //     record.EXTRCODE  ,
      //     record.FORMALNAME,
      //     record.IFNSFL    ,
      //     record.IFNSUL    ,
      //     record.LIVESTATUS,
      //     record.NEXTID    ,
      //     record.NORMDOC   ,
      //     record.OFFNAME   ,
      //     record.OKATO     ,
      //     record.OKTMO     ,
      //     record.OPERSTATUS,
      //     record.PARENTGUID,
      //     record.PLACECODE ,
      //     record.PLAINCODE ,
      //     record.PLANCODE  ,
      //     record.POSTALCODE,
      //     record.PREVID    ,
      //     record.REGIONCODE,
      //     record.SEXTCODE  ,
      //     record.SHORTNAME ,
      //     record.STARTDATE ,
      //     record.STREETCODE,
      //     record.TERRIFNSFL,
      //     record.TERRIFNSUL,
      //     record.UPDATEDATE,
      //   ]);