
/*
modifications.js
Phase 4: Example update operations (commented). Uncomment and run in mongosh.
*/

/* 1) Add a 'New' tag to an existing dish in menu_items */
 db.menu_items.updateOne({ item_name: 'Avocado Toast' }, { $push: { tags: 'New Tag' } });

/* 2) The price of a dish has changed. Update its price field */
db.menu_items.updateOne({ item_name: 'Margherita Pizza' }, { $set: { price: 16.00 } });

/* 3) Update the status of all 'In Progress' orders older than one hour to 'Canceled' */
const oneHourAgo = new Date(Date.now() - 60*60*1000);
db.orders.updateMany({ status: 'In Progress', order_date: { $lt: oneHourAgo } }, { $set: { status: 'Canceled' } });
