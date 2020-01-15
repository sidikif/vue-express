const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// const db = 'mongodb://admin:admin123@ds129914.mlab.com:29914/vueexpress' || 'mongodb://localhost:27017/vueexpress'
process.env.NODE_ENV === 'production' ? 
    db = 'mongodb://dev:dev@172.30.254.175:27017/devdb'
    : db = 'mongodb://admin:admin123@ds129914.mlab.com:29914/vueexpress';

// Get Posts
router.get('/', async  (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});
// Add Posts
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});
// Delete Posts
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect
    (db, {
        useNewUrlParser: true
    });
//('mongodb://admin:admin123@ds129914.mlab.com:29914/vueexpress', {
    return client.db('vueexpress').collection('posts');

}

module.exports = router;
