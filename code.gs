function doGet(e) {
  var template = HtmlService.createTemplateFromFile('index')
  return  template.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME)
  .addMetaTag('viewport', 'width=device-width , initial-scale=1')
}

function uploadFiles(form) {
  try {
    var folderDes = "xxx"    // ระบุชื่อโฟลเดอร์ที่ต้องการ
    var folder, folders = DriveApp.getFoldersByName(folderDes);

    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(folderDes);
    }
    
    // ระบุ Web app URL
    var home = "xxx";
        
    var file = folder.createFile(form.myFile);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.COMMENT);
    var url = file.getUrl()
    var lecturer = form.myLecturer
    var leader = form.myleader
    var projectTitle = form.myProjectTitle
    var numGroup = form.myNumGroup
    var email = form.myEmail
    var telephone = form.myTelephone
    
    // ** ระบุ ID ของ googleSheet **
    var ss = SpreadsheetApp.openById("xxx");
    var sh = ss.getSheetByName('xxx')
    ss.appendRow([new Date(), lecturer, leader, projectTitle, numGroup, email, telephone, url])
    return "ข้อมูลของ.." + leader + " ทำโปรเจ็คเรื่อง " + projectTitle+ " ได้ถูกอัพโหลดเข้าระบบเป็นที่เรียบร้อยแล้ว ขอบคุณครับ  <p><p><a href ='"+url+"' >คลิกดูงานที่ส่ง</a> <p><a href ='"+home+"' >กลับหน้าหลัก</a>"    
  } catch (error) {
    return error.toString();
  }

}
