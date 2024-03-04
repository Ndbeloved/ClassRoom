const paystack = require('paystack')(process.env.SECRET_KEY)
const https = require('https')

const payStack = {

    acceptPayment: async(req, res) => {
      try {
        // request body from the clients
        console.log(req.body)
        const email = req.body.email;
        const amount = req.body.amount;
        const params = JSON.stringify({
          "email": email,
          "amount": amount * 100  //amount in NGN
        })
       
        const options = {
          hostname: 'api.paystack.co',
          port: 443,
          path: '/transaction/initialize',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.SECRET_KEY}`,
            'Content-Type': 'application/json'
          }
        }
    
        const clientReq = https.request(options, apiRes => {
          let data = ''
          apiRes.on('data', (chunk) => {
            data += chunk
          });
          apiRes.on('end', () => {
            return res.status(200).json(data);
          })
        }).on('error', error => {
          console.error(error)
        })
        clientReq.write(params)
        clientReq.end()
        
      } catch (error) {
        // Handle any errors that occur during the request
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
      }
    },
  }
  
  const initializePayment = payStack;
  module.exports = initializePayment;