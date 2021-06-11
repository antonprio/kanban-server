const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.status(200).json({ status: "up", version: require('express/package').version })
})

app.listen(PORT, () => {
    console.log(`Kanban server running on port ${PORT}`);
})