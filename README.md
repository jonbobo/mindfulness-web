


Mindfulness App
A Mindfulness App built using Express.js, MySQL2, Firebase Authentication, HTML, CSS, and JavaScript. It allows users to sign up, log in, create threads, vote, and comment on the forum.

Features
Firebase Authentication: Secure login and sign-up with Firebase.
Forum: View, create threads, vote, and comment.
Responsive Design: Mobile-friendly user interface.
Technologies
Backend: Express.js
Database: MySQL2
Authentication: Firebase Authentication
Frontend: HTML, CSS, JavaScript
Home page 
![image](https://github.com/user-attachments/assets/54afb628-264c-4aae-b951-0490f70ea0a1)
Login Page
![image](https://github.com/user-attachments/assets/47692b68-af25-484f-9495-14acdd4b1d27)
Sign Up 
![image](https://github.com/user-attachments/assets/e0d784c4-1c03-47b1-b954-c10ab4d26122)
Forum 
![image](https://github.com/user-attachments/assets/b754cd49-47f2-4f5f-9d10-8c89a4674130)
Create new thread
![image](https://github.com/user-attachments/assets/61d0fc2e-4e8c-425f-be02-dbe366399cbf)
Comment
![image](https://github.com/user-attachments/assets/a412fae3-75b0-4c11-b52b-e0e2814ffd60)
Clone the repo:

bash
Copy code
git clone https://github.com/your-username/mindfulness-app.git
cd mindfulness-app
Install dependencies:

bash
Copy code
npm install
Set up Firebase Authentication:

Inquire with me for the firebase.json configuration file, which you'll need to integrate Firebase Authentication into the app.
Enable authentication in the Firebase Console (e.g., Email/Password, Google login).
Set up MySQL:

You can create your own MySQL database.
Use the example SQL script (included in the full readme) to set up the necessary tables for users, threads, comments, and votes.
Configure environment: Create a .env file with your database credentials and Firebase configuration.

Run the app:

bash
Copy code
npm start
The app will be available at http://localhost:3000.

Usage
Sign Up/Login: Users can register or log in using Firebase.
Create Threads: Authenticated users can create threads.
Vote and Comment: Users can vote on threads and add comments.
Firebase Authentication
The backend uses Firebase Admin SDK to authenticate users via JWT tokens.
Token verification is handled using middleware to secure routes.
