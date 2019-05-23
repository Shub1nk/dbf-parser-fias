const DBF = require('stream-dbf');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;  

const HEADER = [
  { id: 'POSTALCODE', title: 'POSTALCODE'},
  { id: 'IFNSFL', title: 'IFNSFL'},
  { id: 'TERRIFNSFL', title: 'TERRIFNSFL'},
  { id: 'IFNSUL', title: 'IFNSUL'},
  { id: 'TERRIFNSUL', title: 'TERRIFNSUL'},
  { id: 'OKATO', title: 'OKATO'},
  { id: 'OKTMO', title: 'OKTMO'},
  { id: 'UPDATEDATE', title: 'UPDATEDATE'},
  { id: 'HOUSENUM', title: 'HOUSENUM'},
  { id: 'ESTSTATUS ', title: 'ESTSTATUS'},
  { id: 'BUILDNUM', title: 'BUILDNUM'},
  { id: 'STRUCNUM', title: 'STRUCNUM'},
  { id: 'STRSTATUS', title: 'STRSTATUS'},
  { id: 'HOUSEID', title: 'HOUSEID'},
  { id: 'HOUSEGUID', title: 'HOUSEGUID'},
  { id: 'AOGUID', title: 'AOGUID'},
  { id: 'STARTDATE', title: 'STARTDATE'},
  { id: 'ENDDATE', title: 'ENDDATE'},
  { id: 'STATSTATUS', title: 'STATSTATUS'},
  { id: 'NORMDOC', title: 'NORMDOC'},
  { id: 'COUNTER', title: 'COUNTER'},
  { id: 'CADNUM', title: 'CADNUM'},
  { id: 'DIVTYPE', title: 'DIVTYPE'}
]

const parseHouse = (filename) => new Promise((resolve, reject) => {
  const FILE_NAME = filename;  
  // let data = [];
  let data = {};
  let index = 0;
  const limit = 100000;
  let part = 1;

  const parser = new DBF(`./files/fias_dbf/${FILE_NAME}`, {encoding: 'cp866', /*withMeta: false, lowercase: true ,  */});

  const stream = parser.stream;

  stream.on('data', async function(record) { 

    // Создание поля в объекте
    if (!data.hasOwnProperty(`part_${part}`)) {
      data[`part_${part}`] = [];
    }

    data[`part_${part}`].push(record);

    index = record["@sequenceNumber"];
    // (record["@sequenceNumber"] < limit * part) ? part : part++;
    
    // console.log(`============= Читаем запись ${record["@sequenceNumber"]} из файла ${FILE_NAME} =============`);      
    
    if (record["@sequenceNumber"] == limit * part) {

      // console.log(`${filename}, part ${part}`)

      const writeCSV = () => new Promise ((resolve, reject) => {
        const csvWriter = createCsvWriter({  
          path: `./files/csv/house/${FILE_NAME}_part_${part}.csv`,
          header: [...HEADER]
        });
  
        csvWriter
          .writeRecords(data[`part_${part}`])
          .then(() =>  {
            console.log(`======== ${FILE_NAME}_part_${part}.csv created ========`);
            resolve();
          });
      })
      
      stream.pause()

      await writeCSV();
      delete data[`part_${part}`]
      part++;

      stream.resume();
    }
    
  });
  
  stream.on('error', reject);
  
  stream.on('end', () => {
    console.log('finished');

    const test = Object.keys(data);

    console.log(test)

    // for (let item of test) {
      // console.log(data[item].length);
      // console.log(item);
      const csvWriter = createCsvWriter({  
        // path: `./files/csv/house/${FILE_NAME}_${item}.csv`,
        path: `./files/csv/house/${FILE_NAME}_part_${part}.csv`,
        
        header: [
          { id: 'POSTALCODE', title: 'POSTALCODE'},
          { id: 'IFNSFL', title: 'IFNSFL'},
          { id: 'TERRIFNSFL', title: 'TERRIFNSFL'},
          { id: 'IFNSUL', title: 'IFNSUL'},
          { id: 'TERRIFNSUL', title: 'TERRIFNSUL'},
          { id: 'OKATO', title: 'OKATO'},
          { id: 'OKTMO', title: 'OKTMO'},
          { id: 'UPDATEDATE', title: 'UPDATEDATE'},
          { id: 'HOUSENUM', title: 'HOUSENUM'},
          { id: 'ESTSTATUS ', title: 'ESTSTATUS'},
          { id: 'BUILDNUM', title: 'BUILDNUM'},
          { id: 'STRUCNUM', title: 'STRUCNUM'},
          { id: 'STRSTATUS', title: 'STRSTATUS'},
          { id: 'HOUSEID', title: 'HOUSEID'},
          { id: 'HOUSEGUID', title: 'HOUSEGUID'},
          { id: 'AOGUID', title: 'AOGUID'},
          { id: 'STARTDATE', title: 'STARTDATE'},
          { id: 'ENDDATE', title: 'ENDDATE'},
          { id: 'STATSTATUS', title: 'STATSTATUS'},
          { id: 'NORMDOC', title: 'NORMDOC'},
          { id: 'COUNTER', title: 'COUNTER'},
          { id: 'CADNUM', title: 'CADNUM'},
          { id: 'DIVTYPE', title: 'DIVTYPE'}
        ]
      });

      csvWriter
        // .writeRecords(data[item])
        .writeRecords(data[`part_${part}`])
        .then(() => console.log(`${FILE_NAME}_part_${part}.csv created`))
    // }

    // console.log("Закончили разбор файла");
    resolve(index);
  });
});

module.exports = parseHouse;