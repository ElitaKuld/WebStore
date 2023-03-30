const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.sendFile("C:\\Users\\bahar\\Documents\\JavaD22-Frontend\\Megastore\\checkoutForm.html")
});

app.listen(8081, () => {
    console.log('Listening on port 8081 ...')
});