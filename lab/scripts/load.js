// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

import { products, orders} from './data.js';

async function loadDocuments(collection, data) {  
  try {
    for (const doc of data.data) {
      const res = await fetch(`http://localhost:3000/${collection}`, {
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


