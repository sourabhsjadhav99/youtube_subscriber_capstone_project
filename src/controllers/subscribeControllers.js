

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Import the Subscribers model
const Subscribers = require("../models/subscribersModel");

// Helper function for standardized responses
const sendResponse = (res, status, data, message) => {
    res.status(status).json({
        status,
        ...data,
        message,
    });
};

// Fetch all subscribers
const getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscribers.find({});

        if (!subscribers || subscribers.length === 0) {
            return sendResponse(res, 404, {}, "No subscribers found");
        }

        sendResponse(res, 200, { Subscribers: subscribers }, "Subscribers fetched Successfully");
    } catch (error) {
        sendResponse(res, 500, {}, "Internal Server Error");
    }
};

// Fetch subscriber by name and return specific fields
const getSubscriberByName = async (req, res) => {
    try {
        const subscriber = await Subscribers.find({}, { name: 1, _id: 0, subscribedChannel: 1 });

        if (!subscriber || subscriber.length === 0) {
            return sendResponse(res, 404, {}, "No subscribers found");
        }

        sendResponse(res, 200, { Subscriber: subscriber }, "Subscriber fetched Successfully");
    } catch (error) {
        sendResponse(res, 500, {}, "Internal Server Error");
    }
};

// Fetch subscriber by ID
const getSubscriberById = async (req, res) => {
    try {

        // Optional explicit ID validation
        if (!ObjectId.isValid(req.params.id)) {
            return sendResponse(res, 400, {}, "Invalid subscriber ID format");
        }

        const subscriber = await Subscribers.findOne({ _id: req.params.id });

        if (!subscriber) {
            return sendResponse(res, 404, {}, "subscriber not found");
        }

        sendResponse(res, 200, { subscriber }, "subscriber fetched Successfully");
    } catch (error) {
        sendResponse(res, 500, {}, "Internal Server Error");
    }
};

module.exports = {
    getAllSubscribers,
    getSubscriberByName,
    getSubscriberById,
};