# youtube_subscriber_capstone_project
youtube_subscriber_capstone_project using node.js, express.js, mongoDb

### Description
This is a Node.js project built using Express and MongoDB. It provides a RESTful API for managing subscribers to a service, allowing you to perform CRUD operations (Create, Read, Update, Delete) on subscriber data.

###  Prerequisites
Before running this project, ensure you have the following installed:
Node.js
MongoDB
npm (Node Package Manager)

### Installation
Clone the repository to your local machine:

git clone https://github.com/your-username/project-name.git
Navigate to the project directory:

cd project-name
Install dependencies:

npm install

### Configuration
Create a .env file in the root directory of the project.

Add the following environment variables to the .env file:

MONGODB_URL=mongodb://localhost/subscribers
Update the MONGODB_URL with your MongoDB connection URL.


### Running the Application
Start MongoDB server if it's not already running:

mongod
Run the application:

npm start
The application will start running on http://localhost:3000 by default.


### API Endpoints
GET /subscribers: Fetch all subscribers.
GET /subscribers/names: Fetch subscriber names only.
GET /subscribers/:id: Fetch subscriber by ID.
POST /subscribers: Create a new subscriber.
PATCH /subscribers/:id: Update a subscriber by ID.
PUT /subscribers/:id: Update a subscriber by ID (full update).
DELETE /subscribers/:id: Delete a subscriber by ID.

### Usage
You can use tools like Postman or curl to interact with the API endpoints. Here are some example requests:

## Fetch all subscribers:
GET http://localhost:3000/subscribers


## Create a new subscriber:
POST http://localhost:3000/subscribers
Body:
{
  "name": "John Doe",
  "subscribedChannel": "Example Channel",
  "subscribedDate": "2024-04-16T12:00:00Z"
}


## Update a subscriber:
PATCH http://localhost:3000/subscribers/:id
Body:
{
  "name": "Updated Name"
}


## Delete a subscriber:
DELETE http://localhost:3000/subscribers/:id