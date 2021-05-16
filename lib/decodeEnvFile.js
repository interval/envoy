"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function decodeEnvFile(contents) {
    const lines = contents.split('\n');
    const env = {};
    for (const line of lines) {
        const sepPos = line.indexOf('=');
        const key = line.substring(0, sepPos);
        const value = line.substring(sepPos + 1);
        env[key] = value;
    }
    return env;
}
exports.default = decodeEnvFile;
