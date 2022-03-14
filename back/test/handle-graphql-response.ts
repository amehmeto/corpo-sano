export type Query = { variables: Record<string, unknown>; query: string }

function hasErrors(response: any) {
  return response?.body?.errors || response.body === undefined
}

function displayErrors(response: any) {
  if (hasErrors(response)) {
    const formattedError = JSON.stringify(response.body, null, 2)
    console.error(formattedError)
  }
}

export function getDataKey(query: Query) {
  const graphqlDataKeyPattern = /.+?{\s*(.+?)\s*[({]/

  const [, dataKey] = query.query.match(graphqlDataKeyPattern)

  return dataKey
}

function getResponseData(response: any, dataKey: string) {
  return response.body && response.body.data
    ? response.body.data[dataKey]
    : 'error somewhere 😱'
}

export function handleGraphQLResponse(
  response: any,
  dataKey: string,
  expectedData: Record<string, unknown> | Array<Record<string, unknown>>,
) {
  displayErrors(response)
  const retrievedData = getResponseData(response, dataKey)
  expect(retrievedData).toStrictEqual(expectedData)
}
