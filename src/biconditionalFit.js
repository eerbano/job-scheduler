const validate = require('./validate');
const normalize = require('./normalize');

let biconditionalFitAlgorithm = {};

const biconditionalFit = (blocks) =>
{
    let orderedBlocks = []
    while (blocks.length > 0)
    {
        let subList = orderBlocks(blocks);
        orderedBlocks.push(subList);
    }
    return orderedBlocks
}

const orderBlocks = (blocks) =>
{
    let subList = []
    let timeLimit = 8
    let index = 0
    while ((timeLimit > 0) && (index < blocks.length))
    {
        let block = blocks[index]
        let blockLength = validate.getNumber(block.tempo_estimado)
        if ((timeLimit - blockLength) >= 0)
        {
            timeLimit = timeLimit - blockLength
            subList.push(block.id)
            blocks.splice(index, 1);
        }
        else
        {
            index++
        }
    }
    return subList
}

biconditionalFitAlgorithm.execute = (blocks, windowStart, windowEnd) =>
{
    let orderedBlocks
    let normalizedBlocks = normalize.execute(blocks, windowStart, windowEnd);

    if (normalizedBlocks)
    {
        orderedBlocks = biconditionalFit(normalizedBlocks);
    }
    return orderedBlocks;
}

module.exports = biconditionalFitAlgorithm;