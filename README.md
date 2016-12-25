# Snag

## Dev Process
In one window, run `VERIFICATION_TOKEN=abc123 PORT=8765 npm start` to start the server. In another window, run `./node_modules/.bin/lt --port 8765 --subdomain snag` to serve the app, so Slack can talk to it. For bonus points, run `npm run dev` to start watching files for linting and test running.

## Docker Shiz

- Run `npm run build` or `docker build -t <yer-name>/snag .` to build the Docker image locally

- Run `npm run serve` or `docker run -p 49160:8888 -d <yer-name>/snag` after building to run the image in detached mode, from port 8888 internally to [49160](http://0.0.0.0:49160) externally.

- `docker ps` to get the Container ID of `<yer-name>/snag`.

- `docker exec -it <container id> /bin/bash` to get into the image

- `docker logs <container id>` to see app logs
