module.exports = {
  apps: [{
    name: 'formelissa-website',
    script: './node_modules/.bin/next',
    args: 'start',
    cwd: '/var/www/cute_web',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};


