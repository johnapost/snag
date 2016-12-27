const _ = require('lodash');

const store = {
  'af-prod': undefined,
  'af-staging': undefined,
  'api-prod': undefined,
  'api-staging': undefined,
  'impd-prod': undefined,
  'impd-staging': undefined,
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
  const res = assignResource(store, username, resource);
  if (typeof res !== 'string') {
    const prettyResource = prettyify(resource);
    return `${prettyResource} is yours, X. Don't forget to release it with \`/snaggg release ${resource}\` when you're finished.`;
  }
  return res;
}

// called with `/snag release [OPTIONAL RESOURCE]`
function release (username, resource) {
  if (resource) {
    releaseResource(store, username, resource);
    return `Released ${prettyify(resource)}!`;
  }
  releaseResource(store, username);
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

// called with `/snag who`
function all () {
  const claimedResources = _.omitBy(store, _.isNil);
  if (_.size(claimedResources) === 0) {
    return 'All resources are available!';
  }
  return _.reduce(claimedResources, (acc, val, key) => {
    return `${acc}${prettyify(key)}: ${val}\n`;
  }, '');
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
  if (inStore(store, resource) && store[resource] !== username) {
    return `Sorry, ${username}, ${prettyify(resource)} is currently claimed by ${store[resource]}.`;
  }

  // When you try to claim a resource you already have
  if (inStore(store, resource) && store[resource] === username) {
    return `Um, you've already claimed ${prettyify(resource)}, ${username}.`;
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

function resetStore () {
  _.forEach(store, (val, key) => {
    store[key] = undefined;
  });
}

function prettyify (str) {
  const arr = str.split('-');
  return `${_.toUpper(arr[0])} ${_.capitalize(arr[1])}`;
}

module.exports = {
  assignResource: assignResource,
  inStore: inStore,
  prettyify: prettyify,
  releaseResource: releaseResource,
  resetStore: resetStore,

  all: all,
  claim: claim,
  helpText: helpText,
  listQueues: listQueues,
  release: release,
  whois: whois,

  store: store
};
