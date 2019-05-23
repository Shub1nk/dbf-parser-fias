[ { id: 'AOGUID', title: 'AOGUID' },
  { id: 'BUILDNUM', title: 'BUILDNUM' },
  { id: 'ENDDATE', title: 'ENDDATE' },
  { id: 'ESTSTATUS', title: 'ESTSTATUS' },
  { id: 'HOUSEGUID', title: 'HOUSEGUID' },
  { id: 'HOUSEID', title: 'HOUSEID' },
  { id: 'HOUSENUM', title: 'HOUSENUM' },
  { id: 'STATSTATUS', title: 'STATSTATUS' },
  { id: 'IFNSFL', title: 'IFNSFL' },
  { id: 'IFNSUL', title: 'IFNSUL' },
  { id: 'OKATO', title: 'OKATO' },
  { id: 'OKTMO', title: 'OKTMO' },
  { id: 'POSTALCODE', title: 'POSTALCODE' },
  { id: 'STARTDATE', title: 'STARTDATE' },
  { id: 'STRUCNUM', title: 'STRUCNUM' },
  { id: 'STRSTATUS', title: 'STRSTATUS' },
  { id: 'TERRIFNSFL', title: 'TERRIFNSFL' },
  { id: 'TERRIFNSUL', title: 'TERRIFNSUL' },
  { id: 'UPDATEDATE', title: 'UPDATEDATE' },
  { id: 'NORMDOC', title: 'NORMDOC' },
  { id: 'COUNTER', title: 'COUNTER' },
  { id: 'CADNUM', title: 'CADNUM' },
  { id: 'DIVTYPE', title: 'DIVTYPE' } ]


  { 
    ACTSTATUS: 0,
    AOGUID: 'dcf14324-216f-4be6-a89a-c53c654eb250',
    AOID: '332092ba-2720-4f40-a90f-84d5e66c724f',
    AOLEVEL: 65,
    AREACODE: '029',
    AUTOCODE: '0',
    CENTSTATUS: 0,
    CITYCODE: '000',
    CODE: '50029000132000551',
    CURRSTATUS: 51,
    ENDDATE: '20180518',
    FORMALNAME: 'Росинка',
    IFNSFL: '5075',
    IFNSUL: '5075',
    NEXTID: '39ea7020-a4c3-4b7d-b410-2ea9e80008cc',
    OFFNAME: 'Росинка',
    OKATO: '46466000372',
    OKTMO: '46766000472',
    OPERSTATUS: 21,
    PARENTGUID: 'a1c97c13-603a-478a-bb09-bddb60c1e3d1',
    PLACECODE: '132',
    PLAINCODE: '500290001320005',
    POSTALCODE: '143154',
    PREVID: 'a7a75e9f-7923-4d5b-b3c8-4f18e8c87faa',
    REGIONCODE: '50',
    SHORTNAME: 'тер. ТСН',
    STARTDATE: '20180511',
    STREETCODE: '0000',
    TERRIFNSFL: '',
    TERRIFNSUL: '',
    UPDATEDATE: '20180521',
    CTARCODE: '000',
    EXTRCODE: '0000',
    SEXTCODE: '000',
    LIVESTATUS: 0,
    NORMDOC: '70e9676b-53d6-4288-9666-5f8b9b25c310',
    PLANCODE: '0005',
    CADNUM: '',
    DIVTYPE: 0 }
  

    insert into fias_addr_obj (ACTSTATUS,AOGUID,AOID,AOLEVEL,AREACODE,AUTOCODE,CADNUM,CENTSTATUS,CITYCODE,CODE,CTARCODE,CURRSTATUS,DIVTYPE,ENDDATE,EXTRCODE,FORMALNAME,IFNSFL,IFNSUL,LIVESTATUS,NEXTID,NORMDOC,OFFNAME,OKATO,OKTMO,OPERSTATUS,PARENTGUID,PLACECODE,PLAINCODE,PLANCODE,POSTALCODE,PREVID,REGIONCODE,SEXTCODE,SHORTNAME,STARTDATE,STREETCODE,TERRIFNSFL,TERRIFNSUL,UPDATEDATE) values ('1','29251dcf-00a1-4e34-98d4-5c47484a36d4','d286798f-0849-4a7c-8e78-33c88dc964c6','1','000','0','','0','000','5000000000000','000','0','0','20790606','0000','Московская','5000','5000','1','','','Московская','46000000000','','1','','000','50000000000','0000','','','50','000','обл','19000101','0000','','','20150915')

{ error: column "terrifnsfl" of relation "fias_addr_obj" does not exist
    at Connection.parseE (/home/nikolay/Desktop/dbf_parser/node_modules/pg/lib/connection.js:602:11)
    at Connection.parseMessage (/home/nikolay/Desktop/dbf_parser/node_modules/pg/lib/connection.js:399:19)
    at Socket.<anonymous> (/home/nikolay/Desk



CREATE OR REPLACE FUNCTION kernel.fias_addr_obj_save(p_actstatus character varying DEFAULT NULL::character varying, p_aoguid character varying DEFAULT NULL::character varying, p_aoid character varying DEFAULT NULL::character varying, p_aolevel character varying DEFAULT NULL::character varying, p_areacode character varying DEFAULT NULL::character varying, p_autocode character varying DEFAULT NULL::character varying, p_cadnum character varying DEFAULT NULL::character varying, p_centstatus character varying DEFAULT NULL::character varying, p_citycode character varying DEFAULT NULL::character varying, p_code character varying DEFAULT NULL::character varying, p_ctarcode character varying DEFAULT NULL::character varying, p_currstatus character varying DEFAULT NULL::character varying, p_divtype character varying DEFAULT NULL::character varying, p_enddate character varying DEFAULT NULL::character varying, p_extrcode character varying DEFAULT NULL::character varying, p_formalname character varying DEFAULT NULL::character varying, p_ifnsfl character varying DEFAULT NULL::character varying, p_ifnsul character varying DEFAULT NULL::character varying, p_livestatus character varying DEFAULT NULL::character varying, p_nextid character varying DEFAULT NULL::character varying, p_normdoc character varying DEFAULT NULL::character varying, p_offname character varying DEFAULT NULL::character varying, p_okato character varying DEFAULT NULL::character varying, p_oktmo character varying DEFAULT NULL::character varying, p_operstatus character varying DEFAULT NULL::character varying, p_parentguid character varying DEFAULT NULL::character varying, p_placecode character varying DEFAULT NULL::character varying, p_plaincode character varying DEFAULT NULL::character varying, p_plancode character varying DEFAULT NULL::character varying, p_postalcode character varying DEFAULT NULL::character varying, p_previd character varying DEFAULT NULL::character varying, p_regioncode character varying DEFAULT NULL::character varying, p_sextcode character varying DEFAULT NULL::character varying, p_shortname character varying DEFAULT NULL::character varying, p_startdate character varying DEFAULT NULL::character varying, p_streetcode character varying DEFAULT NULL::character varying, p_terrifnsfl character varying DEFAULT NULL::character varying, p_terrifnsul character varying DEFAULT NULL::character varying, p_updatedate character varying DEFAULT NULL::character varying)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
  
	BEGIN
		--Пока без апдейта
		
		-- create action --
		insert into fias_addr_obj (actstatus, aoguid, aoid, aolevel, areacode, autocode, cadnum, centstatus, citycode, code, ctarcode, currstatus, divtype, enddate, extrcode, formalname,
		                           ifnsfl, ifnsul, livestatus, nextid, normdoc, offname, okato, oktmo, operstatus, parentguid, placecode, plaincode, plancode, postalcode, previd, regioncode, sextcode,
		                           shortname, startdate, streetcode, terrifnsfl, terrifnsul, updatedate)
		values (
		    case when p_actstatus  = 'null' then null else p_actstatus  end,
			case when p_aoguid     = 'null' then null else p_aoguid     end,
			case when p_aoid       = 'null' then null else p_aoid       end,
			case when p_aolevel    = 'null' then null else p_aolevel    end,
			case when p_areacode   = 'null' then null else p_areacode   end,
			case when p_autocode   = 'null' then null else p_autocode   end,
			case when p_cadnum     = 'null' then null else p_cadnum     end,
			case when p_centstatus = 'null' then null else p_centstatus end,
			case when p_citycode   = 'null' then null else p_citycode   end,
			case when p_code       = 'null' then null else p_code       end,
			case when p_ctarcode   = 'null' then null else p_ctarcode   end,
			case when p_currstatus = 'null' then null else p_currstatus end,
			case when p_divtype    = 'null' then null else p_divtype    end,
			case when p_enddate    = 'null' then null else p_enddate    end,
			case when p_extrcode   = 'null' then null else p_extrcode   end,
			case when p_formalname = 'null' then null else p_formalname end,
			case when p_ifnsfl     = 'null' then null else p_ifnsfl     end,
			case when p_ifnsul     = 'null' then null else p_ifnsul     end,
			case when p_livestatus = 'null' then null else p_livestatus end,
			case when p_nextid     = 'null' then null else p_nextid     end,
			case when p_normdoc    = 'null' then null else p_normdoc    end,
			case when p_offname    = 'null' then null else p_offname    end,
			case when p_okato      = 'null' then null else p_okato      end,
			case when p_oktmo      = 'null' then null else p_oktmo      end,
			case when p_operstatus = 'null' then null else p_operstatus end,
			case when p_parentguid = 'null' then null else p_parentguid end,
			case when p_placecode  = 'null' then null else p_placecode  end,
			case when p_plaincode  = 'null' then null else p_plaincode  end,
			case when p_plancode   = 'null' then null else p_plancode   end,
			case when p_postalcode = 'null' then null else p_postalcode end,
			case when p_previd     = 'null' then null else p_previd     end,
			case when p_regioncode = 'null' then null else p_regioncode end,
			case when p_sextcode   = 'null' then null else p_sextcode   end,
			case when p_shortname  = 'null' then null else p_shortname  end,
			case when p_startdate  = 'null' then null else p_startdate  end,
			case when p_streetcode = 'null' then null else p_streetcode end,
			case when p_terrifnsfl = 'null' then null else p_terrifnsfl end,
			case when p_terrifnsul = 'null' then null else p_terrifnsul end,
			case when p_updatedate = 'null' then null else p_updatedate end
		)	
	END
$function$
;


aoguid,
  buildnum,
  cadnum,
  counter,
  divtype,
  enddate,
  eststatus,
  houseguid,
  houseid,
  housenum,
  ifnsfl,
  ifnsul,
  normdoc,
  okato,
  oktmo,
  postalcode,
  startdate,
  statstatus,
  strstatus,
  strucnum,
  terrifnsfl,
  terrifnsul,
  updatedate