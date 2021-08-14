function doGet(e) {
  var template = HtmlService.createTemplateFromFile('index')
  return  template.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME)
  .addMetaTag('viewport', 'width=device-width , initial-scale=1')
}

function uploadFiles(form) {
  try {
    var folderDes = "uploadData"
    var folder, folders = DriveApp.getFoldersByName(folderDes);

    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(folderDes);
    }
    var home = "https://script.google.com/macros/s/AKfycbw6toqDSbFzDMKFI9g7ZRFZ_Xjv7BTcHIUGj4s7dNBnspWbwYw/exec";
        
    var file = folder.createFile(form.myFile);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.COMMENT);
    var url = file.getUrl()
    var lecturer = form.myLecturer
    var leader = form.myleader
    var projectTitle = form.myProjectTitle
    var numGroup = form.myNumGroup
    var email = form.myEmail
    var telephone = form.myTelephone
    
    // ** changeUrl for spreadsheet **
    var ss = SpreadsheetApp.openById("1GhC_c4vnT_DHQSk0UEd2isBiQKCPzHxU3sw6hVGUBuc");
    var sh = ss.getSheetByName('sheet1')
    ss.appendRow([new Date(), lecturer, leader, projectTitle, numGroup, email, telephone, url])
    return "ข้อมูลของ.." + leader + " ทำโปรเจ็คเรื่อง " + projectTitle+ " ได้ถูกอัพโหลดเข้าระบบเป็นที่เรียบร้อยแล้ว ขอบคุณครับ  <p><p><a href ='"+url+"' >คลิกดูงานที่ส่ง</a> <p><a href ='"+home+"' >กลับหน้าหลัก</a>"    
  } catch (error) {
    return error.toString();
  }

}
