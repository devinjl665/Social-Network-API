const router = require('express').Router(); // Import the Router from Express

const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtController'); // Import controller methods

// Define routes using the Router
router.route('/')
    .get(getThought) // Route for getting all thoughts
    .post(createThought); // Route for creating a new thought

router.route('/:thoughtId')
    .get(getSingleThought) // Route for getting a single thought by ID
    .put(updateThought) // Route for updating a thought by ID
    .delete(deleteThought); // Route for deleting a thought by ID

router.route('/:thoughtId/reactions')
    .post(createReaction); // Route for creating a reaction for a thought

router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction); // Route for deleting a reaction from a thought

module.exports = router; // Export the router to use in other files
