declare type EnvKeyValues = {
    [name: string]: string;
};
export default function decodeEnvFile(contents: string): EnvKeyValues;
export {};
