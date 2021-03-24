const data = require('../src/data')
const scheduler = require('../src/scheduler')

let queueLists = scheduler.execute(data.jobs, data.windowStart, data.windowEnd)

queueLists.forEach((queue, index) =>
{
    console.log("Queue ", (index + 1), ": ", queue.toString())
})

