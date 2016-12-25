const queueNames = [
  'af-prod',
  'af-staging',
  'api-prod',
  'api-staging',
  'lf-prod',
  'lf-staging',
  'mch-prod',
  'mch-staging',
  'mp-prod',
  'mp-staging',
  'po-prod',
  'po-staging'
];

// called with `/snag ls`
function listQueues () {
  return queueNames;
}

// called with `/snag help`
function helpText () {
  return 'In space, no one can hear you scream.';
}

// called with `/snag claim RESOURCE`
function claim (resource, username) {
  const prettyResource = prettyify(resource);
  return `${prettyResource} is yours for 30 minutes, ${username}.`;
}

// Helper functions
function prettyify (str) {
  return [str]
    .map((s) => s.replace(/(^.{0,4})/, ($1) => $1.toUpperCase()))
    .map((s) => s.replace('-', ' '))[0];
}

module.exports = {
  prettyify: prettyify,

  claim: claim,
  helpText: helpText,
  listQueues: listQueues
};
