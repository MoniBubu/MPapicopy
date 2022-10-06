function createBadRequestResponse(res, errors) {
    res.status(400).json(errors);
}

function createNotFoundResponse(res, errors) {
    let text = 'Not Found. Errors:\n';
    for (const err of errors.errors) {
        text += `\tParameter ${err.param}: ${err.msg}. Current value: ${err.value}\n`;
    }
    res.status(404).send(text)
}

module.exports = { createBadRequestResponse, createNotFoundResponse };