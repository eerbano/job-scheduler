
let validate = {}

validate.execute = (jobs, windowArray) =>
{
    let integrityChecks = []
    validateWindow(windowArray) ? integrityChecks.push(true) : console.warn("There is an invalid time in window frame")
    integrityChecks.push(validateJobs(jobs))
    return (integrityChecks.length === 2) ? true : false
}

const validateJobs = (jobs) =>
{
    let index = 0
    while (index < jobs.length)
    {
        let job = jobs[index]
        let removeJob = false
        if (Object.keys(job).length === 4)
        {
            if (!validDate(job.data_maxima_conclusao))
            {
                console.warn("Job id:", job.id, " have data_maxima_conclusao corrupted")
                removeJob = true
            }
            if (!validNumber(getNumber(job.tempo_estimado)))
            {
                console.warn("Job id:", job.id, " have tempo_estimado corrupted")
                removeJob = true
            }
        }
        else
        {
            console.warn("Job id:", job.id, " object is missing a Key")
            removeJob = true
        }
        if (removeJob)
        {
            jobs.splice(index, 1);
            console.warn("Job id:", job.id, " removed from jobs list")
        }
        else
        {
            index++
        }
    }
    return true
}

const validateWindow = (windowArray) =>
{
    let windowChecks = []
    windowArray.forEach((date) => 
    {
        if (validDate(date))
        {
            windowChecks.push(true)
        }
    });
    return (windowChecks.length === 2) ? true : false
}

const validDate = (date) =>
{
    let isDate = false
    let dateObject = new Date(date)
    if (!isNaN(dateObject.getTime()) && date.length === 19)
    {
        isDate = true
    }
    return isDate
}

const validNumber = (number) =>
{
    let validNum = false
    if (!isNaN(number))
    {
        validNum = true
    }
    return validNum
}
validate.getNumber = (string) =>
{
    let regex = string.match(/\d+/)
    let number = parseInt(regex ? regex[0] : null)
    return number
}


module.exports = validate;