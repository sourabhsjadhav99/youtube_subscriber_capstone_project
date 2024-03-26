

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Import the Subscribers model
const Subscribers = require("../models/subscribersModel");

// Helper function for standardized responses
const sendResponse = (res, status, message) => {
    res.status(status).json({
        status,
        message,
    });
};

// ****************Get Methods 
// Fetch all subscribers
const getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscribers.find({});

        if (!subscribers || subscribers.length === 0) {
            return sendResponse(res, 404, "No subscribers found");
        }

        res.status(200).json(subscribers);
    } catch (error) {
        sendResponse(res, 500, "Internal Server Error");
    }
};

// Fetch subscriber by name and return specific fields
const getSubscriberByName = async (req, res) => {
    try {
        const subscribers = await Subscribers.find({}, { name: 1, _id: 0, subscribedChannel: 1 });

        if (!subscribers || subscribers.length === 0) {
            return sendResponse(res, 404, "No subscribers found");
        }

        res.status(200).json(subscribers);
    } catch (error) {
        sendResponse(res, 500, "Internal Server Error");
    }
};


// Fetch subscriber by ID
const getSubscriberById = async (req, res) => {
    try {

        // Optional explicit ID validation
        if (!ObjectId.isValid(req.params.id)) {
            return sendResponse(res, 400, "Invalid subscriber ID format");
        }

        const subscriber = await Subscribers.findOne({ _id: req.params.id });

        if (!subscriber) {
            return sendResponse(res, 404, "subscriber not found");
        }

        res.status(200).json(subscriber);
    } catch (error) {
        sendResponse(res, 500, "Internal Server Error");
    }
};




// ****************Post Method
const addSubscriber = async (req, res) => {
    try {
      const { name, subscribedChannel, subscribedDate } = req.body;
  
      // Validate input fields
      if (!name || !subscribedChannel || !subscribedDate) {
        return sendResponse(res, 400, 'Name and subscribedChannel are required');
      }
  
      const newSubscriber = new Subscribers({ name, subscribedChannel });
      await newSubscriber.save();
  
      res.status(201).json(newSubscriber);
    } catch (error) {
      sendResponse(res, 500, 'Internal Server Error');
    }
  };
  


// ****************Put Method
const updateSubscriber = async (req, res) => {
    try {
      const { name, subscribedChannel, subscribedDate } = req.body;
  
      // Validate input fields
      if (!name || !subscribedChannel || !subscribedDate) {
        return sendResponse(res, 400, 'Name and subscribedChannel are required');
      }
  
      const updatedSubscriber = await Subscribers.findByIdAndUpdate(
        req.params.id,
        { name, subscribedChannel, subscribedDate },
        { new: true } // Return the updated document
      );
  
      if (!updatedSubscriber) {
        return sendResponse(res, 404, 'Subscriber not found');
      }
  
      res.status(200).json(updatedSubscriber);
    } catch (error) {
      sendResponse(res, 500, 'Internal Server Error');
    }
  };


// ****************Patch Method
  const patchSubscriber = async (req, res) => {
    try {
      const { name, subscribedChannel } = req.body;
  
      // Validate input fields
      if (!name && !subscribedChannel) {
        return sendResponse(res, 400, 'At least one field (name or subscribedChannel) is required for update');
      }
  
      const updatedFields = {};
      if (name) updatedFields.name = name;
      if (subscribedChannel) updatedFields.subscribedChannel = subscribedChannel;
  
      const updatedSubscriber = await Subscribers.findByIdAndUpdate(
        req.params.id,
        { $set: updatedFields },
        { new: true } // Return the updated document
      );
  
      if (!updatedSubscriber) {
        return sendResponse(res, 404, 'Subscriber not found');
      }
  
      res.status(200).json(updatedSubscriber);
    } catch (error) {
      sendResponse(res, 500, 'Internal Server Error');
    }
  };
// ****************Delete Method

const deleteSubscriber = async (req, res) => {
  try {
    const subscriber = await Subscribers.findByIdAndDelete(req.params.id);

    if (!subscriber) {
      return sendResponse(res, 404, 'Subscriber not found');
    }
    sendResponse(res, 200, 'Subscriber deleted successfully');
  } catch (error) {
    sendResponse(res, 500, 'Internal Server Error');
  }
};
module.exports = {
    getAllSubscribers,
    getSubscriberByName,
    getSubscriberById,
    addSubscriber,
    deleteSubscriber,
    updateSubscriber,
    patchSubscriber
};