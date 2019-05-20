const DBF = require('stream-dbf');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;  

const parseHouse = (filename) => new Promise((resolve, reject) => {
  const FILE_NAME = filename;  
  let data = [];
  // let data = {
  //   part_1: [],
  //   part_2: []
  // };
  let index = 0;
  const limit = 300000;
  let part = 1;

  const parser = new DBF(`./files/fias_dbf/${FILE_NAME}`, {encoding: 'cp866', /*withMeta: false, lowercase: true ,  */});

  const stream = parser.stream;
  stream.on('data', async function(record) { 
    data.push(record);
    index = record["@sequenceNumber"];
    console.log(`============= Читаем запись ${record["@sequenceNumber"]} из файла ${FILE_NAME} =============`);      
  });
  
  stream.on('error', reject);
  
  stream.on('end', () => {
    console.log('finished');
  
    const csvWriter = createCsvWriter({  
      path: `./files/csv/house/${FILE_NAME}.csv`,
      
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
      .writeRecords(data)
      .then(() => console.log("csv file created"))
    resolve(index);
  });
});

module.exports = parseHouse;