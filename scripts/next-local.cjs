const { spawn } = require('node:child_process')
const path = require('node:path')

const [command, distDir] = process.argv.slice(2)

if (!command) {
  console.error('Usage: node scripts/next-local.cjs <dev|build|start> [distDir]')
  process.exit(1)
}

const nextBin = require.resolve('next/dist/bin/next')
const child = spawn(process.execPath, [nextBin, command], {
  cwd: path.resolve(__dirname, '..'),
  env: {
    ...process.env,
    ...(distDir ? { NEXT_DIST_DIR: distDir } : {}),
  },
  stdio: 'inherit',
})

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }

  process.exit(code || 0)
})
