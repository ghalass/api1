# #!/bin/bash
# set -e

# echo "Deployment started ..."


# # Make sure NVM is available
# export NVM_DIR="$HOME/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# # Pull the latest version of the app
# git pull origin main # Your branch name
# echo "New changes copied to server !"

# # Installing Dependencies
# echo "Installing Dependencies..."
# npm install --yes

# # Restarting server
# echo "Restarting server"
# pm2 restart api1

# echo "Deployment Finished!"


#!/bin/bash
set -e

echo "Deployment started ..."

# Make sure NVM is available
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Pull the latest version of the app
git pull origin main
echo "New changes copied to server !"

# Installing Dependencies
echo "Installing Dependencies..."
npm install --yes

# Run Prisma migrations
echo "Applying Prisma migrations..."
npx prisma migrate deploy

# Regenerate Prisma client
echo "Regenerating Prisma client..."
npx prisma generate

# Optionally run seed
# echo "Seeding database..."
# npx prisma db seed

# Restarting server
echo "Restarting server"
pm2 restart api1

echo "Deployment Finished!"
