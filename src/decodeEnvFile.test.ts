const decodeEnvFile = require('../lib/decodeEnvFile').default

it('works w/ a basic example', () => {
  let contents = 'THIS=A\nTHAT=B'
  const resp = decodeEnvFile(contents)
  expect(resp.THIS).toBe('A')
  expect(resp.THAT).toBe('B')
})

it('handles an equals sign in the value', () => {
  let contents = 'THIS=A?ssl=true&something=false\nTHAT=B'
  const resp = decodeEnvFile(contents)
  expect(resp.THIS).toBe('A?ssl=true&something=false')
})
