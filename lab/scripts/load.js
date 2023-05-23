import { products, orders} from './data.js';


async function loadDocuments(collection, data) {  
  try {
    for (const doc of data.data) {
      const res = await fetch(`https://9tij28wnf4.execute-api.us-west-2.amazonaws.com/${collection}`, {
        method: 'POST',
        body: JSON.stringify(doc)
      })
      console.log(await res.json());
    }
  } catch(err) {
    console.log(err);
  }
}

await loadDocuments("product", products);


