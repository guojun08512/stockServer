var request = require("request");

var options = { method: 'POST',
  url: 'http://192.144.141.51:8002/v1/stock',
  headers: 
   { 'Postman-Token': '9166c0fc-1b9f-54ba-57f7-25042adbe8eb',
     'Cache-Control': 'no-cache',
     'Content-Type': 'application/json' },
  body: 
   { id: '1',
     name: '上证指数',
     lasted: '6.9376',
     deal: '14073',
     amount: '0.09%',
     begin: '6.9310',
     hightest: '6.9432',
     lowest: '6.9297' },
  json: true };

var start;

function test() {
request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
  start();
}); 
}

start = () => {
  setTimeout(function(){ test() },1000);
}
start();

