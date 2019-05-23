const DBF = require('stream-dbf');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;  

const parseAddrObj = (filename) => new Promise((resolve, reject) => {
  const FILE_NAME = filename;
  let data = [];
  let index = 0;

  const parser = new DBF(`./files/fias_dbf/${FILE_NAME}`, {encoding: 'cp866', /*withMeta: false, lowercase: true ,  */});

  const stream = parser.stream;
  stream.on('data', async function(record) { 
    data.push(record);
    index = record["@sequenceNumber"];
    if (index%10000 == 0) {
      console.log(`============= Читаем запись ${record["@sequenceNumber"]} из файла ${FILE_NAME} =============`);
    }
  });

  stream.on('error', reject);

  stream.on('end', () => {
    console.log('finished');

    const csvWriter = createCsvWriter({  
      path: `./files/csv/addrobj/${FILE_NAME}.csv`,
      
      header: [
        { id: 'AOGUID', title: 'AOGUID' },
        { id: 'FORMALNAME', title: 'FORMALNAME'},
        { id: 'REGIONCODE', title: 'REGIONCODE'},
        { id: 'AUTOCODE', title: 'AUTOCODE'},
        { id: 'AREACODE', title: 'AREACODE'},
        { id: 'CITYCODE', title: 'CITYCODE'},
        { id: 'CTARCODE', title: 'CTARCODE'},
        { id: 'PLACECODE', title: 'PLACECODE'},
        { id: 'PLANCODE', title: 'PLANCODE'},
        { id: 'STREETCODE', title: 'STREETCODE'},
        { id: 'EXTRCODE', title: 'EXTRCODE'},
        { id: 'SEXTCODE', title: 'SEXTCODE'},
        { id: 'OFFNAME', title: 'OFFNAME'},
        { id: 'POSTALCODE', title: 'POSTALCODE'},
        { id: 'IFNSFL', title: 'IFNSFL'},
        { id: 'IFNSUL', title: 'IFNSUL'},
        { id: 'TERRIFNSUL', title: 'TERRIFNSUL'},
        { id: 'OKATO', title: 'OKATO'},
        { id: 'OKTMO', title: 'OKTMO'},
        { id: 'UPDATEDATE', title: 'UPDATEDATE'},
        { id: 'SHORTNAME', title: 'SHORTNAME'},
        { id: 'AOLEVEL', title: 'AOLEVEL'},
        { id: 'PARENTGUID', title: 'PARENTGUID'},
        { id: 'AOID', title: 'AOID'},
        { id: 'PREVID', title: 'PREVID'},
        { id: 'NEXTID', title: 'NEXTID'},
        { id: 'CODE', title: 'CODE'},
        { id: 'PLAINCODE', title: 'PLAINCODE'},
        { id: 'ACTSTATUS', title: 'ACTSTATUS'},
        { id: 'LIVESTATUS', title: 'LIVESTATUS'},
        { id: 'CENTSTATUS', title: 'CENTSTATUS'},
        { id: 'OPERSTATUS', title: 'OPERSTATUS'},
        { id: 'CURRSTATUS', title: 'CURRSTATUS'},
        { id: 'STARTDATE', title: 'STARTDATE'},
        { id: 'ENDDATE', title: 'ENDDATE'},
        { id: 'NORMDOC', title: 'NORMDOC'},
        { id: 'CADNUM', title: 'CADNUM'},
        { id: 'DIVTYPE', title: 'DIVTYPE'},
        { id: 'TERRIFNSFL', title: 'TERRIFNSFL'},
      ]
    });
    
    csvWriter
      .writeRecords(data)
      .then(() => console.log("csv file created"))
    resolve(index);
    });
});

module.exports = parseAddrObj;