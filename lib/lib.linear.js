var getYValue = function(Information, X){
  const slope = (Information.Yb - Information.Ya) / (Information.Xb - Information.Xa)

  //Calculate b if the linear function cut doesn't the origin  
  const b = (Information.Xa || Information.Ya) ? Information.Ya - slope * Information.Xa : 0

  return X * slope + b  
}

var getXValue = function(Information, Y){
  const slope = (Information.Yb - Information.Ya) / (Information.Xb - Information.Xa)

  //Calculate b if the linear function cut doesn't the origin  
  const b = (Information.Xa || Information.Ya) ? Information.Ya - slope * Information.Xa : 0
  return (Y - b) / slope
}

module.exports = {
  "getYValue" : getYValue,
  "getXValue" : getXValue,
}
