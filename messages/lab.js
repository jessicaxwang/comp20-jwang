function parse() {
  var request = new XMLHttpRequest();
  request.open("GET", "data.json", true);
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      request = request.responseText;
      message = JSON.parse(request);
      elem = document.getElementById("messages");

      output = "";
      for (count = 0; count < message.length; count++) {
        output += "<p>" + message[count].content + ' ' + message[count].username + "</p>";
      }

      elem.innerHTML = output;
    }
  };

  request.send(null);
}