interface EnvoyVariableSpec {
  name: string
  validator?: (value: string) => boolean
  isRequired?: boolean
}

type VarInfo = EnvoyVariableSpec | string

export default VarInfo
