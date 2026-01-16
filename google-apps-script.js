/**
 * LOTUS PLATFORM - Google Apps Script
 * 
 * This script handles form submissions and saves data to Google Sheets.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1CSEYKPjXwojAhzK3uibgVmEHgURcA9gfFD1Cos5hYsE/edit
 * 2. Click on "Extensions" > "Apps Script"
 * 3. Delete any existing code and paste this entire script
 * 4. Click "Save" (Ctrl+S or Cmd+S)
 * 5. Click "Deploy" > "New deployment"
 * 6. Select type: "Web app"
 * 7. Set "Execute as": "Me"
 * 8. Set "Who has access": "Anyone"
 * 9. Click "Deploy"
 * 10. Authorize the app when prompted
 * 11. Copy the Web app URL provided
 * 12. Paste the URL in script.js (replace 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL')
 */

// Sheet configuration
const SHEET_NAME = 'Sheet1'; // Name of the sheet tab

// Column headers (in order)
const HEADERS = [
  'Timestamp',
  'First Name',
  'Last Name',
  'Email',
  'Phone',
  'University',
  'Department',
  'Position',
  'Academic Status',
  'Research Experience',
  'Research Area',
  'Newsletter'
];

/**
 * Handles POST requests from the landing page form
 */
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the spreadsheet and sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }
    
    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setBackground('#0F2A3F');
      headerRange.setFontColor('#FFFFFF');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
      
      // Freeze header row
      sheet.setFrozenRows(1);
      
      // Auto-resize columns
      for (let i = 1; i <= HEADERS.length; i++) {
        sheet.setColumnWidth(i, 150);
      }
    }
    
    // Prepare the row data
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.phone || '',
      data.university || '',
      data.company || '',
      data.position || '',
      data.academicStatus || '',
      data.experience || '',
      data.interests || '',
      data.newsletter || ''
    ];
    
    // Append the data
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Data saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error and return error response
    console.error('Error processing form submission:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Lotus Platform API is running. Use POST to submit form data.'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function to verify the script is working
 * Run this from the Apps Script editor to test
 */
function testAddRow() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '+1234567890',
        university: 'Test University',
        company: 'Research Department',
        position: 'Researcher',
        academicStatus: 'phd-student',
        experience: '3-6',
        interests: 'qualitative',
        newsletter: 'Yes'
      })
    }
  };
  
  const result = doPost(testData);
  console.log(result.getContent());
}

/**
 * Optional: Send email notification for new submissions
 * Uncomment and configure to enable
 */
/*
function sendEmailNotification(data) {
  const recipient = 'your-email@example.com';
  const subject = 'New Lotus Platform Registration';
  const body = `
New registration received:

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
University: ${data.university}
Company: ${data.company}
Position: ${data.position}
Experience: ${data.experience}
Interests: ${data.interests}
Newsletter: ${data.newsletter}

Timestamp: ${data.timestamp}
  `;
  
  MailApp.sendEmail(recipient, subject, body);
}
*/
