const DBF = require('stream-dbf');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;  

const FILE_NAME = 'house77';
let index = 1;
let data = [];

const parser = new DBF('./files/HOUSE77.DBF', {encoding: 'cp866', withMeta: false/*, lowercase: true ,  */});

const stream = parser.stream;
stream.on('data', async function(record) { 
  data.push(record);
  console.log(index);
  console.log(`============= читаем запись ${index} из файла =============`);
  index++;
});

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
  })
  
  csvWriter
    .writeRecords(data)
    .then(() => console.log("csv file created"))

});


