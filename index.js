const app = require('./app/app');
const port = 3000;

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});
