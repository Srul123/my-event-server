const express = require('express');

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
    res.json({msg: 'Welcome to my-event'});
});

// Define routes
app.use("/api/users", require("./routes/users"));
app.use('/api/auth', require('./routes/auth'));
app.use("/api/guests", require("./routes/guests"));
app.use("/api/groups", require("./routes/groups"));



const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));  