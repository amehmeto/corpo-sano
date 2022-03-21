import { initializeTokenCheatCode } from '../_infrastructure/dependency-injection.container'
import { exec, execSync, spawnSync } from 'child_process'

const pipeName = 'pipe'

export async function initializeIntegrationTestEnvironment() {
  await startServer()
  await setFixtures()
  await initializeTokenCheatCode()
}

export async function startServer() {
  const createPipeCommand = `mkfifo ${pipeName} && cat <${pipeName} &`
  const initializePipeCommand = `cd ../back && yarn start >${pipeName}`
  spawnSync(createPipeCommand)
  exec(initializePipeCommand)
}

export async function deletePipe() {
  const deletePipeCommand = `cd ../back && rm -rf ${pipeName}`
  exec(deletePipeCommand)
}

async function setFixtures() {
  const resetFixturesCommand = 'cd ../back && yarn fixt:del && yarn fixt:gen'
  execSync(resetFixturesCommand)
}
