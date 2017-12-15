let TOPIX_ID_INIT = 10000
const topics = []
class Topic {
    constructor(params) {
        if(!params.creator) throw {code: -1, msg: "a topic must be sent by a user"}
        if(!params.title) throw {code: -1, msg: "a topic must be contain a title"}
        if(params.content.length < 5) throw {code: -1, msg: "a topic's content must be longer than 5 charaters"}
        this._id = TOPIX_ID_INIT++
        this.title = params.title
        this.content = params.content
        this.replyList = []
    }

}
async function createANewTopic(params) {
    const topic = new Topic(params)
    topics.push(topic)
}
async function getTopics(params) {
    return topics
}
async function getTopicById(topicId) {
    return topics.find(u => u._id === topicId)
}
async function updateTopicById(topicId, update) {
    const topic = topics.find(u => u._id === topicId)
    if(update.creator) topic.creator = update.user.name
    if(update.title) topic.title = update.title
    if(update.content) topic.content = update.content
    return topic
}
async function replyATopic(params) {
    const topic = topics.find(t => Number(params.topicId) === t._id)
    topic.replyList.push({
        creator: params.creator,
        content: params.content,
    })
    return topic
}
module.exports = {
    mode: Topic,
    createANewTopic,
    getTopics,
    getTopicById,
    updateTopicById,
    replyATopic
}