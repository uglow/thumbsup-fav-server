module.exports = {
  apps: [
    {
      name: 'server-prod',
      script: './src/index.js',
      args: "inputDir=/input rebuildCmd='thumbsup --input /input --output /output --config /config/config.json' rebuildDelay=1",
      wait_ready: true,
      listen_timeout: 3000,
      instances: 1,
    },
    {
      name: 'server-local',
      script: './src/index.js',
      args: 'inputDir=./example/input rebuildCmd="./thumbsup.sh"',
      watch: ['src', 'theme-cards-fav'],
      ignore_watch: ['example'],
      wait_ready: true,
      listen_timeout: 3000,
      instances: 1,
    },
  ],
};
