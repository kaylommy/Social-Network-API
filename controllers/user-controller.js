const { User, Thought } = require("../models");

module.exports = {
    async getUsers(req, res){
        try {
            const users = await User.find();
            res.json(users);
        }catch (err){
            res.status(500).json(err);
        }
    },
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
    async createUser(req, res){
        try {
            const user = await User.create(req.body);
            res.json(user);
        }catch (err){
            res.status(500).json(err);
        }
    },
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
    async addFriend(req, res){
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId }},
                { runValidators: true, new: true }
            );

        if(!friend){
        return res.status(404).json({ message: 'No user with this id!' });
         }

         res.json(friend);
        }catch (err){
            res.status(500).json(err);
        }
    },
    async deleteFriend(req, res){
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId, friends: req.params.friendId },
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