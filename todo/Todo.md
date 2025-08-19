[User Profile]
 ├─ userName, location, bio, instruments, genres
 ├─ Bands they belong to → [Band Profile] (clickable)
 ├─ Connection requests sent → shows "Pending" on target band/user
 └─ Connection requests received → for solo users? optional

[Band Profile]
 ├─ bandName, location, bio, instruments needed, genres
 ├─ Band members → [User Profile] (clickable)
 ├─ Pending join requests → list of [User Profile] requests
 └─ Accept/Reject requests → updates bandMembers if accepted

[Connection Request]
 ├─ fromUser → [User Profile]
 ├─ toUser → [Band Profile] or [User Profile]
 └─ status: 'pending' | 'accepted' | 'rejected'

Navigation flow:
1. User clicks on a band in their "Bands" list → opens Band Profile
2. User clicks on a member in a band → opens User Profile
3. From Band Profile, user can send a connection request → appears in Pending Requests for the band
4. Band accepts request → user added to bandMembers → user sees band in their "Bands" list

Passkey!!!