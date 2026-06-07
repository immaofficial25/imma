const fs = require('fs');
const file = 'data/bengalicourse.json';
let data = fs.readFileSync(file, 'utf8');
data = data.replace(/"Thrusday"/g, '"Thursday"');
fs.writeFileSync(file, data);
console.log("Fixed typos.");
