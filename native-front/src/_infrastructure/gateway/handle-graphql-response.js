"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGraphQLResponse = exports.getDataKey = void 0;
function hasErrors(response) {
    return (response === null || response === void 0 ? void 0 : response.errors) || response.data === undefined;
}
function displayErrors(response) {
    if (hasErrors(response)) {
        var formattedError = JSON.stringify(response.errors, null, 2);
        console.error(formattedError);
    }
}
function getDataKey(query) {
    var graphqlDataKeyPattern = /.+?{\s*(.+?)\s*[({]/;
    var dataKey = query.query.match(graphqlDataKeyPattern);
    if (!dataKey)
        throw new Error('Impossible to parse the data key');
    return dataKey[1];
}
exports.getDataKey = getDataKey;
function getResponseData(response, dataKey) {
    if (dataKey === 'signIn') {
        var token = response.data[dataKey].token;
        return token;
    }
    return response.data[dataKey];
}
function handleGraphQLResponse(response, dataKey) {
    displayErrors(response);
    return getResponseData(response, dataKey);
}
exports.handleGraphQLResponse = handleGraphQLResponse;
