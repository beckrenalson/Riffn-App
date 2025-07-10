# PROJECT PROPOSAL: Riffn
Filter users depending on what the users profile type is. If the user selects solo artist, it returns a list of users that created a band profile and has and opening for the solo artists selected instruments, genres, and location and vice versa if the band wants to search for a musician for their band, the list shows them a list of artists that meet their selected instruments, genres, and location

## Problem Statement
- Musicians have trouble finding bands to join 
- Facebook groups and forums are difficult to navigate and have to manually write out their description of who they are/ their band, preferences.
- Contact details are not allowed on facebook groups, requiring direct message. Security issues when posting personal information onto forums

## WOW Factor
- Does not require user to put a lot of personal details on their profile, using social media handles instead to gain contact with others.
- Clean and straight to the point ui/ux making forming bands more intuitive for the user.
- Easy selection process for the musician to select their preferences during signup and interation

## Test Users

- Tomo
- Victor
- Darren

## User Stories

- As a user, I want to be able to report inappropriate content or behavior so the platform remains safe and respectful.
- As a user, I want to be notified when another user expresses interest in my profile (e.g., likes my profile, views my profile, or sends a message) so I can respond.
- As a user, I want to be able to "like" or "save" profiles I'm interested in so I can easily revisit them later.
- As a user, I want to distinguish between solo musician and band profiles when viewing search results or profiles.
- As a user, I want to filter or sort my list of matches by specific criteria (e.g., distance, genre overlap, or instrument priority).
- As a user, I want to see how closely someone matches my criteria (e.g. genre overlap, instrument match, location proximity).
- As a user, I want to control what personal information is visible on my profile to protect my privacy.
- As a user, I want to be able to contact via social media / email other users after viewing their profile so we can discuss potential collaboration.
- As a new user, I want to easily sign up and create a profile so I can start finding matches.
- As a musician I want to be able to easily find bands in my city that are looking for intrument/s that I play and are into playing the same genres.
- As a musician I want to be able to select instruments, genres, and a location to find matches and edit these if need be.
- As a band, I want to specify the instruments and genres we need for our open positions so solo musicians can find us based on those criteria.
- As a musician, I want a clean and distraction-free interface so I can focus on finding bands quickly.
- As a band we want to find musicians in our city that play instruments we need for the band.
- As a user I want a simple list of matches to then click on one and view their profile
- As a user I want to be able to create/edit my personal profile to change personal details and requirements for matches.

## MVP User Stories
- As a new user, I want to easily sign up and create a profile so I can start finding matches.
- As a user I want to be able to create/edit my personal profile to change personal details and requirements for matches.
- As a musician I want to be able to select instruments, genres, and a location to find matches and edit these if need be.
- As a band, I want to specify the instruments and genres we need for our open positions so solo musicians can find us based on those criteria.
- As a musician I want to be able to easily find bands in my city that are looking for instrument/s that I play and are into playing the same genres.
- As a band we want to find musicians in our city that play instruments we need for the band.
- As a user I want a simple list of matches to then click on one and view their profile.
- As a user, I want to distinguish between solo musician and band profiles when viewing search results or profiles.
- As a user I want to be able to create/edit my personal profile to change personal details and requirements for matches. (Ensure contact info is displayed if added).

### Acceptance criteria for MVP
1. Sign Up and Create Profile
- Given a new user navigates to the sign-up page, when they provide a valid email and password, then an account is created.
- Given an account is created, when the user provides basic profile information (e.g., username, profile type [musician/band]), then a profile is successfully created and associated with their account.
- Given a new user attempts to sign up with an email that is already registered, then an error message is displayed, indicating the email is already in use.
1.4 Given a new user attempts to sign up without providing all required information, then an error message is displayed, highlighting the missing fields.
1.5 Given a new user successfully signs up, then they are automatically logged in and redirected to their profile setup or a dashboard.

2. Edit Personal Profile (General Info + Contact)
- Given a user is logged in, when they navigate to their profile editing section, then their current personal details are displayed.
- Given a user is editing their profile, when they update personal details (e.g., name, bio, contact information, profile picture) and save, then the changes are successfully updated and reflected on their profile.
- Given a user adds contact information (e.g., email, phone number, social media links) to their profile, then this information is visibly displayed on their public profile for other users to see.
- Given a user attempts to save their profile with invalid data (e.g., malformed email address), then an error message is displayed, indicating the invalid input.
- Given a user attempts to save their profile without providing required information, then an error message is displayed, highlighting the missing fields.

3. Musician Profile: Instruments, Genres, Location
- Given a musician user is logged in and editing their profile, when they navigate to the "Musician Details" section, then they can select multiple instruments they play from a predefined list.
- Given a musician user is logged in and editing their profile, when they navigate to the "Musician Details" section, then they can select multiple genres they play from a predefined list.
- Given a musician user is logged in and editing their profile, when they navigate to the "Musician Details" section, then they can specify their primary location (city/region).
- Given a musician user updates their instruments, genres, or location, when they save their profile, then these changes are successfully updated and used for match-making and - Given a musician user has saved their profile, then their selected instruments, genres, and location are displayed on their public profile.

4. Band Profile: Define Open Positions
- Given a band user is logged in and editing their profile, when they navigate to the "Band Openings" section, then they can add new open positions.
- Given a band user is adding an open position, when they specify the instrument(s) required for that position from a predefined list, then the instrument(s) are associated with the opening.
- Given a band user is adding an open position, when they specify the genre(s) relevant to that position from a predefined list, then the genre(s) are associated with the opening.
- Given a band user saves their profile with new or updated open positions, then these positions are publicly visible on their band profile.
- Given a band user has open positions, then these positions, including required instruments and genres, are searchable by solo musicians.

5. Musician Finding Bands
- Given a musician user is logged in, when they use the search functionality, then they can filter results by band profiles.
- Given a musician user is logged in, when they search, then results are prioritized or filtered to show bands in their specified city/location.
- Given a musician user has specified their instruments, when they view search results, then bands with open positions for those instruments are prominently displayed.
- Given a musician user has specified their genres, when they view search results, then bands that match their preferred genres are prominently displayed.
- Given a musician user views a band in the search results, then they can clearly see if the band has openings for instruments the musician plays and if their genres align.

6. Band Finding Musicians
- Given a band user is logged in, when they use the search functionality, then they can filter results by solo musician profiles.
- Given a band user is logged in, when they search, then results are prioritized or filtered to show musicians in their specified city/location.
- Given a band has specified instruments needed for open positions, when they view search results, then solo musicians who play those instruments are prominently displayed.
- Given a band user views a musician in the search results, then they can clearly see what instruments the musician plays and their location.

7. View Match List and Profiles
- Given a user is logged in, when they navigate to their "Matches" or "Search Results" page, then a clear, concise list of potential matches is displayed.
- Given a list of matches is displayed, when the user clicks on an individual match from the list, then they are redirected to that match's full profile page.
- Given a list of matches is displayed, then each item in the list includes basic identifying information (e.g., name/band name, profile picture, primary instrument/role).

8. Distinguish Profile Types
- Given a user is viewing search results, then each search result clearly indicates whether it is a "Solo Musician" profile or a "Band" profile (e.g., with an icon, label, or distinct styling).
- Given a user is viewing an individual profile, then it is immediately clear whether they are viewing a "Solo Musician Profile" or a "Band Profile."
- Given a user is creating their profile, then they must select whether they are registering as a solo musician or a band.