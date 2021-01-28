var _ = LodashGS.load();

function setSheetHeaders(sheet, headers) {
  if(sheet.getLastRow() <= 1)
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
}

var LOG_APPEND = false;

function _log(values) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Log');
  
  var headers = ["Date", "User", "Code", "Result", "Comment", "Extra"];
  setSheetHeaders(sheet, headers);
    
  values.unshift(Session.getEffectiveUser().getEmail());
  values.unshift(new Date());
  
  if(LOG_APPEND) {
    sheet.appendRow(values);
  } else {
    sheet.insertRowBefore(2);
    sheet.getRange(2, 1, 1, values.length).setValues([values]);
  }
  
}

function loadSheet(srcSheet, options) {
  var sheet = typeof(srcSheet) === 'string' ? SpreadsheetApp.getActiveSpreadsheet().getSheetByName(srcSheet) : srcSheet;
  
  var rows = sheet.getRange(1, 1, _.get(options, 'limit', sheet.getLastRow()), sheet.getLastColumn())[_.get(options, 'valueGetter', 'getValues')]();
  
  if(_.get(options, 'skipBefore', 0) > 0)
    rows = rows.slice(_.get(options, 'skipBefore'));

  var headers = rows.shift();
  
  var rowsObj = rows.map(function(row){ return _.zipObject(headers, row)})
  
  if(_.get(options, 'rowIndex', false))
    rowsObj.map(function(row, index){ row.row = index + 2});

  if(_.get(options, 'skipAfter', 0) > 0)
    rowsObj = rowsObj.slice(_.get(options, 'skipAfter'));

  return _.get(options, 'headers', false) ? { rows: rowsObj, headers: headers }: rowsObj;
}



