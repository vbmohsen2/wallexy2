module.exports = {
  apps: [
    {
      name: 'wallexy2',
      exec_mode: 'cluster',
      instances: '1',
      script: './build/server.js',
      args: 'start',
      time: true
    }
  ]
}
