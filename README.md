# Snag

- Run `npm run dev` to set up watchers for testing and linting

- Run `npm start` to serve the app at http://localhost:8888 using nodemon

- Run `docker build -t <yer-name>/snag .` to build the Docker image locally

- `docker run -p 49160:8888 -d chrisbodhi/snag` to run the image in detached mode, from port 8888 internally to 49160 externally

- `docker ps` to get the Container ID of `<yer-name>/snag`.

- `docker exec -it <container id> /bin/bash` to get into the image

- `docker logs <container id>` to see app logs
