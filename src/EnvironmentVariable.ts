interface EnvironmentVariable {
  name: string
  validator?: (value: string) => boolean
  isRequired?: boolean
}

type VarInfo = EnvironmentVariable | string

export default VarInfo
