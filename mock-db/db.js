const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.startsWith('db.') && f.endsWith('.json'));

const db = {};

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  Object.assign(db, data);
});

module.exports = db;