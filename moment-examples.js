var moment = require('moment');
var now = moment();

//console.log(now.format());
//console.log(now.format('MMM Do YYYY, h:mma'));
//console.log(now.format('X'));
//console.log(now.valueOf()); //valueOf converts the string to number

var timestamp = 1485057174251;
var timestampMoment = moment.utc(timestamp);
console.log(timestampMoment.local().format('h:mma'));
