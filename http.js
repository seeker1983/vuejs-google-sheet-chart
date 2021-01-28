function doGet(e) {
  _log(['GET',e.queryString, e.parameter]);
  
  var template = HtmlService.createTemplateFromFile('index');
  
  template.data = e.parameter;
  
  return template.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function renderError(msg){
      var template = HtmlService.createTemplateFromFile('error');
      
      template.msg = msg;
      
      response = template.evaluate();
      
      return template.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function testGet(){
//  doGet({queryString:'TEST', parameter: {'id': hashing.encode('krupod@gmail.com')}});
  doGet({queryString:'TEST', parameter: {'id': 111}});
  
}

function doPost(e) {
  _log(['POST',e.queryString, JSON.stringify(e.parameter)])
  var result = {status: "pending"};
  try {
    var email = e.parameter['data[email]'];
    var list_id = e.parameter['data[list_id]'];
    var url = getEmailLink(email);
    updateLink(list_id, email, getEmailLink(email));
    result = {status:"success", url};
    
  } catch(error) {
    Logger.log(error);
    _log( ['FAIL', 'Exception', error] );
    result = { status:"fail", error};
  }

  return ContentService.createTextOutput(JSON.stringify(_.assign(result, {version: VERSION}))).setMimeType(ContentService.MimeType.JSON);
}

function getEmailLink(email) {
  return ScriptApp.getService().getUrl() + '?id=' + hashing.encode(email);
}

function testPost(){
  doPost({queryString:'TEST', parameter: JSON.parse(TEST_POST)});
}