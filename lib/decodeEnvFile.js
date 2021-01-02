"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function decodeEnvFile(contents) {
    const lines = contents.split('\n');
    const env = {};
    for (const line of lines) {
        const [key, value] = line.split('=');
        env[key] = value;
    }
    return env;
}
exports.default = decodeEnvFile;
