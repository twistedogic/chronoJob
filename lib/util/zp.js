function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

module.exports = function(input){
    var string = input.toString();
    var thenum = string.replace(/\D+/g, "");
    return pad(thenum, 5) + ':HK';
}