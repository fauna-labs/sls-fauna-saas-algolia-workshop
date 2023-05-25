// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

import { Handler, Context, Callback } from 'aws-lambda';
import { Client, QuerySuccess, fql } from "fauna";
import algoliasearch from 'algoliasearch';

interface Response {
  statusCode: number;
  body: string;
}

const FAUNA_API_KEY: string = process.env.FAUNA_API_KEY || "";

const ALGOLIA_APP_ID: string = process.env.ALGOLIA_APP_ID || "";
const ALGOLIA_API_KEY: string = process.env.ALGOLIA_API_KEY || "";
const algoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const INDEX_NAME = "orders"
const index = algoliaClient.initIndex(INDEX_NAME);
const ALGOLIA_SEARCH_ONLY_KEY: string = process.env.ALGOLIA_SEARCH_ONLY_KEY || "";


const createOrder: Handler = async (event: any, context: Context, callback: Callback) => {
  let response: Response = {
    statusCode: 200,
    body: ""
  };

  try {
    const db = new Client({
      secret: FAUNA_API_KEY
    });

    const body = JSON.parse(event.body);

    const query = fql``

    const res: QuerySuccess<any> = await db.query(query);
    db.close();

    let order: any = res.data;
    response.body = JSON.stringify(order);

    await index.saveObject(order);

  } catch (err: any) {
    response.statusCode = err.httpStatus;
    response.body = err.abort ? err.abort : err.message;
  }
  callback(undefined, response);
};


const getOrders: Handler = async (event: any, context: Context, callback: Callback) => {

  let response: Response = {
    statusCode: 200,
    body: JSON.stringify("[]")
  };

  try {
    const find: string = event.queryStringParameters.search || "";
    const searchKey = algoliaClient.generateSecuredApiKey(ALGOLIA_SEARCH_ONLY_KEY, {
      validUntil: Math.floor(Date.now()/1000) + 5
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
      secret: FAUNA_API_KEY
    });
  
    const query = fql``

    const res: QuerySuccess<any> = await db.query(query);
    db.close();
    response.body = JSON.stringify(res.data.data);    
  } catch (err: any) {
    response.statusCode = err.httpStatus;
    response.body = err.message;
  }
  callback(undefined, response);
};



export { createOrder, getOrders }

