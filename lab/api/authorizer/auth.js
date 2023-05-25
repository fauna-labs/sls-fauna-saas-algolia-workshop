const AuthPolicy = require('aws-auth-policy');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const JWKS_URI = process.env.JWKS_URI;

const keyClient = jwksClient({
  cache: true,
  cacheMaxAge: 86400000, //value in ms
  rateLimit: true,
  jwksRequestsPerMinute: 10,
  strictSsl: true,
  jwksUri: JWKS_URI
})

function getSigningKey(header = decoded.header, callback) {
  keyClient.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  })
}

const verificationOptions = {
  // verify claims, e.g.
  // "audience": "urn:audience"
  "algorithms": "RS256"
}

module.exports.handler = (event, context, callback) => {
  if (!event.headers.authorization || event.headers.authorization.split(' ')[0] != 'Bearer') {
    callback("Unauthorized");
    return;
  }

  const arnParts = event.routeArn.split(':');
  const apiGatewayArnPart = arnParts[5].split('/');
  const awsAccountId = arnParts[4];
  const apiOptions = {
    region: arnParts[3],
    restApiId: apiGatewayArnPart[0],
    stage: apiGatewayArnPart[1]
  };

  const token = event.headers.authorization.split(' ')[1];

  jwt.verify(token, getSigningKey, verificationOptions, (err, jwt) => {
    if (err) {
      console.log(err);
      callback("Unauthorized");
    } else {
      console.log(jwt);

      const policy = new AuthPolicy(jwt.sub, awsAccountId, apiOptions);
      policy.allowAllMethods();
      let builtPolicy = policy.build();

      builtPolicy.context = {
        tenantId: jwt.tenantId
      }
      console.log(JSON.stringify(builtPolicy));

      callback(undefined, builtPolicy);
    }
  })
}