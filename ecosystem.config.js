module.exports = {
  apps: [
    {
      name: 'wallexy',
      exec_mode: 'cluster',
      instances: 'max',
      script: './build/server.js',
      args: 'start',
      time: true
    }
  ]
}
