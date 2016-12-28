# Snag

## Dev Process

- Clone repo and run `npm install`.

- In one window, run `VERIFICATION_TOKEN=abc123 PORT=8765 npm run dev-start` to start the server. In another window, run `./node_modules/.bin/lt --port 8765 --subdomain snag` to serve the app, so Slack can talk to it. For bonus points, run `npm run dev` to start watching files for linting and test running.

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
