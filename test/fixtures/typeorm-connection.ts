import { ConnectionOptions, createConnection } from 'typeorm'
import { config } from '../../config'
import { generateFixtures } from './generate.fixtures'

const dbConfig = {
  ...config.db,
}
;(async function () {
  const connection = await createConnection(dbConfig as ConnectionOptions)
  await generateFixtures(connection)
})()
