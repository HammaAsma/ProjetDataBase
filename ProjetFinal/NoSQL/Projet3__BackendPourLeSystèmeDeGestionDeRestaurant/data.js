
/*
data.js
Phase 2: Generate and insert orders (500) into 'orders' collection.
Depends on setup.js having been run.
*/

print('--- data.js starting ---');

db.orders.drop();

const _menu_items = db.menu_items.find().toArray();
const _customers = db.customers.find().toArray();

function randBetween(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }
function randomChoice(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function randomDateWithinDays(daysBack){
  const now = Date.now();
  const past = now - Math.floor(Math.random()*daysBack*24*3600*1000);
  return new Date(past);
}

const statuses = ['Pending','In Progress','Completed','Paid','Canceled'];
const payment_methods = ['Cash','Card','Online'];

const orders = [];
for(let i=0;i<500;i++){
  const cust = Math.random() < 0.9 ? randomChoice(_customers) : null;
  const numLineItems = randBetween(1,4);
  const lineItems = [];
  let total = 0;
  for(let j=0;j<numLineItems;j++){
    const mi = randomChoice(_menu_items);
    const qty = randBetween(1,3);
    const unitPrice = mi.price;
    const subtotal = Number((unitPrice * qty).toFixed(2));
    lineItems.push({ item_id: mi._id, item_name: mi.item_name, quantity: qty, unit_price: unitPrice, subtotal: subtotal });
    total += subtotal;
  }
  const r = Math.random();
  let status = 'Paid';
  if(r < 0.05) status = 'Canceled';
  else if(r < 0.20) status = 'Pending';
  else if(r < 0.40) status = 'In Progress';
  else if(r < 0.85) status = 'Completed';
  else status = 'Paid';

  const orderDate = Math.random() < 0.05 ? new Date() : randomDateWithinDays(180);

  const order = {
    _id: ObjectId(),
    customer_id: cust ? cust._id : null,
    table_number: Math.random() < 0.6 ? randBetween(1,20) : null,
    order_type: Math.random() < 0.7 ? 'Dine-In' : (Math.random() < 0.5 ? 'Takeaway' : 'Delivery'),
    order_date: orderDate,
    status: status,
    payment_method: randomChoice(payment_methods),
    total_amount: Number(total.toFixed(2)),
    line_items: lineItems,
    created_at: new Date()
  };
  orders.push(order);
}

for(let b=0;b<orders.length;b+=100){
  const batch = orders.slice(b,b+100);
  db.orders.insertMany(batch);
  print('Inserted orders', b, 'to', b+batch.length-1);
}

print('Total orders inserted:', db.orders.countDocuments());
print('--- data.js complete ---');
