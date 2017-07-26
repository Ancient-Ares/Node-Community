const express = require('express')
const router = express.Router()
const User = require('../models/in_memo/user')
const Topic = require('../models/in_memo/topic')
//localhost:8082/topic
router.route('/')
    .get((req, res, next) => {
        (async () => {
            let topics = await Topic.getTopics()
            return {
                code: 0,
                topics
            }
        })()
        .then(r => {
            res.json(r)
        })
        .catch(e => {
            next(e)
        })
    })
    .post((req, res, next) => {
        (async () => {
            const user = await User.getUserById(Number(req.body.userId))
            let topic = await Topic.createANewTopic({
                creator: user,
                title: req.body.title,
                content: req.body.content
            })
            return {
                code: 0,
                topic
            }
        })()
        .then(r => {
            res.json(r)
        })
        .catch(e => {
            next(e)
        })
    })
//localhost:8082/topic/10000
router.route('/:id')
    .get((req, res, next) => {
        (async () => {
            let topic = await Topic.getTopicById(Number(req.params.id))
            return {
                code: 0,
                topic
            }
        })()
        .then(r => {
            res.json(r)
        })
        .catch(e => {
            next(e)
        })
    })
    .patch((req, res, next) => {
        (async () => {
            const user = await User.getTopicById(req.params.id)
            let topic = await Topic.updateTopicById(Number(req.params.id),{
                creator: user,
                title: req.body.title,
                content: req.body.content
            })
            return {
                code: 0,
                topic
            }
        })()
        .then(r => {
            res.json(r)
        })
        .catch(e => {
            next(e)
        })
    })

//localhost:8082/topic/10000
router.route('/:id/reply')
    .post((req, res, next) => {
        (async () => {
            const user = await User.getUserById(Number(req.body.userId))
            let topic = await Topic.replyATopic({
                topicId: req.params.id,
                creator: user,
                content: req.body.content
            })
            return {
                code: 0,
                topic
            }
        })()
        .then(r => {
            res.json(r)
        })
        .catch(e => {
            next(e)
        })
    })
module.exports = router;
