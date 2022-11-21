const dotenv = require('dotenv');

dotenv.config({ path: './.env' });
const app = require('./app');

const PORT = process.env.APP_PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server up and running on PORT ${PORT}`);
});
