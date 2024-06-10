const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    postReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

router.route('/').get(getThoughts).post(createThought);

router
.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

router.route(':/thoughtId/reactions').post(postReaction).delete(deleteReaction);

module.exports = router;