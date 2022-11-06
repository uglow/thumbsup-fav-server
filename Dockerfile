# Use node 4.4.5 LTS
FROM ghcr.io/thumbsup/thumbsup

# Copy source code
COPY . /app

# Change working directory
WORKDIR /app

# Install dependencies
RUN npm install --production

# Install PM2 globally
RUN npm install pm2 -g

# Install patches over the top(add mpg support)
COPY ./patch /

# Expose API port to the outside
EXPOSE 8080

# Launch application
# ENTRYPOINT ["npm", "start"]
CMD ["pm2-runtime", "pm2.config.js", "--only", "server-prod"]
