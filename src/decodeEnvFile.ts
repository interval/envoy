type EnvKeyValues = {
  [name: string]: string
}

export default function decodeEnvFile(contents: string) {
  const lines = contents.split('\n')
  const env: EnvKeyValues = {}
  for (const line of lines) {
    const [key, value] = line.split('=')
    env[key] = value
  }
  return env
}
