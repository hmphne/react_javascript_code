FROM node
# Add a work directory
# WORKDIR /app
# Cache and Install dependencies
COPY package.json .

# Copy app files
COPY . .
# Build
EXPOSE 3000
# Start the app
CMD ["npm", "start"]