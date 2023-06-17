# nextjs-chatapp

Basic real-time chat application with Next.js and Socket.io

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing.

### Used in the App
- Next.js
- Typescript
- Tailwind
- PostgreSQL
- Socket.io

### Prerequisites

Before starting, make sure you have the following installed on your system:

- <a href="https://nodejs.org/">Node.js</a>
- <a href="https://www.postgresql.org/">PostgreSQL</a>

### Installing
#### A- Client deps
1. Clone the repository:
   ```bash
   git clone https://github.com/imadfen/nextjs-chatapp.git
   
2. Navigate to the project directory
   ```bash
   cd nextjs-chatapp
   
3. Install dependencies
   ```bash
   npm install

#### B- WebSocket deps
1. Navigate to the WebSocket directory
   ```bash
   cd WebSocket
   
2. Install dependencies
   ```bash
   npm install

#

### Set up the PostgreSQL database:

Install PostgreSQL on your system if you haven't already (https://www.postgresql.org/download/).
Create a new PostgreSQL database for this project.
# Configure the database connection:

Open the prisma/schema.prisma file and replace the connection details in url with your PostgreSQL database configuration:

    datasource db {
      provider = "postgresql"
      url      = "postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    }

Migrate the database:
      
    npx prisma migrate dev

# Start the application
you need to start both WebSocket server and Next.js application in separate shells:

1- WebSocket server
      
    nodemon server.ts

2- Next.js application

    npm start

#

The application should now be running locally. Open your browser and visit http://localhost:3000 to see it in action.
