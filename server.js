const VERSION = 1;

const DB_SPREADSHEET_ID = '1-o57-oQF4gDRuP3jcGRUc1k2EjogmP04QlJrFs9CPl4';

const DB_SHEET_NAME = 'Investor Portal';

const PRICE_SHEET_NAME = 'Price Input';


function login(email, password) {
  var data = loadDBData(email, {valueGetter:'getDisplayValues'});
  var pass = _.get(data, [0,'Password'], '');
  return pass.length >= 3 && password == pass ? JSON.stringify({
    email,
    rows: loadDBData(email),
    prices: loadDBPrices(),
  }) : false;
}

function testLogin(){
  Logger.log(login('krupod@gmail.com', '123'));
}

function loadDBData(email, options = {}) {
  var rows;
  
  var sheet = SpreadsheetApp.openById(DB_SPREADSHEET_ID).getSheetByName(DB_SHEET_NAME);
  var data = loadSheet(sheet, _.assign(options, {skipBefore:3, headers:false}));
  var rows = data.filter(row => row['Infomation'] == email);  
  
  return rows;
}

function loadDBPrices() {
  var sheet = SpreadsheetApp.openById(DB_SPREADSHEET_ID).getSheetByName(PRICE_SHEET_NAME);
  var rows = loadSheet(sheet, {headers:false});
  var prices = {};
  Object.keys(rows[0]).map( share => prices[share] = _.map(rows, share) );
  
  Logger.log(JSON.stringify(prices));
  return prices;
}

