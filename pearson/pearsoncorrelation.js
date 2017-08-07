/*
 *  Source: http://stevegardner.net/2012/06/11/javascript-code-to-calculate-the-pearson-correlation-coefficient/
 */
function pearsonCorrelation(x, y) {
  
    var shortestArrayLength = 0;
     
    if(x.length == y.length) {
        shortestArrayLength = x.length;
    } else if(x.length > y.length) {
        shortestArrayLength = y.length;
        console.error('x has more items in it, the last ' + (x.length - shortestArrayLength) + ' item(s) will be ignored');
    } else {
        shortestArrayLength = x.length;
        console.error('y has more items in it, the last ' + (y.length - shortestArrayLength) + ' item(s) will be ignored');
    }
  
    var xy = [];
    var x2 = [];
    var y2 = [];
  
    for(var i=0; i<shortestArrayLength; i++) {
        xy.push(x[i] * y[i]);
        x2.push(x[i] * x[i]);
        y2.push(y[i] * y[i]);
    }
  
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_x2 = 0;
    var sum_y2 = 0;
  
    for(var i=0; i< shortestArrayLength; i++) {
        if (x[i] >= 0) { 
          sum_x += "+" + x[i];
        } else {
          sum_x += x[i];
        }  
      
        if (y[i] >= 0) {
          sum_y += "+" + y[i];
        } else {
          sum_y += y[i];
        }
        
        sum_xy += xy[i];
        sum_x2 += x2[i];
        sum_y2 += y2[i];
    }
  
    var evalSumX = eval(sum_x)
        evalSumY = eval(sum_y);

    var step1 = (shortestArrayLength * sum_xy) - (evalSumX * evalSumY);
    var step2 = (shortestArrayLength * sum_x2) - (evalSumX * evalSumX);
    var step3 = (shortestArrayLength * sum_y2) - (evalSumY * evalSumY);
    var step4 = Math.sqrt(step2 * step3);
    var answer = step1 / step4;
  
    return answer;


  // var si = [];

  // for (var key in prefs[p1]) {
  //   if (prefs[p2][key]) si.push(key);
  // }

  // var n = si.length;

  // if (n == 0) return 0;

  // var sum1 = 0;
  // for (var i = 0; i < si.length; i++) sum1 += prefs[p1][si[i]];

  // var sum2 = 0;
  // for (var i = 0; i < si.length; i++) sum2 += prefs[p2][si[i]];

  // var sum1Sq = 0;
  // for (var i = 0; i < si.length; i++) {
  //   sum1Sq += Math.pow(prefs[p1][si[i]], 2);
  // }

  // var sum2Sq = 0;
  // for (var i = 0; i < si.length; i++) {
  //   sum2Sq += Math.pow(prefs[p2][si[i]], 2);
  // }

  // var pSum = 0;
  // for (var i = 0; i < si.length; i++) {
  //   pSum += prefs[p1][si[i]] * prefs[p2][si[i]];
  // }

  // var num = pSum - (sum1 * sum2 / n);
  // var den = Math.sqrt((sum1Sq - Math.pow(sum1, 2) / n) *
  //     (sum2Sq - Math.pow(sum2, 2) / n));

  // if (den == 0) return 0;

  // return num / den;
}