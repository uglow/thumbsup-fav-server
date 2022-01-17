# Use node 4.4.5 LTS
FROM ghcr.io/thumbsup/thumbsup

# Copy source code
COPY . /app

# Change working directory
WORKDIR /app

# Install dependencies
RUN npm install

# Expose API port to the outside
EXPOSE 8080

# Launch application
ENTRYPOINT ["npm", "start"]
CMD [""]
