  //start server
  const http = require('http');

  const app =require('./app');

  const port = process.env.PORT || 5000;

  const server = http.createServer(app);


server.listen(port, 'your-app-name.onrender.com', () => {
    console.log(`Server is running on http://netflix_backend.onrender.com:${port}`);
  });
