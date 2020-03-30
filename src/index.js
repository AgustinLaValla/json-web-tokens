const { app } = require('./app');
const colors = require('colors');
require('./database');

//start
async function init() { 
   await app.listen(app.get('port'));
   console.log(`${colors.magenta('Server on port:')} ${colors.green(app.get('port'))}`)
}

init();