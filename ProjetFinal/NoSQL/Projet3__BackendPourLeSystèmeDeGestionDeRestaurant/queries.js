
/*
queries.js
Phase 3: Queries & Aggregations
Uncomment and run each query in mongosh as needed.
*/

/* 1) List all orders placed today. */
//const start = new Date(); start.setHours(0,0,0,0);
//const end = new Date(); end.setHours(23,59,59,999);
//db.orders.find({ order_date: { $gte: start, $lte: end } }, {table_number:1,order_date:1, _id:0}).pretty();

/* 2) Find the details of a menu item by its item_name. */
// db.menu_items.findOne({ item_name: 'Margherita Pizza' });

/* 3) List all ingredients, showing their name and the name of their supplier ($lookup). */
db.ingredients.aggregate([
   { $lookup: { from: 'suppliers', localField: 'supplier_id', foreignField: '_id', as: 'supplier' } },
   { $unwind: { path: '$supplier', preserveNullAndEmptyArrays: true } },
   { $project: { ingredient_name:1, stock_kg:1, 'supplier.supplier_name':1 } }
 ]).pretty();

/* 4) List all menu items that have the 'Vegetarian' tag. */
// db.menu_items.find({ tags: 'Vegetarian' }).pretty();

/* 5) Display all orders placed by a specific customer_id. */
 const custId = ObjectId('68ef6e40d60b8edfa3ce5fa9');
 db.orders.find(
  { customer_id: custId },
  {customer_id:1, order_date:1, total_amount:1, status:1})
  .sort({ order_date: -1 }).pretty();

/* 6) Identify registered customers who have never placed an order ($lookup). */
 db.customers.aggregate([
   { $lookup: { from: 'orders', localField: '_id', foreignField: 'customer_id', as: 'orders' } },
   { $match: { 'orders.0': { $exists: false } } },
   { $project: { customer_name:1, email:1 } }
 ]).pretty();

/* 7) Identify suppliers who do not currently supply any listed ingredients ($lookup). */
 db.suppliers.aggregate([
   { $lookup: { from: 'ingredients', localField: '_id', foreignField: 'supplier_id', as: 'ingredients' } },
   { $match: { 'ingredients.0': { $exists: false } } },
   { $project: { supplier_name:1, contact_email:1 } }
 ]).pretty();

/* 8) Count the number of ingredients provided by each supplier ($group). */
 db.ingredients.aggregate([
   { $group: { _id: '$supplier_id', count: { $sum: 1 } } },
   { $lookup: { from: 'suppliers', localField: '_id', foreignField: '_id', as: 'supplier' } },
   { $unwind: '$supplier' },
   { $project: { supplier_name: '$supplier.supplier_name', ingredient_count: '$count' } }
 ]).pretty();

/* 9) Count the number of times each dish has been sold, across all orders ($unwind, $group). */
 db.orders.aggregate([
   { $unwind: '$line_items' },
   { $group: { _id: '$line_items.item_id', times_sold: { $sum: '$line_items.quantity' }, revenue: { $sum: { $multiply: ['$line_items.quantity','$line_items.unit_price'] } } } },
   { $lookup: { from: 'menu_items', localField: '_id', foreignField: '_id', as: 'menu' } },
   { $unwind: '$menu' },
   { $project: { _id:0,item_name: '$menu.item_name', times_sold:1, revenue:1 } },
   { $sort: { times_sold: -1 } }
 ]).pretty();

/* 10) List customers who have placed more than 5 orders ($group, $match). */
 db.orders.aggregate([
   { $match: { customer_id: { $ne: null } } },
   { $group: { _id: '$customer_id', orders_count: { $sum: 1 } } },
   { $match: { orders_count: { $gt: 5 } } },
   { $lookup: { from: 'customers', localField: '_id', foreignField: '_id', as: 'customer' } },
   { $unwind: '$customer' },
   { $project: { 'customer.customer_name':1, orders_count:1 } }
 ]).pretty();

/* 11) Calculate the total revenue per day ($group, $sum). */
 db.orders.aggregate([
   { $match: { status: { $in: ['Completed','Paid'] } } },
   { $project: { date: { $dateToString: { format: '%Y-%m-%d', date: '$order_date' } }, total_amount:1 } },
   { $group: { _id: '$date', daily_revenue: { $sum: '$total_amount' } } },
   { $sort: { _id: 1}}
 ]).pretty();

/* 12) Find the 5 most profitable dishes ($unwind, $group, $sort, $limit). */
 db.orders.aggregate([
   { $unwind: '$line_items' },
   { $group: { _id: '$line_items.item_id', total_revenue: { $sum: { $multiply: ['$line_items.quantity','$line_items.unit_price'] } }, times_sold: { $sum: '$line_items.quantity' } } },
   { $lookup: { from: 'menu_items', localField: '_id', foreignField: '_id', as: 'menu' } },
   { $unwind: '$menu' },
   { $project: { item_name: '$menu.item_name', total_revenue:1, times_sold:1 } },
   { $sort: { total_revenue: -1 } },
   { $limit: 5 }
 ]).pretty();
