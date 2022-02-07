const path = require('path');

const apiVersion = process.env.APIVERSION || "v1";
const endPointPrefix = '/API/' + apiVersion + '/';

global.pathStorage = path.resolve('../');
global.pathRoot = path.resolve('./');
global.pathComponents = path.join(pathRoot, 'src/components')
global.pathAsset = path.join(pathRoot, 'public');
global.pathEventParticipant = path.join(pathAsset, 'event_participant');

function getEndPoint() {
    return endPointPrefix;
}

function getPath() {
    return path.resolve(__dirname);
}

module.exports = {
    getEndPoint,
    getPath
}