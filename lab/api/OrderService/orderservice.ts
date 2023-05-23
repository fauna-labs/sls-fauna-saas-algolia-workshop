import { Handler, Context, Callback } from 'aws-lambda';

interface Response {
  statusCode: number;
  body: string;
}

const createOrder: Handler = async (event: any, context: Context, callback: Callback) => {
  let response: Response = {
    statusCode: 200,
    body: ""
  };

  callback(undefined, response);
};


const getOrders: Handler = async (event: any, context: Context, callback: Callback) => {

  let response: Response = {
    statusCode: 200,
    body: JSON.stringify("[]")
  };

  callback(undefined, response);
};



export { createOrder, getOrders }

