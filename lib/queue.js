const _ = require('lodash');

const store = {
  'af-prod': undefined,
  'af-staging': undefined,
  'api-prod': undefined,
  'api-staging': undefined,
  'lf-prod': undefined,
  'lf-staging': undefined,
  'mch-prod': undefined,
  'mch-staging': undefined,
  'mp-prod': undefined,
  'mp-staging': undefined,
  'po-prod': undefined,
  'po-staging': undefined
};

// called with `/snag ls`
function listQueues () {
  const queues = _.keys(store);
  return _.reduce(queues, (acc, str) => {
    return `${acc}• ${str}\n`;
  }, '');
}

// called with `/snag help`
function helpText () {
  return 'In space, no one can hear you scream.';
}

// called with `/snag claim RESOURCE`
function claim (resource, username) {
  assignResource(store, username, resource);
  const prettyResource = prettyify(resource);
  return `${prettyResource} is yours for 30 minutes, ${username}.`;
}

// called with `/snag release [OPTIONAL RESOURCE]`
function release (username, resource) {
  releaseResource(store, username, resource);
  if (resource) {
    return `Released ${prettyify(resource)}!`;
  }
  return `Released all yer resources!`;
}

// called with `/snag who RESOURCE`
function whois (resource) {
  const prettyResource = prettyify(resource);
  if (store[resource]) {
    return `${store[resource]} has ${prettyResource}.`;
  }
  return `No one has currently claimed ${prettyResource}.`;
}

// Helper functions
function inStore (store, resource) {
  return _.has(store, resource);
}

function assignResource (store, username, resource) {
  // Happy path
  if (inStore(store, resource) && !store[resource]) {
    store[resource] = username;
    return store;
  }

  // When someone has presently claimed the resource you want
  if (inStore(store, resource) && store[resource]) {
    return `Sorry, ${username}, ${prettyify(resource)} is currently claimed by ${store[resource]}.`;
  }

  // Spelled the resource name incorrectly.
  // todo: Return a string, "did you mean `correctly spelled`?"
  if (!inStore(store, resource)) {
    return `Sorry, ${username}, I don't know what ${prettyify(resource)} is.`;
  }
}

function releaseResource (store, username, resource) {
  if (resource) {
    store[resource] = undefined;
    return store;
  }
  return _.reduce(store, (acc, val, key) => {
    if (store[key] === username) {
      acc[key] = undefined;
    } else {
      acc[key] = val;
    }
    return acc;
  }, {});
}

function prettyify (str) {
  return [str]
    .map((s) => s.replace(/(^.{0,4})/, ($1) => $1.toUpperCase()))
    .map((s) => s.replace('-', ' '))[0];
}

module.exports = {
  assignResource: assignResource,
  inStore: inStore,
  prettyify: prettyify,
  releaseResource: releaseResource,

  claim: claim,
  helpText: helpText,
  listQueues: listQueues,
  release: release,
  whois: whois
};
