import { initializeTokenCheatCode } from '../_infrastructure/dependency-injection.container'
import { exec, execSync, spawnSync } from 'child_process'

export async function initializeIntegrationTestEnvironment() {
  await startServer()
  await setFixtures()
  await initializeTokenCheatCode()
}

async function startServer() {
  const pipeName = 'pipe'
  const createPipeCommand = `mkfifo ${pipeName} && cat <${pipeName} &`
  const initializePipeCommand = `cd ../back && yarn start >${pipeName}`
  spawnSync(createPipeCommand)
  exec(initializePipeCommand)
}

async function setFixtures() {
  const resetFixturesCommand = 'cd ../back && yarn fixt:del && yarn fixt:gen'
  execSync(resetFixturesCommand)
}