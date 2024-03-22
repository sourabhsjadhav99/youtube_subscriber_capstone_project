// Import Express and create a router
let express = require("express");
const router = express.Router();

// Use JSON body parser middleware
router.use(express.json());

// Import controller functions for handling routes
let { getAllSubscribers, getSubscriberByName, getSubscriberById } = require("../controllers/subscribeControllers");


// Define routes using the controller functions
router.get("/", getAllSubscribers); // Route to fetch all subscribers

router.get("/names", getSubscriberByName); // Route to fetch subscriber names only

router.get("/:id", getSubscriberById); // Route to fetch subscriber by ID

// Export the router for use in other files
module.exports = router;
