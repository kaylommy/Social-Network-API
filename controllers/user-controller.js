const { User, Thought } = require("../models");

module.exports = {
    // get all users
    async getUsers(req, res){
        try {
            const users = await User.find();
            res.json(users);
        }catch (err){
            res.status(500).json(err);
        }
    },
    // get one user
    async getSingleUser (req,res){
        try {
            const user = await User.findOne({ _id: req.params.userId });

            if(!user){
                return res.status(404).json({ message: 'no users with that id' });
            }
            res.json(user);
        }catch (err){
            res.status(500).json(err);
        }
    },
    // create user
    async createUser(req, res){
        try {
            const user = await User.create(req.body);
            res.json(user);
        }catch (err){
            res.status(500).json(err);
        }
    },
    //update a user by id
    async updateUser(req, res){
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if(!user){
                return res.status(404).json({ message: 'No user with that id' });
            }
            res.json(user);
        } catch (err){
            console.log(err);
            res.status(500).json(err);
        }
    },
    // delete a user with id
    async deleteUser(req, res) {
        try {
          const user = await User.findOneAndDelete({ _id: req.params.userId });
    
          if (!user) {
            return res.status(404).json({ message: "No user with that ID" });
          }
    
          await Thought.deleteMany({ _id: { $in: user.thoughts } });
          return res.status(200).json({
            message: "User and associated thoughts and reactions deleted!",
          });
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },
      // add a friend 
    async addFriend(req, res){
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId }, // find by userId
                { $addToSet: { friends: req.params.friendId }}, // add the friends userId
                { runValidators: true, new: true } // run validators
            );

        if(!friend){
        return res.status(404).json({ message: 'No user with this id!' });
         }

         res.json(friend);
        }catch (err){
            res.status(500).json(err);
        }
    },
    // delete friend by id
    async deleteFriend(req, res){
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId, friends: req.params.friendId }, // finds by userId and the friends userId
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if(!friend){
                return res.status(400).json({ message: 'No users with this id' });
            }
            res.json(friend);
        } catch (err){
            res.status(500).json(err);
        }
    }
}