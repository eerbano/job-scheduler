
let normalize = {}

normalize.buildWindowFrame = (blocks, windowStart, windowEnd) =>
{
    blocks.push({
        id: 0,
        descricao: "start",
        data_maxima_conclusao: windowStart,
        tempo_estimado: "0 horas",
    })
    blocks.push({
        id: 999,
        descricao: "end",
        data_maxima_conclusao: windowEnd,
        tempo_estimado: "0 horas",
    })
}

normalize.sort = (blocks) =>
{
    blocks.sort((a, b) => a.data_maxima_conclusao.localeCompare(b.data_maxima_conclusao))
}

normalize.getBlocksInsideWindow = (blocks) =>
{
    let blocksInsideWindow = []
    let startIndex = 0, endIndex = 0
    blocks.forEach((block, index) =>
    {
        if (block.id === 0)
        {
            startIndex = index + 1
        }
        else if (block.id === 999)
        {
            endIndex = index
        }
    })
    blocksInsideWindow = blocks.slice(startIndex, endIndex)
    if ((blocksInsideWindow.length + 2) < blocks.length) 
    {
        console.warn("There are blocks outside window limits")
    }
    return blocksInsideWindow
}

normalize.execute = (blocks, windowStart, windowEnd) =>
{
    normalize.buildWindowFrame(blocks, windowStart, windowEnd)
    normalize.sort(blocks)
    return normalize.getBlocksInsideWindow(blocks)
}

module.exports = normalize;