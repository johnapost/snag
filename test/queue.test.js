const test = require('ava');
const queue = require('../lib/queue');

test('List all of the queue names', (t) => {
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
  t.deepEqual(queue.listQueues(), queueNames);
});

test('Returns help text', (t) => {
  t.is(queue.helpText(), 'In space, no one can hear you scream.');
});

test('Claim an open resource', (t) => {
  const resource = 'af-prod';
  const username = 'X';
  t.is(queue.claim(resource, username), 'AF Prod is yours for 30 minutes, X.');
});

test('Format the resource name', (t) => {
  const resource = 'af-prod';
  t.is(queue.prettyify(resource), 'AF Prod');
});

// test('test', (t) => {
//   t.is(test(), expectedResult);
// });

// test('test', (t) => {
//   t.is(test(), expectedResult);
// });
