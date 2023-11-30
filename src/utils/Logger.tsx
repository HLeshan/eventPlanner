import {isDEV_} from '~/constants';

function logWarn(...message: any[]) {
    if (isDEV_) {
        console.warn(message);
    }
}

function logInfo(...message: any[]) {
    if (isDEV_) {
        console.log(message);
    }
}

function logError(...message: any[]) {
    if (isDEV_) {
        console.error(message);
    }
}

export {logInfo, logError, logWarn};
