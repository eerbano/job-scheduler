const validate = require('./validate');

const biconditionalFit = require('./biconditionalFit')

const scheduler = {};

scheduler.execute = (jobs, windowStart, windowEnd) =>
{
    let orderedJobs = []

    if (validate.execute(jobs, [windowStart, windowEnd]))
    {
        orderedJobs = biconditionalFit.execute(jobs, windowStart, windowEnd);
    }
    return orderedJobs
}

module.exports = scheduler;


