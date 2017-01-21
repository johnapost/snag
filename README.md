# Snag

## Dev Process

- Clone repo and run `npm install`.

- In one window, run `VERIFICATION_TOKEN=abc123 PORT=8765 npm run dev-start` to start the server. In another window, run `./node_modules/.bin/lt --port 8765 --subdomain snag` to serve the app, so Slack can talk to it. For bonus points, run `npm run dev` to start watching files for linting and test running.

- Update the URL to your `lt`-hosted domain under the "Integration Settings" on the [Slash Commands setup page](https://ownlocal.slack.com/services/119939919281). _Remember to switch it back to http://snag.snag.production.ranch.ownlocal.com:8765/slack/receive when you're finished._

- When committing, pre-commit hooks must pass testing, package validation, and linting. To run these individually at any time:
  - `npm test`
  - `npm run lint`
  - `npm run validate`

## Docker Shiz

- To build the Docker image locally, you have to pass in an enviromental variable for Slack's verification token, a la `docker build -t snag --build-arg SNAG_TOKEN=abc123 .`. You can view the built image in a list of all images using `docker images`.

- Run `npm run docker-serve` after building to run the image in detached mode, from port 8888 internally to [49160](http://0.0.0.0:49160) externally.

- `docker ps` to get the Container ID of `snag`.

- `docker exec -it <container id> /bin/bash` to get into the image

- `docker logs <container id>` to see app logs

## Deploying

0. Build the Docker image, a la `docker build -t snag --build-arg SNAG_TOKEN=abc123 .`.

0. Confirm that the app runs, first by running the image [`npm run docker-serve`] and then by checking the logs within the running container.

0. Be sure you have the AWS CLI tool installed.

0. Upload the latest image to AWS's ECS by following the directions on their site, [accessible via the "View Push Commands" button](https://console.aws.amazon.com/ecs/home?region=us-east-1#/repositories/snag#images;tagStatus=ALL). _You can skip any steps related to locally building, since we did that earlier._

0. After pushing the latest build of your Docker image to AWS's ECS, pop over to [Rancher](https://rancher.ownlocal.com).

0. Go to the Stack for [`snag`](https://rancher.ownlocal.com/env/1a7/apps/stacks/1st12) and click the `upgrade` button all the way to the right [up arrow in a circle].

0. On the next screen, click the "Upgrade" button at the bottom of the screen.

0. When it's finished upgrading, the earlier up-arrow-in-a-circle will now be a checkmark-in-a-circle; click it to finish the upgrade process. And that's it!
