const { User, Thought } = require('../models'); // Import User and Thought models

module.exports = {
  
  // Get all users
  getUser(req, res) {
    User.find({})
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  
  // Get a single user by ID with populated thoughts and friends
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("thoughts") // Populate the 'thoughts' field with actual thought documents
      .populate("friends") // Populate the 'friends' field with actual user documents
      .select("-__v") // Exclude the '__v' field from the response
      .then((user) =>
        !user
        ? res.status(404).json({ message: "No user found with that ID..." })
        : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user)) // Respond with the created user object
      .catch((err) => {
        console.log(err); // Log any errors
        return res.status(500).json(err); // Respond with a 500 status and the error message
      });
  },
  
  // Update an existing user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body }, // Update the user with the new data
      { runValidators: true, new: true } // Ensure validators run and return the updated document
    )
      .then((user) =>
        !user
        ? res.status(404).json({ message: "No user found with this ID..." })
        : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user and associated thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId }) // Find and delete the user by ID
      .then((user) =>
        !user
        ? res.status(404).json({ message: "No user found with this ID..." })
        : Thought.deleteMany({ _id: { $in: user.thoughts } }) // Delete all thoughts associated with the user
      )
      .then(() => res.json({ message: "User and associated thoughts deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  
  // Add a friend to a user's friends list
  addFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } }, // Add the friend ID to the user's friends array
      { runValidators: true, new: true } // Ensure validators run and return the updated document
    )
      .then((user) =>
        !user
        ? res.status(404).json({ message: "No user found with this ID..." })
        : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  // Delete a friend from a user's friends list
  deleteFriend(req, res) {
    User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { friends: req.params.friendId } }, // Remove the friend ID from the user's friends array
    { new: true }
    )
    .then(
        (user) =>
        !user
        ? res.status(404).json({ message: "No user found with this ID..." })
        : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
