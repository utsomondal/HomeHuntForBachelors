# HomeHunt

HomeHunt is a modern property listing platform designed for bachelors. It is a university project for **Software Engineering & System Analysis & Design** at the **World University of Bangladesh (CSE, 8th semester).**

## Features

- **User Authentication**: Secure login and signup using Supabase authentication.
- **Property Listings**: Users can browse properties with filtering and search functionality.
- **Post & Manage Listings**: Users can post properties and manage them through the dashboard.
- **Modern UI**: Built with React, Tailwind CSS, and Framer Motion for smooth animations.
- **Supabase Backend**: PostgreSQL database and Supabase Storage for image uploads.
- **Infinite Scroll**: Efficient browsing experience for property listings.
- **Hosted on Firebase**: Deployed for seamless performance and reliability.

## Target Audience

HomeHunt is specifically designed for **bachelors** looking for rental properties such as shared flats, single rooms, and sublets. The platform aims to simplify property searching for students and working professionals who need affordable and convenient accommodations.

## Tech Stack

- **Frontend**: React 19 (Vite), Tailwind CSS 4, React Router DOM 7, Framer Motion
- **Backend**: Supabase (PostgreSQL, Storage, Authentication)
- **Icons & UI Enhancements**: React Icons, React Toastify
- **Development Tools**: Vite, ESLint
- **Hosting**: Firebase

## Project Structure

```
HomeHunt/
│── src/
│   ├── assets/            # Images and static assets
│   ├── components/        # Reusable React components (Navbar, Footer)
│   ├── pages/             # Main pages (Home, Browse, Login, PostProperty, Signup)
│── public/
│── App.jsx                # Main React component
│── main.jsx               # React entry point
│── supabase.js            # Supabase integration
│── tailwind.config.js     # Tailwind CSS configuration
│── vite.config.js         # Vite configuration
│── .env.local             # Environment variables
│── .gitignore             # Git ignore file
│── README.md              # Project documentation
```

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/homehunt.git
   ```
2. Navigate to the project folder:
   ```sh
   cd homehunt
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up Supabase:
   - Create a Supabase project and get API keys.
   - Configure `supabase.js` with the required credentials.
5. Start the development server:
   ```sh
   npm run dev
   ```
6. Deploy to Firebase:
   - Install Firebase CLI if not already installed:
     ```sh
     npm install -g firebase-tools
     ```
   - Login to Firebase:
     ```sh
     firebase login
     ```
   - Initialize Firebase in the project:
     ```sh
     firebase init
     ```
   - Deploy the project:
     ```sh
     firebase deploy
     ```

## Software Engineering & System Analysis & Design Contributions

- **Requirement Analysis**: Conducted surveys and research to define user needs.
- **System Design**:
  - **Use Case Diagrams**: Designed use cases to model system interactions.
  - **ER Diagrams**: Developed entity-relationship diagrams for the database structure.
  - **Class Diagrams**: Modeled software components and their relationships.
- **Software Development Life Cycle (SDLC)**:
  - Followed Agile methodologies for iterative development.
  - Implemented feature-driven development (FDD) for modular implementation.
- **Testing & Validation**:
  - Conducted unit testing for core functionalities.
  - Performed usability testing with users for feedback and improvements.

## Project Management

- **Development Stages**:

  - Requirement analysis & planning 
  - UI/UX design 
  - Database design 
  - Development & Testing 
  - Deployment & User Testing 
  - Future Enhancements (Ongoing) 

- **Project Contribution**:

  - This project was developed as part of the Software Engineering & System Analysis & Design coursework at the **World University of Bangladesh (CSE, 8th semester).**
  - Key responsibilities include **frontend & backend development, system design, and database integration.**

## Scripts

```sh
npm run dev       # Start the development server  
npm run build     # Build for production  
npm run preview   # Preview the production build  
npm run lint      # Run ESLint  
```

