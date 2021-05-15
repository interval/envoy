interface EnvironmentVariable {
    name: string;
    validator?: (value: string) => boolean;
    isRequired?: boolean;
}
declare type VarInfo = EnvironmentVariable | string;
export default VarInfo;
