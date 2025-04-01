// Google Apps Script 코드
// 이 코드는 Google Apps Script 편집기에 붙여넣어 사용합니다.
// 웹 앱으로 배포한 후 URL을 환경 변수로 설정해야 합니다.

// 스프레드시트 ID 설정
const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID" // 실제 스프레드시트 ID로 변경해야 합니다.
const SHEET_NAME = "HWON_request"

function doPost(e) {
  try {
    // JSON 데이터 파싱
    const data = JSON.parse(e.postData.contents)

    // 스프레드시트 열기
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID)
    let sheet = spreadsheet.getSheetByName(SHEET_NAME)

    // 시트가 없으면 생성
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME)
      // 헤더 추가
      sheet.appendRow(["타임스탬프", "이름", "이메일", "전화번호", "문의 내용"])
    }

    // 데이터 추가
    sheet.appendRow([data.timestamp || new Date().toISOString(), data.name, data.email, data.phone, data.message])

    // 성공 응답
    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    // 오류 응답
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() })).setMimeType(
      ContentService.MimeType.JSON,
    )
  }
}

// 웹 앱으로 배포 시 설정:
// 1. 실행: 자신의 계정으로 실행
// 2. 액세스 권한: 모든 사용자(익명 포함)
// 3. 배포 후 생성된 URL을 환경 변수로 설정

