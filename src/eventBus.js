const EventBus = require('js-event-bus');

const eventBus = new EventBus();

const EVENT = {
  REBUILD_PENDING_START: 'favEvent:rebuildPending:start',
  REBUILD_PENDING_END: 'favEvent:rebuildPending:end',
  REBUILDING_START: 'favEvent:rebuilding:start',
  REBUILDING_END: 'favEvent:rebuilding:end',
};

module.exports = {
  eventBus,
  EVENT,
};
