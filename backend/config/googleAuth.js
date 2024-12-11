const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.client_id, // Your Google Client ID
  process.env.client_secret, // Your Google Client Secret
  process.env.redirect_uris // Your Redirect URI
);

// Get the Google authentication URL
const getAuthUrl = () => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/drive.readonly"], // Permission to read files from Google Drive
  });
  return authUrl;
};

// Get Google OAuth2 tokens after the user grants permission
const getGoogleTokens = async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
};

module.exports = { oauth2Client, getAuthUrl, getGoogleTokens };
