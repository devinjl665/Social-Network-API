const { User, Thought } = require('../models'); // Import User and Thought models

module.exports = {
    // Get all thoughts
    getThought(req, res) {
      Thought.find({})
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    
    // Get a single thought by ID
    getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
        .select("-__v") // Exclude the '__v' field from the response
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: "No thought found with this ID..." })
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    
    // Create a new thought
    createThought(req, res) {
      Thought.create(req.body)
        .then(({ _id }) => {
        return User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: _id } }, // Add the new thought ID to the user's thoughts array
        { new: true }
        );
        })
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: "No user found with this ID..." })
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    
    // Update an existing thought
    updateThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body }, // Update the thought with the new data
        { runValidators: true, new: true }
      )
        .then((user) =>
        !user
        ? res.status(404).json({ message: "No thought found with this ID..." })
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    
    // Delete a thought by ID
    deleteThought(req, res) {
      Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: "No thought found with this ID..." })
        : User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } }, // Remove the thought ID from the user's thoughts array
            { new: true }
            )
        )
        .then((user) =>
        !user
        ? res.status(404).json({ message: 'Thought deleted, but no user found...'})
        : res.json({ message: 'Thought successfully deleted' })
        )
        .catch((err) => res.status(500).json(err));
    },
    
    // Create a new reaction for a thought
    createReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } }, // Add the new reaction to the thought's reactions array
        { runValidators: true, new: true }
      )
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: "No thought found with this ID..." })
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    
    // Delete a reaction from a thought
    deleteReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } }, // Remove the reaction with the specified ID
        { runValidators: true, new: true }
      )
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: "No thought found with this ID..." })
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
};
