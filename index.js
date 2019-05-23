const ParserDBFtoCSV = require('./index_DBFtoCSV');
const ParserCSVtoDB  = require('./index_CSVtoDB');

const writeFIAStoDB = async () => {
  try {
    await ParserDBFtoCSV();
    await ParserCSVtoDB();
  } catch (error) {
    console.log("========== writeFIAStoDB ========== ");
    console.log();
    console.log(error);
    console.log();
    console.log("========== writeFIAStoDB ========== ");
  }
}

writeFIAStoDB();


// const DBF = require('stream-dbf');
// const createCsvWriter = require('csv-writer').createObjectCsvWriter;  
// const pgh = require('./db');


// // const TABLE = 'ADDROBJ'
// // const TABLE = 'HOUSE'

// // TODO: механизм для динамической подстановки константы
// const TABLE_NAME = 'fias_addr_obj'
// // const TABLE_NAME = 'fias_house'

// const parser = new DBF('./files/ADDROB50.DBF', {encoding: 'cp866', /*withMeta: false, lowercase: true ,  */});

// // const parser = new DBF('./files/HOUSE77.DBF', {encoding: 'cp866', withMeta: false/*, lowercase: true ,  */});

// // let data  = [];
// // let index = 0;

// const storeData = (pginstance) => new Promise(async(resolve, reject) => {
//   const stream = parser.stream;
//   stream.on('data', async function(record) {  
//   // data.push(record);
//   // console.log(record['@sequenceNumber']);
//   // console.log(data.length + ' запись');
//     console.log(`============= Начинаем передачу записи ${record['@sequenceNumber']} в БД =============`);

//     // const test = await pginstance.query('select * from fias_addr_obj')

//     // console.log();
//     // console.log();
//     // console.log();
//     // console.log("test");
//     // console.log();
//     // console.log(test);
//     // console.log();
//     // console.log();
//     // console.log();
  
//     await pginstance.query(`
//     insert into fias_addr_obj (actstatus, aoguid, aoid, aolevel, areacode, autocode, cadnum, centstatus, citycode, code, ctarcode, currstatus, divtype, enddate, extrcode, formalname, ifnsfl, ifnsul, livestatus, nextid, normdoc, offname, okato, oktmo, operstatus, parentguid, placecode, plaincode, plancode, postalcode, previd, regioncode, sextcode, shortname, startdate, streetcode, terrifnsfl, terrifnsul, updatedate)
//     values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39)  
//       `, [
//         record.actstatus ,
//         record.aoguid    ,
//         record.aoid      ,
//         record.aolevel   ,
//         record.areacode  ,
//         record.autocode  ,
//         record.cadnum    ,
//         record.centstatus,
//         record.citycode  ,
//         record.code      ,
//         record.ctarcode  ,
//         record.currstatus,
//         record.divtype   ,
//         record.enddate   ,
//         record.extrcode  ,
//         record.formalname,
//         record.ifnsfl    ,
//         record.ifnsul    ,
//         record.livestatus,
//         record.nextid    ,
//         record.normdoc   ,
//         record.offname   ,
//         record.okato     ,
//         record.oktmo     ,
//         record.operstatus,
//         record.parentguid,
//         record.placecode ,
//         record.plaincode ,
//         record.plancode  ,
//         record.postalcode,
//         record.previd    ,
//         record.regioncode,
//         record.sextcode  ,
//         record.shortname ,
//         record.startdate ,
//         record.streetcode,
//         record.terrifnsfl,
//         record.terrifnsul,
//         record.updatedate,
//       ]);

//       console.log(`============= Запись ${record['@sequenceNumber']} завершена успешна =============`);
//   });
  
//   stream.on('error', reject);

//   stream.on('end', () => {
//     console.log('finished');
//     resolve();
//   });
// });


// const saveData = async () => {
//   let pginstance;

//   try {
//     pginstance = await pgh.instance();
//     await pginstance.begin();

//     await storeData(pginstance);

//   } catch (error) {
//     pginstance && await pginstance.rollback();
//     console.log(error);
//   } finally {
//     pginstance && await pginstance.close(true);
//   }
// }

// saveData();

//   // const fields = (Object.keys(data[0])).map(item => ({id: item, title: item}))
//   // console.log()
//   // console.log("fields -------------->")
//   // console.log()
//   // console.log(fields)
//   // console.log()

//   // Динамическая переменная для сбора запроса и подстановки данных
//   // const params = (Object.keys(data[0])).sort();
//   // console.log(params);

  

//   // function getFields (fields) {
//   //   let list = '';
//   //   fields.map((item, i) => {
//   //     list += i ==0 ? `${item}` : `,${item}`;
//   //   });
//   //   return list;
//   // }

//   // function getValues (array) {
//   //   let data = ''
//   //   let index = 0
//   //   const sortList = (Object.keys(array)).sort()

//   //   for (item of sortList) {
//   //     data += (index == 0 ? `'${array[item]}'` : `,'${array[item]}'`)
//   //     index++;
//   //   }

//   //   return data;
//   // }

//   // let pginstance;

//   // try {

//   //   pginstance = await pgh.instance();
//   //   await pginstance.begin();
//   //   let index = 0;

//   //   for (let item of data) {

//   //     const sql = `insert into ${TABLE_NAME} (${getFields(params)}) values (${getValues(item)})`;
      
//   //     console.log();
//   //     console.log(sql);
//   //     console.log();
//   //     await pginstance.query(sql);

//   //     index++;

//   //     console.log(`============= Запись ${index} завершена успешна =============`);
//   //   }
//   //   // const test = (await pgh.queryAlone('select * from account limit 5')).rows;
  
//   // } catch (error) {
//   //   pginstance && await pginstance.rollback();
//   //   console.log(error);
//   // } finally {
//   //   pginstance && await pginstance.close(true);
//   // }


// //   const csvWriter = createCsvWriter({  
// //     path: `./files/${TABLE}.csv`,
// //     // header: [...fields]
// //     header: [
      
// //     ]
// //   })

// //   csvWriter
// //     .writeRecords(data)
// //     .then(() => console.log("csv file created"))


// // select public.fias_addr_obj_save(
// //   p_actstatus  => $1, 
// //   p_aoguid     => $2,
// //   p_aoid       => $3,
// //   p_aolevel    => $4,
// //   p_areacode   => $5,
// //   p_autocode   => $6,
// //   p_cadnum     => $7,
// //   p_centstatus => $8,
// //   p_citycode   => $9,
// //   p_code       => $10,
// //   p_ctarcode   => $11,
// //   p_currstatus => $12,
// //   p_divtype    => $13,
// //   p_enddate    => $14,
// //   p_extrcode   => $15,
// //   p_formalname => $16,
// //   p_ifnsfl     => $17,
// //   p_ifnsul     => $18,
// //   p_livestatus => $19,
// //   p_nextid     => $20,
// //   p_normdoc    => $21,
// //   p_offname    => $22,
// //   p_okato      => $23,
// //   p_oktmo      => $24,
// //   p_operstatus => $25,
// //   p_parentguid => $26,
// //   p_placecode  => $27,
// //   p_plaincode  => $28,
// //   p_plancode   => $29,
// //   p_postalcode => $30,
// //   p_previd     => $31,
// //   p_regioncode => $32,
// //   p_sextcode   => $33,
// //   p_shortname  => $34,
// //   p_startdate  => $35,
// //   p_streetcode => $36,
// //   p_terrifnsfl => $37,
// //   p_terrifnsul => $38,
// //   p_updatedate => $39