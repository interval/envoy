interface EnvoyVariableSpec {
    name: string;
    validator?: (value: string) => boolean;
    isRequired?: boolean;
}
declare type VarInfo = EnvoyVariableSpec | string;
export default VarInfo;
