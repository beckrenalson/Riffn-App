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
## Road Map

### 1. Planning & Design
- Define core MVP features (musician profiles, band needs, filtering)  
- Research similar platforms (BandMix, Vampr)  
- Create wireframes and UI mockups  
- Define brand (name, logo, colors)  
- Set up development tools and repositories  

### 2. Backend Setup
- Implement authentication (email or OAuth)  
- Create database models:  
  - Users (musician/band)  
  - Profiles (instruments, genres, media)  
  - Match posts (band openings)  
- Set up media storage (audio/video samples)  
- Begin testing APIs  

### 3. Frontend Development – Profiles & Search
- Build profile creation/edit screens  
- Implement band opening listings  
- Add filtering (genre, instrument, location)  
- Link frontend to backend APIs  

### 4. Messaging & Matching
- Create match display system (basic swiping or list-based)  
- Add basic messaging functionality (Firebase or simple chat API)  
- Enable “request to connect” functionality for matches  

### 5. Testing & Polish
- Internal bug testing and performance checks  
- Small beta group testing (local musicians)  
- Collect feedback on search, profile flows, and messaging  
- Fix bugs and polish UI/UX  

### 6. Launch
- Deploy with Vercel  
- Promote through local music groups and forums  
- Monitor early usage metrics  
- Provide support for initial users  

### 7. Iteration & Optimization
- Address post-launch bugs or UI issues  
- Improve filtering/matching logic based on feedback  
- Prepare marketing materials or landing page  
- Final review before wider release  

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
