# Basic e-commerce app with Fauna on Serverless framework

### Run locally
```
$ serverless offline
```

### Deployment
```
$ serverless deploy
```

After deploying, you should see output similar to:

```bash
Deploying sls-fauna-saas-algolia-workshop to stage dev (us-east-1)

✔ Service deployed to stack sls-fauna-saas-algolia-workshop-dev (152s)

endpoint: GET - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/
functions:
  hello: sls-fauna-saas-algolia-workshop-hello (1.9 kB)
  ...
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [http event docs](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/).

### Invocation

After successful deployment, you can call the created application via HTTP:

```bash
curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/
```

Which should result in response similar to the following (removed `input` content for brevity):

```json
{
  "message": "Go Serverless v2.0! Your function executed successfully!",
  "input": {
    ...
  }
}
```
