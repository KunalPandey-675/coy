Coy SDE Intern Assignment 
Overview 
This assignment mirrors the work you would do in the role: understanding a live consumer 
product, thinking about its privacy edge cases, and writing clean, tested backend logic 

Part A: Use the app 
Sign up and explore Coy at https://app.getcoy.com. Make sure you go through: 
• Phone OTP login 
• Adding a crush 
• Email verification 
• The invite link 
• The extra-slots screen (look, but don’t buy; you don’t need to pay for this assignment) 
Task: Suggest two core features 
Based on your experience of the app, suggest two core features you think Coy should have. Also 
for each feature tell us why do you think that feature is required. 

Part B: Build a “Discover” tab 
Build a swipe-based discovery feature, similar to Bumble or Tinder, as a new “Discover” tab 
alongside Coy’s existing experience. Build it as a standalone app in your own public GitHub repo; 
you do not have access to Coy’s codebase, so a simple tab bar with a placeholder “Home” tab 
and your “Discover” tab is enough. Keep the “Home” tab blank and build the functionality in 
“Discover” Tab. 
Tech stack 
• Frontend: React.js or Next.js (preferred), mobile-first. 
• Backend: Node.js with Express, or Next.js API routes. 
• Data: a JSON file, SQLite or any database of your choice. No external auth is needed; 
assume a single logged-in user. 
Requirements 
1. Profile data 
• Seed at least 30 mock profiles: name, age, photo (placeholder images are fine), short bio, 
city or college, and interests. 
• Some seeded profiles should have already liked the logged-in user, so that matches can 
happen during a demo. 
2. Swipe experience 
• Show one profile card at a time. Swipe right to like and left to pass, with drag gestures on 
mobile and buttons on desktop. 
• Smooth card animations and clear feedback on each swipe. 
• A profile that has been swiped on must never appear again. 


• A clear empty state when there are no profiles left. 
3. Matching 
• A match happens only when both users have liked each other. Show an “It’s a match!” 
screen at that moment. 
• A “Matches” view listing all mutual matches. 
• Never reveal who has liked the user unless it is mutual; this is the core promise of Coy. 
4. Backend APIs 
• GET /feed: returns profiles the user has not yet swiped on. 
• POST /swipe: records a like or pass and returns whether it created a match. 
• GET /matches: returns the user’s mutual matches. 
• Swipes and matches must persist across page reloads. 

