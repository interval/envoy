type EnvKeyValues = {
  [name: string]: string
}

export default function decodeEnvFile(contents: string) {
  const lines = contents.split('\n')
  const env: EnvKeyValues = {}
  for (const line of lines) {
    const sepPos = line.indexOf('=')
    const key = line.substring(0, sepPos)
    const value = line.substring(sepPos + 1)
    env[key] = value
  }
  return env
}
