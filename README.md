# Riffn
Riffn is a platform for musicians and bands to connect, collaborate, and create.  
Whether you're a solo musician looking for a band or a band searching for new members, Riffn makes it easy to find matches based on instruments, genres, and location.
---
## Features (MVP)
- User Accounts – Sign up and create/edit profiles
- Passkey Authentication – Secure login with WebAuthn (FIDO2)
- Musician Profiles – Add instruments, genres, location, and personal details
- Band Profiles – Post openings for instruments/genres you need
- Filtering & Search – Find musicians/bands by instrument, genre, and location
- Match System – See a simple list of matches and view full profiles
- Distinguish Profiles – Easily tell apart solo musicians vs. bands
- Contact Info – Display if the user chooses to share
---
## Tech Stack
- Frontend: React + Bun
- Backend: Node.js + Express
- Database: MongoDB
- Auth: Passkeys (WebAuthn), fallback to Email/Password
- Hosting: Vercel (frontend), Render (backend)
---
## Local Setup
### 1. Clone the repo
bash
git clone https://github.com/yourusername/riffn.git
cd riffn
### 2. Environment variables
Create a .env file inside the riffn-api folder with your own config:
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PASSKEY_ORIGIN=http://localhost:5173
PASSKEY_RPID=localhost
PORT=5000
### 3. Backend Setup 
bash
cd riffn-api
npm install
node server.js
API will run on:
http://localhost:5000
### 4. Frontend Setup
From the root project folder:
cd Riffn-App
bun install
bun run dev
Frontend will run on:
http://localhost:5173
## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss your ideas.
## License
MIT License © 2025 Riffn
