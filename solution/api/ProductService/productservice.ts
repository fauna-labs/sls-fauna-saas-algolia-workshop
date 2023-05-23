import { Handler, Context, Callback } from 'aws-lambda';
import { Client, QuerySuccess, fql } from "fauna";
import algoliasearch from 'algoliasearch';

interface Response {
  statusCode: number;
  body: string;
}

const FAUNA_API_KEY: string = process.env.FAUNA_API_KEY || "";

const INDEX_NAME = "products"
const ALGOLIA_APP_ID: string = process.env.ALGOLIA_APP_ID || "";
const ALGOLIA_API_KEY: string = process.env.ALGOLIA_API_KEY || "";
const algoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const index = algoliaClient.initIndex(INDEX_NAME);
const ALGOLIA_SEARCH_ONLY_KEY: string = process.env.ALGOLIA_SEARCH_ONLY_KEY || "";


const createProduct: Handler = async (event: any, context: Context, callback: Callback) => {
  const tenantId = event.requestContext.authorizer.lambda.tenantId;

  const body = JSON.parse(event.body);

  let response: Response = {
    statusCode: 200,
    body: ""
  };

  try {
    const db = new Client({
      secret: `${FAUNA_API_KEY}:${tenantId}:admin`
    });
  
    const query = fql`
      product.create({
        'sku': ${body.sku},
        'name': ${body.name},
        'description': ${body.description},
        'price': ${body.price},
        'quantity': ${body.quantity},
        'backorderedLimit': ${body.backorderedLimit},
        'backordered': ${body.quantity < body.backorderedLimit ? true : false}
      }) {
        objectID: .id,
        sku,
        name,
        description,
        price,
        quantity,
        backorderedLimit,
        backordered
      }
    `  
    const res: QuerySuccess<any> = await db.query(query);
    db.close();
    let product: any = res.data;
    product = Object.assign(product, { tenantId: tenantId });
    response.body = JSON.stringify(product);

    index.saveObject(product);

  } catch (err: any) {
    response.statusCode = err.httpStatus;
    response.body = err.message;
  }
  callback(undefined, response);
};


const getProducts: Handler = async (event: any, context: Context, callback: Callback) => {
  console.log(JSON.stringify(event, null, 2));

  const tenantId = event.requestContext.authorizer.lambda.tenantId;

  let response: Response = {
    statusCode: 200,
    body: JSON.stringify("[]")
  };

  try {      
    const find: string = event.queryStringParameters.search || "";
    const searchKey = algoliaClient.generateSecuredApiKey(ALGOLIA_SEARCH_ONLY_KEY, {
      validUntil: Math.floor(Date.now()/1000) + 5,
      filters: `tenantId:${tenantId}`
    })
    const readonlyClient = algoliasearch(ALGOLIA_APP_ID, searchKey);
    const readonlyIndex = readonlyClient.initIndex(INDEX_NAME);
    const searchResults: any = await readonlyIndex.search(find);
    response.body = JSON.stringify(searchResults.hits);
    callback(undefined, response);
    return;
  } catch {
    // revert to default behavior
  }

  try {
    const db = new Client({
      secret: `${FAUNA_API_KEY}:${tenantId}:admin`
    });
  
    const query = fql`
      product.all() {
        id,
        name,
        description,
        sku,
        price,
        quantity,
        backorderedLimit,
        backordered
      }
    `  
    const res: QuerySuccess<any> = await db.query(query);
    db.close();

    response.body = JSON.stringify(res.data.data)

  } catch (err: any) {
    response.statusCode = err.httpStatus;
    response.body = err.message;
  }

  callback(undefined, response);
};


const getProductById: Handler = async (event: any, context: Context, callback: Callback) => {

  let response: Response = {
    statusCode: 200,
    body: JSON.stringify("{}")
  };

  try {
    const db = new Client({
      secret: FAUNA_API_KEY
    });

    const productId: string = event.pathParameters.id || "";
  
    const query = fql`
      product.byId(${productId}) {
        id,
        name,
        description,
        sku,
        price,
        quantity,
        backorderedLimit,
        backordered
      }
    `  
    const res: QuerySuccess<any> = await db.query(query);

    response.body = JSON.stringify(res.data)

  } catch (err: any) {
    response.statusCode = err.httpStatus;
    response.body = err.message;
  }

  callback(undefined, response);
};


export { getProducts, createProduct, getProductById }

