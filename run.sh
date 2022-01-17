# Note: 'fav-server' is a local build image at the moment
# The /input folder MUST be writeable for this to work

# Using this command "-u $(id -u):$(id -g) \" DOES NOT WORK, because Node is running as "me" ($id), but the
# /tmp folder (which thumbsup uses) was created by the root user - I do not have access.
# Hence, we have to run the container as the root user.

docker run -t \
  -v "$(pwd)/example/input:/input" \
  -v "$(pwd)/example/website:/output" \
  -v "$(pwd)/example/config:/config" \
  -u root \
  -p 8080:8080 \
  fav-server \
  inputDir=/input \
  rebuildCmd="thumbsup --input /input --output /output --config /config/config.json"

