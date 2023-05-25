# Serverless SaaS With Fauna and Algolia

## Setup

### AWS Named Profile
* Navigate to the IAM services dashboard and create a new user with Administrator access (to provision
  AWS resources).
* Create an "access key" and when done copy its **Access Key** and **Secret Access Key** for the next step, below.
* Create a "named profile" in your AWS CLI's credentials file:
  * Your AWS **config** and **credentials** files are normally in the **~/.aws** folder (Linux/macOS) 
    or **C:&#92;Users&#92; USERNAME &#92;.aws&#92;** (Windows). If you've installed the AWS CLI, 
    you should see them there. For more information about config and credentials file settings see 
    [AWS documentation](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html#cli-configure-files-using-profiles)
  * Edit the `credentials` file by adding the following entry: 
  ```
  [serverless-workshop]
  aws_access_key_id=<<"Access Key" from the previous step>>
  aws_secret_access_key=<<"Secret Access Key" from the previous step>>
  ```

### Serverless Setup

Rename the `.env.json.example` file to `.env.json`
```json
{
    "AWS_PROFILE": "default",
    "AWS_REGION": "us-east-1",
    "ENVIRONMENT": "soln",
    "FAUNA_API_KEY": "<secret>",
    "ALGOLIA_APP_ID": "<app_id>",
    "ALGOLIA_API_KEY": "<api_key>",
    "ALGOLIA_SEARCH_ONLY_KEY": "<search_only_key>",
    "JWKS_URI": "<Auth0_json_web_key_set>"
}
```
...and edit in the variable values with the following:

| Variable                | Description | Example |
| ---                     | ---         | ---     |
| AWS_PROFILE             | named profile name, as you've set it up in the previous step. | serverless-workshop |
| AWS_REGION              | AWS geographic region where the service deploys               | us-east-1 |
| ENVIRONMENT             | Leave this value as-is                                        | soln |
| FAUNA_API_KEY           | The **secret** obtained from Fauna in the previous step       | secret |
| ALGOLIA_APP_ID          | The **Application ID** from Algolia                           | WEASOII0OL |
| ALGOLIA_API_KEY         | The **Admin API Key** from Algolia                            | 327a3g438a9faf02941966f516a7e297 |
| ALGOLIA_SEARCH_ONLY_KEY | The **Search-Only API Key** from Algolia                      | af37gcb35673e19c7af9caac2b3e08c21 |
| JWKS_URI                | The Auth0 **JSON Web Key Set**                                | https://xyz.auth0.com/.well-known/jwks.json |


### Deployment
```
$ serverless deploy
```

After deploying, you should see output similar to:

```bash
Deploying sls-fauna-saas-algolia-workshop to stage soln (us-east-1)

✔ Service deployed to stack sls-fauna-saas-algolia-workshop-soln (152s)

endpoints: 
  GET - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/
  POST - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/product
  GET - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/products
  GET - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/orders
  POST - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/order
functions:
  ...
```

### Client Setup
* Navigate to the [/solution/cliet-multitenant](/solution/client-multitenant) folder
* Create a `.env` file with the necessary environment variables:
    ```
    VITE_APP_APIGATEWAYURL=<API Gateway URL>
    VITE_APP_AUTH0_DOMAIN=<Auth0 Domain>
    VITE_APP_AUTH0_CLIENT_ID=<Auth0 ClientID>
    VITE_APP_API_AUD='https://fauna.demo'
    ```
    ...where:

    | Variable                 | Description | Example |
    | ---                      | ---         | ---     |
    | VITE_APP_APIGATEWAYURL   | The API Gateway URL. Use the value of the first **endpoint** in the output of the deployment step above | https://xxxxxx.execute-api.us-east-1.amazonaws.com |
    | VITE_APP_AUTH0_DOMAIN    | Use the domain part of the JWKS_URI value     | xxxxx.auth0.com |
    | VITE_APP_AUTH0_CLIENT_ID | The Client ID obtained during the Auth0 setup | fMHh99Dxi2ZkJQK3fOPrF1DxnjGkOEEk |
    | VITE_APP_API_AUD         | Use the value "https://fauna.demo"            | https://fauna.demo |

* Run locally 
    ```
    npm run dev
    ```
