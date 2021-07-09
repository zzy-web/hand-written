function objToUrl (obj, type) {
  let paramsArr = []
  let uri = ''
  let prefix = type == 'Get' ? '?' : ''
  for (let i in obj) {
    paramsArr.push(i + "=" + obj[i])
  }
  if (paramsArr.length) {
    uri = prefix + paramsArr.join("&")
  }
  return uri
}
function ajax (options) {
  let {
    url,
    type,
    data,
    header,
    success,
    fail
  } = options
  type = type.toUpperCase()
  let uri = objToUrl(data, type)

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


  if (type == 'Get') {
    xmlhttp.open(type, url + uri, true);
  } else if (type == 'POST') {
    xmlhttp.open(type, url, true);
  }
  for (let i in header) {
    xmlhttp.setRequestHeader(i, header[i]);
  }
  if (type == 'Get') {
    xmlhttp.send();
  } else if (type == 'POST') {
    console.log({ uri })
    xmlhttp.send("a=2");
  }
}