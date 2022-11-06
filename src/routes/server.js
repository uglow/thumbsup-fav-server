const router = require('express').Router();
const { eventBus, EVENT } = require('../eventBus');

module.exports = router;

const activities = {
  rebuildPending: false,
  rebuilding: false,
};

// Health-check
router.get('/', (req, res) => {
  res.send({ message: 'Fav-server is running', activities });
});

router.get('/kill', (req, res) => {
  console.log('Kill process');
  res.send({ message: 'Restarting' });

  setTimeout(() => {
    throw new Error('Restart server');
  }, 1000);
});

// Listen for events, so that healthcheck can report back
eventBus.on(EVENT.REBUILD_PENDING_START, () => {
  activities.rebuildPending = true;
});

eventBus.on(EVENT.REBUILD_PENDING_END, () => {
  activities.rebuildPending = false;
});

eventBus.on(EVENT.REBUILDING_START, () => {
  activities.rebuilding = true;
});

eventBus.on(EVENT.REBUILDING_END, () => {
  activities.rebuilding = false;
});
