const router = require('express').Router(); // Import the Router from Express

const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController'); // Import controller methods

// Define routes using the Router
router.route('/')
    .get(getUser) // Route for getting all users
    .post(createUser); // Route for creating a new user

router.route('/:userId')
    .get(getSingleUser) // Route for getting a single user by ID
    .put(updateUser) // Route for updating a user by ID
    .delete(deleteUser); // Route for deleting a user by ID

router.route('/:userId/friends/:friendId')
    .post(addFriend) // Route for adding a friend to a user
    .delete(deleteFriend); // Route for deleting a friend from a user

module.exports = router; // Export the router to use in other files
