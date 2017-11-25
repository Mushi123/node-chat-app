//Jan 1st 1970 at midnight-> Unix epic
const moment=require('moment')
// var d=new Date();
// console.log(d.getMonth());//0 is Jan

//var date=moment();
// date.add(1,'year').subtract(11,'months')
// console.log(date.format('MMM Do, YYYY'));
var some=moment().valueOf();
console.log(some);
var createdAt=12
var date=moment(createdAt)
console.log(date.format('h:mm a'));
