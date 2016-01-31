/****   braintree   *****/

app.get('/client-token', function(req, res) {
  console.log("client-token droping like a bitch");
  gateway.clientToken.generate({}, function (err, response) {
    if (err || !response || !response.clientToken) {
      if (err.name === 'authenticationError') {
        console.error('Please fill in examples/server.js with your credentials from Account->API Keys in your Sandbox dashboard: https://sandbox.braintreegateway.com/');
        console.error('Using a dummy client token... this may or may not work');
        res.send(dummyClientToken);
      } else {
        console.error(err);
        res.send(err);
      }
    } else {
      var clientToken = response.clientToken
      console.log(clientToken);
      res.send(clientToken);
    }
  });
});



app.post('/buy-something', function(req, res) {
  var nonce = req.body.payment_method_nonce;
  console.log("buy-something droping like a bitch");
  console.log(nonce);
  gateway.transaction.sale({
    amount: "1.00",
    paymentMethodNonce: "fake-valid-nonce"
  }, function (err, result) {
    if (err) {
      res.send('error:', err);
    } else {
      res.send('successfully charged $10, check your sandbox dashboard!');
    }
  });
});
