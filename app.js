const express = require('express');
const app = express();
const dynamicRoutes = require('./routes/dynamicRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());

// Authentication routes
app.use('/auth', authRoutes);

// Dynamic routes
app.use('/api', dynamicRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
