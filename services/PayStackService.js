const paystack = require('paystack')(process.env.SECRET_KEY)
const https = require('https')

const payStack = {

    acceptPayment: async(req, res, amount, email) => {
      return new Promise((resolve, reject) => {
        try {
          const params = JSON.stringify({
            "email": email,
            "amount": amount * 100,  //amount in NGN
            "metadata": {
              "custom_fields": [
                {
                  "receiver": "Gozie322555"
                }
              ]
            }
          });
    
          const options = {
            hostname: 'api.paystack.co',
            port: 443,
            path: '/transaction/initialize',
            method: 'POST',
            headers: {
              Authorization: `Bearer ${process.env.SECRET_KEY}`,
              'Content-Type': 'application/json'
            }
          };
    
          const clientReq = https.request(options, apiRes => {
            let data = '';
            apiRes.on('data', (chunk) => {
              data += chunk;
            });
            apiRes.on('end', () => {
              resolve(data);
            });
          }).on('error', error => {
            reject(error);
          });
    
          clientReq.write(params);
          clientReq.end();
        } catch (error) {
          reject(error);
        }
      });
    },

    //verifies if payment was successful
    verifyPayment: async(reference)=>{
      return new Promise((resolve, reject) => {
        try{
            const options = {
              hostname: 'api.paystack.co',
              port: 443,
              path: `/transaction/verify/${reference}`,
              method: 'GET',
              headers: {
                Authorization: `Bearer ${process.env.SECRET_KEY}`
              }
            }
      
            const apiReq = https.request(options, (apiRes) => {
              let data = '';
        
              apiRes.on('data', (chunk) => {
                data += chunk;
              });
        
              apiRes.on('end', () => {
                resolve(data)
              });
            });
        
            apiReq.on('error', (error) => {
              reject(error);
            });
        
            // End the request
            apiReq.end();
            
          } catch (error) {
              // Handle any errors that occur during the request
             reject(error)
          }
      });
    }
  }
  
  const initializePayment = payStack;
  module.exports = initializePayment;