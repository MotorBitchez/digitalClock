let t1 = '5:30';
let t2 = '-3:20';

let d = new Date();
let utcDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds())

function getTimeZonedDate(offset){
  let offsetHour = parseInt(offset.split(':')[0]); 
  let offsetMinute = parseInt(offset.split(':')[1]);
  if (offsetHour < 0) offsetMinute *= -1;
  return new Date(
    utcDate.getFullYear(), 
    utcDate.getMonth(), 
    utcDate.getDate(), 
    utcDate.getHours() + offsetHour, 
    utcDate.getMinutes() + offsetMinute, 
    utcDate.getUTCSeconds()
  );
}

console.log(getTimeZonedDate(t1).getHours().toString());
console.log(getTimeZonedDate(t2).getHours().toString());
console.log(getTimeZonedDate(t2).toString());