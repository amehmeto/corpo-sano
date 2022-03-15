export type Query = { variables: Record<string, unknown>; query: string }

function hasErrors(response: any) {
  return response?.errors || response.data === undefined
}

function displayErrors(response: any) {
  if (hasErrors(response)) {
    const formattedError = JSON.stringify(response.errors, null, 2)
    console.error(formattedError)
  }
}

export function getDataKey(query: Query) {
  const graphqlDataKeyPattern = /.+?{\s*(.+?)\s*[({]/

  const dataKey = query.query.match(graphqlDataKeyPattern)

  if (!dataKey) throw new Error('Impossible to parse the data key')

  return dataKey[1]
}

function getResponseData(response: any, dataKey: string) {
  if (dataKey === 'signIn') {
    const { token } = response.data[dataKey]
    return token
  }

  return response.data[dataKey]
}

export function handleGraphQLResponse(response: any, dataKey: string) {
  displayErrors(response)
  return getResponseData(response, dataKey)
}
