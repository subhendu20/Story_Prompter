
Story_Prompter

Features
User-Friendly Interface: Intuitive design for a smooth user experience.
Prompt Input: Input your creative prompts or ideas.
Story Generation: Utilizes advanced language models to generate imaginative stories based on prompts.
Authentication System: Secure user authentication and authorization mechanisms.
Database Integration: MongoDB integration for efficient data storage and retrieval.
Upvoting System: Users can upvote their favorite stories.
Responsive Design: Accessible and functional on various devices.

Technologies Used
Frontend:
Vite
React
TypeScript

Backend:
Node.js
Express.js
MongoDB


Prerequisites
Node.js
MongoDB

Getting Started
1.Clone the repository:
git clone <repository-url>
cd story-prompter-app

2.Install dependencies:
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install


3.Configure environment variables:

Create a .env file in the backend directory and add the following:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

4.Start the application:
# Start frontend development server
cd frontend
npm run dev

# Start backend server
cd ../backend
npm run nodemon


5.Access the application:

Open your browser and visit http://127.0.0.1:5173 to use the Story Prompter App.


Contributing
Contributions are welcome! 
