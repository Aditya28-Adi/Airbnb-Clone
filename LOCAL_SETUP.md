# Local Setup Guide

## 1. Install dependencies

```bash
npm install
```

## 2. Create your environment file

Copy `.env.example` to a new file named `.env` and fill in your own credentials.

At minimum, for the database-backed application, configure:

- `MONGO_URL`
- `SESSION_SECRET`

Cloudinary is required for listing image uploads:

- `CLOUD_NAME`
- `CLOUD_API_KEY`
- `CLOUD_API_SECRET`

Google OAuth is optional. If the Google variables are empty, the app still starts and local email/password authentication remains available. To enable Google login, configure:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_CALLBACK_URL`

For local development, the callback URL should normally be:

`http://localhost:3000/auth/google/callback`

Add that exact URL to the Authorized redirect URIs in your Google Cloud OAuth client.

Email verification uses Gmail SMTP:

- `EMAIL_ID`
- `EMAIL_PASS`

For Gmail, use an App Password rather than your normal Google account password.

## 3. Start the server

```bash
npm start
```

Then open:

http://localhost:3000

## Node version

The project specifies Node.js `22.17.1` in `package.json`. Using that version is recommended for local development.

## Important

Do not commit or upload your `.env` file. It contains private credentials. The repository's `.gitignore` already excludes `.env`.
