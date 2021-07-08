function objToUrl (obj) {
  let paramsArr = []
  let uri = ''
  for (let i in obj) {
    paramsArr.push(i + "=" + obj[i])
  }
  if (paramsArr.length) {
    uri = "?" + paramsArr.join("&")
  }
  return uri
}
function ajax (options) {
  const {
    url,
    type,
    data,
    header,
    success,
    fail
  } = options

  let uri = objToUrl(data)
  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  }
  else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function () {
    console.log(xmlhttp)
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      console.log(typeof JSON.parse(xmlhttp.responseText))
    }
  }



  xmlhttp.open(type, url + uri, true);
  for (let i in header) {
    xmlhttp.setRequestHeader(i, header[i]);
  }
  xmlhttp.send();
}