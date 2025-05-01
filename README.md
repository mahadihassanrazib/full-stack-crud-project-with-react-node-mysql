# Three-Tier MERN Application with React.js, Node.js & MySQL

<img src="./zimages/mern.jpg" alt="MERN Stack" width="100%" height="100%">

## This repository contains a complete three-tier web application built using:

- `Frontend` : React.js with Vite, axios
- `Backend` : Node.js with Express, Sequelize ORM
- `Database` : MySQL (can be hosted or local)

You can deploy this app on any Linux Server , especially AWS EC2 instance , along with a MySQL database (e.g., AWS RDS).

## ✅ Prerequisites
Before proceeding, ensure the following are available:

- A `Linux server` (e.g., Ubuntu on AWS EC2)
- `SSH` access to the server
- `MySQL` database (can be hosted or local with `users` database created)

`.env.example` files for both frontend and backend are present in the repo

## 🚀 Deployment Steps

### 1. Update Your System
```bash
sudo apt update && sudo apt upgrade -y
```
### 2. Install Node.js and npm

<img src="./zimages/node.png" alt="MERN Stack" width="25%" height="100%">

```bash
# Add the NodeSource repository for Node.js:
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
# Replace 18.x with your desired Node.js version:
# For the latest LTS version: setup_18.x
# For the latest current version: setup_20.x

# Install Node.js:
sudo apt install -y nodejs
# Verify the installation:
node -v
npm -v
```
### 3. Install PM2
---
<img src="./zimages/pm2-v4.png" alt="MERN Stack" width="100%" height="100%">




```bash
# Install PM2 globally:
sudo npm install pm2@latest -g
# Verify the installation:
pm2 --version
```
### 4. Clone the Repository
```bash
git clone https://github.com/mahadihassanrazib/full-stack-crud-project-with-react-node-mysql.git

# Navigate to the project directory:
cd full-stack-crud-project-with-react-node-mysql
```

### 5. Configure and Run Backend `API` Server 🏗️
```bash
# Navigate to the backend directory:
cd server

# Install dependencies:
npm install

# Create and edit the .env file:
cp .env.example .env

sudo nano .env

# Update the following environment variables according to your MySQL database configuration:
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_DATABASE=

# Save and exit (`Ctrl + X`, then `Y`, then `Enter`).

# Start the backend server using PM2:
pm2 start index.js --name api-server --watch --env PORT=3000

# To view status:
pm2 status

# To view logs:
pm2 log api-server
```

### 6. Configure and Run Frontend `React` App 🌐
```bash
# Navigate to the frontend directory:
cd ../frontend

# Install dependencies:
npm install

# Create and edit the .env file:
cp .env.example .env

sudo nano .env

# Update the following variable to point to your backend API URL:
VITE_API_URL=http://your-backend-server-ip:3000

# Save and exit (`Ctrl + X`, then `Y`, then `Enter`).

# Start the frontend development server using PM2:
pm2 start npm --name "react-app" -- run dev -- --host 0.0.0.0

# To view status:
pm2 status

# To view logs:
pm2 log react-app
```

### 7. Access the Application 🔍
Once everything is running:

- Your backend API will be accessible at:
http://your-server-ip:3000
- Your frontend app will be accessible at:
http://your-server-ip:5000 (or whatever port Vite uses – check logs)

⚠️ Make sure appropriate ports (`3000`, `5000`) are open on your firewall or `AWS EC2 security group`.

### 8. Check Running Processes 🧪
```bash
pm2 list

# To stop or restart services:
pm2 stop api-server

pm2 restart react-app
```

### 9. Optional: Setup PM2 to Start on Boot 🧹
```bash
# Run this command to generate startup script:
pm2 startup
# Then follow the instruction printed in the terminal (copy & paste the provided command).

# Finally save current processes:
pm2 save
```

### 10. Additional Notes 📦
- Ensure your `MySQL database is accessible` from your EC2 instance (especially if using AWS RDS).
- You can use `Nginx` as a reverse proxy for production deployment.
- For better performance, build the frontend for production:
```bash
npm run build
# one dist folder will be created in frontend directory
```

# Contributing 🤝
### Feel free to contribute or report issues to improve this setup guide!

## License 📄
MIT License – see `LICENSE` for details.

### Let me know if you'd like a version of this README with commands for setting up Nginx, domain SSL, or Docker support.

## Happy Coding! 🎉
### Modify Author: [Mahadi Hassan Razib]
#### Project Credit: [`Mushfiqur Rahman`] (https://github.com/nia3zzz)