const _ = require('lodash');
const test = require('ava');

const queue = require('../lib/queue');
const help = require('../lib/help_text');

test.afterEach((t) => {
  queue.resetStore();
});

test('List all of the queue names', (t) => {
  const queueNames = '• af-prod\n• af-staging\n• api-prod\n• api-staging\n• impd-prod\n• impd-staging\n• lf-prod\n• lf-staging\n• mch-prod\n• mch-staging\n• mp-prod\n• mp-staging\n• po-prod\n• po-staging\n';

  t.is(queue.listQueues(), queueNames);
});

test('Returns help text', (t) => {
  t.is(queue.helpText(), help);
});

test('Claim an open resource', (t) => {
  const resource = 'af-prod';
  const username = 'X';

  t.is(queue.claim(resource, username), `AF Prod is yours, X. Don't forget to release it with \`/snaggg release ${resource}\` when you're finished.`);
});

test('Format the resource name', (t) => {
  const afProd = 'af-prod';
  t.is(queue.prettyify(afProd), 'AF Prod');

  const mchStaging = 'mch-staging';
  t.is(queue.prettyify(mchStaging), 'MCH Staging');
});

test('Resource name is in the store', (t) => {
  const resource = 'af-prod';
  const store = {'af-prod': undefined};

  t.true(queue.inStore(store, resource));
});

test('Resource name is not in the store', (t) => {
  const resource = 'af-pr00d';
  const store = {'af-prod': undefined};

  t.false(queue.inStore(store, resource));
});

test('Add a username to the resource store', (t) => {
  const store = {'af-prod': undefined};
  const username = 'X';
  const resource = 'af-prod';

  t.is(queue.assignResource(store, username, resource)[resource], username);
});

test('Returns a message when resource store is spelled incorrectly', (t) => {
  const store = {'af-prod': undefined};
  const username = 'X';
  const resource = 'af-prdo';

  t.is(queue.assignResource(store, username, resource), 'Sorry, X, I don\'t know what AF Prdo is.');
});

test('Returns a message when resource store is already claimed', (t) => {
  const store = {'af-prod': 'Y'};
  const username = 'X';
  const resource = 'af-prod';

  t.is(queue.assignResource(store, username, resource), 'Sorry, X, AF Prod is currently claimed by Y.');
});

test('Releases the specified resource', (t) => {
  const store = {'af-prod': 'X'};
  const username = 'X';
  const resource = 'af-prod';

  t.falsy(queue.releaseResource(store, username, resource)[resource]);
});

test('Releases all resources claimed by the user', (t) => {
  const store = {'af-prod': 'X', 'mp-prod': 'X', 'po-staging': 'Z'};
  const username = 'X';
  const updatedStore = queue.releaseResource(store, username);

  t.false(_(updatedStore).values().includes(username));
});

test('List who has claimed a resource', (t) => {
  const username = 'X';
  const resource = 'af-prod';
  queue.assignResource(queue.store, username, resource);

  t.is(queue.whois(resource), 'X has AF Prod.');
});

test('Note when no resources have been claimed', (t) => {
  t.is(queue.all(), 'All resources are available!');
});

test('List all claimed resources', (t) => {
  const username = 'X';
  const resource = 'af-prod';
  queue.assignResource(queue.store, username, resource);

  t.is(queue.all(), 'AF Prod: X\n');
});

// test('test', (t) => {
//   t.is(test(), expectedResult);
// });
