# Lotus Platform - Setup Guide

## 🌸 Overview

This is a production-ready landing page for Lotus Platform with a registration form that saves data directly to Google Sheets.

## 📁 Project Structure

```
Landing Page/
├── index.html              # Main HTML file
├── styles.css              # All styles with your color theme
├── script.js               # Form handling and interactions
├── google-apps-script.js   # Google Apps Script code (copy to Google)
└── SETUP.md               # This file
```

## 🚀 Quick Start

### Step 1: Open the Landing Page

Simply open `index.html` in your browser to see the landing page. The form will work in demo mode (shows success but doesn't save data yet).

### Step 2: Connect Google Sheets (Required for Data Collection)

To save form submissions to your Google Sheet, follow these steps:

#### 2.1 Open Google Apps Script

1. Open your Google Sheet: [Lotus Short List](https://docs.google.com/spreadsheets/d/1CSEYKPjXwojAhzK3uibgVmEHgURcA9gfFD1Cos5hYsE/edit)
2. Click **Extensions** → **Apps Script**

#### 2.2 Add the Script

1. Delete any existing code in the editor
2. Open the `google-apps-script.js` file from this project
3. Copy the entire contents
4. Paste into the Google Apps Script editor
5. Press **Ctrl+S** (or **Cmd+S** on Mac) to save
6. Name your project (e.g., "Lotus Form Handler")

#### 2.3 Deploy as Web App

1. Click the **Deploy** button → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Select **Web app**
4. Configure:
   - **Description**: "Lotus Form Handler" (optional)
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
5. Click **Deploy**
6. If prompted, click **Authorize access** and follow the Google authorization flow
7. **Copy the Web app URL** provided

#### 2.4 Update the Landing Page

1. Open `script.js` in a text editor
2. Find this line near the top:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL` with your copied URL
4. Save the file

### Step 3: Test the Form

1. Open `index.html` in your browser
2. Fill out the registration form
3. Submit and verify the data appears in your Google Sheet

## 🎨 Customization

### Colors

All colors are defined as CSS variables in `styles.css`:

```css
:root {
    --primary: #0F2A3F;
    --secondary: #E5B441;
    --accent: #287A7D;
    /* ... */
}
```

### Form Fields

To add or modify form fields:

1. Add HTML input in `index.html` (inside the form)
2. Add validation rules in `script.js` (`validateField` function)
3. Add the field to the `formData` object in `script.js`
4. Update `HEADERS` and `rowData` in `google-apps-script.js`
5. Re-deploy the Google Apps Script

### Content

Edit `index.html` to change:
- Hero text and descriptions
- Feature cards
- About section content
- Footer links and information

## 📱 Responsive Design

The page is fully responsive and tested on:
- Desktop (1200px+)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## 🔒 Security Notes

- The Google Apps Script runs with your Google account permissions
- Form submissions are sent via POST request with `no-cors` mode
- No sensitive data is stored client-side
- Consider adding reCAPTCHA for spam protection in production

## 🐛 Troubleshooting

### Form submits but data doesn't appear in sheet

1. Check the browser console for errors
2. Verify the Google Apps Script URL is correct
3. Make sure the script is deployed and authorized
4. Test the script using the `testAddRow()` function in Apps Script

### CORS errors

The script uses `no-cors` mode which should work. If you still see CORS issues:
1. Re-deploy the Google Apps Script
2. Make sure "Who has access" is set to "Anyone"

### Style issues

1. Make sure `styles.css` is in the same folder as `index.html`
2. Clear browser cache and reload

## 📞 Support

If you need help:
1. Check browser developer tools (F12) for errors
2. Test form fields individually
3. Verify all files are in the same directory

---

**Lotus Platform** - Empowering Your Professional Journey 🌸
