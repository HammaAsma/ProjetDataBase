
/*
setup.js
Phase 1: Create & populate reference collections:
  suppliers, ingredients, menu_items, customers

Run in mongosh:
  load('setup.js')
or
  mongosh setup.js
*/

print('--- setup.js starting ---');

db.suppliers.drop();
db.ingredients.drop();
db.menu_items.drop();
db.customers.drop();

// ---------- Suppliers (10) ----------
const suppliers = [
  { _id: ObjectId(), supplier_name: 'The Local Garden', contact_email: 'contact@localgarden.com', phone: '+212600111001', address: '12 Olive St' },
  { _id: ObjectId(), supplier_name: 'FreshFields Produce', contact_email: 'sales@freshfields.com', phone: '+212600111002', address: '22 Market Ave' },
  { _id: ObjectId(), supplier_name: 'Oceanic Seafood', contact_email: 'orders@oceanic-sea.com', phone: '+212600111003', address: 'Pier 7' },
  { _id: ObjectId(), supplier_name: 'DairyBest Co', contact_email: 'hello@dairybest.com', phone: '+212600111004', address: '5 Ranch Rd' },
  { _id: ObjectId(), supplier_name: 'SpiceRoute Imports', contact_email: 'info@spiceroute.com', phone: '+212600111005', address: 'Spice Bazaar' },
  { _id: ObjectId(), supplier_name: 'Bread & Beyond', contact_email: 'bakery@breadbeyond.com', phone: '+212600111006', address: 'Baker St 9' },
  { _id: ObjectId(), supplier_name: 'ProteinPoint Meats', contact_email: 'meats@proteinpoint.com', phone: '+212600111007', address: 'Butcher Ln' },
  { _id: ObjectId(), supplier_name: 'Herbivore Greens', contact_email: 'green@herbivore.com', phone: '+212600111008', address: 'Greenway' },
  { _id: ObjectId(), supplier_name: 'Frozen Supplies Ltd', contact_email: 'cold@frozen.supplies', phone: '+212600111009', address: 'Cold Storage' },
  { _id: ObjectId(), supplier_name: 'Citrus World', contact_email: 'contact@citrusworld.com', phone: '+212600111010', address: 'Citrus Ave' }
];

db.suppliers.insertMany(suppliers);
print('Inserted suppliers:', db.suppliers.countDocuments());

// ---------- Ingredients (50) ----------
const ingredientNames = [
  'Tomato','Onion','Garlic','Olive Oil','Basil','Mozzarella','Flour','Sugar','Salt','Black Pepper',
  'Chicken Breast','Beef Mince','Pork Belly','Salmon Fillet','Shrimp','Lettuce','Cucumber','Carrot','Potato','Egg',
  'Milk','Cream','Butter','Parmesan','Baking Powder','Yeast','Rice','Pasta','Lemon','Orange',
  'Mushroom','Bell Pepper','Spinach','Feta Cheese','Oregano','Chili Powder','Coriander','Ginger','Soy Sauce','Vinegar',
  'Honey','Maple Syrup','Walnut','Almond','Sesame Seeds','Cocoa Powder','Dark Chocolate','Coffee','Tea','Vanilla'
];

function randBetween(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }

const suppliersList = db.suppliers.find().toArray();

const ingredients = ingredientNames.map((name, idx)=>({
  _id: ObjectId(),
  ingredient_name: name,
  stock_kg: Number((Math.random()*50 + 1).toFixed(2)),
  unit: (['kg','liters','pieces'][idx % 3]),
  supplier_id: suppliersList[idx % suppliersList.length]._id,
  cost_per_kg: Number((Math.random()*10 + 0.5).toFixed(2))
}));

db.ingredients.insertMany(ingredients);
print('Inserted ingredients:', db.ingredients.countDocuments());

// ---------- Menu Items (40) ----------
const menuItemsData = [
  { item_name: 'Margherita Pizza', description: 'Tomato sauce, mozzarella, fresh basil.', price: 12.50, category: 'Main Course', tags: ['Vegetarian','Popular'], cost_estimate: 4.50 },
  { item_name: 'Pepperoni Pizza', description: 'Spicy pepperoni, mozzarella, tomato sauce.', price: 14.00, category: 'Main Course', tags: ['Popular'], cost_estimate: 5.00 },
  { item_name: 'Caesar Salad', description: 'Romaine lettuce, croutons, parmesan, Caesar dressing.', price: 9.00, category: 'Salad', tags: ['Classic'], cost_estimate: 2.50 },
  { item_name: 'Greek Salad', description: 'Tomato, cucumber, feta, olives.', price: 9.50, category: 'Salad', tags: ['Vegetarian'], cost_estimate: 3.00 },
  { item_name: 'Grilled Salmon', description: 'Pan-seared salmon with lemon butter.', price: 18.00, category: 'Main Course', tags: ['Seafood'], cost_estimate: 7.50 },
  { item_name: 'Beef Burger', description: '100% beef patty, lettuce, tomato, special sauce.', price: 11.50, category: 'Main Course', tags: ['Popular'], cost_estimate: 4.00 },
  { item_name: 'Chicken Alfredo Pasta', description: 'Creamy Alfredo sauce with grilled chicken.', price: 13.50, category: 'Main Course', tags: ['Comfort'], cost_estimate: 5.25 },
  { item_name: 'Mushroom Risotto', description: 'Creamy risotto with mixed mushrooms.', price: 12.00, category: 'Main Course', tags: ['Vegetarian'], cost_estimate: 3.75 },
  { item_name: 'French Fries', description: 'Crispy golden fries.', price: 4.50, category: 'Side', tags: ['Vegan'], cost_estimate: 0.80 },
  { item_name: 'Garlic Bread', description: 'Toasted bread with garlic butter.', price: 3.50, category: 'Starter', tags: ['Vegetarian'], cost_estimate: 0.90 },
  { item_name: 'Tiramisu', description: 'Coffee-flavored Italian dessert.', price: 6.50, category: 'Dessert', tags: ['Popular'], cost_estimate: 1.80 },
  { item_name: 'Chocolate Lava Cake', description: 'Warm cake with molten center.', price: 7.00, category: 'Dessert', tags: ['Vegetarian'], cost_estimate: 2.20 },
  { item_name: 'Lemonade', description: 'Freshly squeezed lemons.', price: 3.00, category: 'Beverage', tags: ['Vegan'], cost_estimate: 0.30 },
  { item_name: 'Espresso', description: 'Strong black coffee shot.', price: 2.50, category: 'Beverage', tags: ['Popular'], cost_estimate: 0.15 },
  { item_name: 'Chicken Wings', description: 'Spicy wings with dip.', price: 10.00, category: 'Starter', tags: ['Popular'], cost_estimate: 3.00 },
  { item_name: 'Veggie Wrap', description: 'Grilled veggies with hummus.', price: 8.50, category: 'Main Course', tags: ['Vegetarian'], cost_estimate: 2.80 },
  { item_name: 'Shrimp Tacos', description: 'Tacos with spiced shrimp.', price: 12.00, category: 'Main Course', tags: ['Seafood'], cost_estimate: 4.20 },
  { item_name: 'Pancakes Stack', description: 'Three pancakes with maple syrup.', price: 7.50, category: 'Dessert', tags: ['Breakfast'], cost_estimate: 1.50 },
  { item_name: 'Greek Yogurt Parfait', description: 'Yogurt, granola, honey.', price: 5.50, category: 'Dessert', tags: ['Healthy','Vegetarian'], cost_estimate: 1.00 },
  { item_name: 'Avocado Toast', description: 'Smashed avocado on sourdough.', price: 8.00, category: 'Starter', tags: ['Vegetarian','Healthy'], cost_estimate: 2.00 },
  { item_name: 'BBQ Ribs', description: 'Slow-cooked ribs with BBQ sauce.', price: 19.00, category: 'Main Course', tags: ['Meat Lover'], cost_estimate: 7.00 },
  { item_name: 'Clam Chowder', description: 'Creamy soup with clams.', price: 6.50, category: 'Starter', tags: ['Seafood'], cost_estimate: 1.90 },
  { item_name: 'Caprese Salad', description: 'Tomato, mozzarella, basil, olive oil.', price: 8.50, category: 'Salad', tags: ['Vegetarian'], cost_estimate: 2.50 },
  { item_name: 'Spaghetti Bolognese', description: 'Classic meat sauce pasta.', price: 11.00, category: 'Main Course', tags: ['Classic'], cost_estimate: 3.80 },
  { item_name: 'Fish & Chips', description: 'Battered fish with fries.', price: 13.00, category: 'Main Course', tags: ['Popular','Seafood'], cost_estimate: 5.00 },
  { item_name: 'Chocolate Milkshake', description: 'Creamy shake with whipped cream.', price: 5.00, category: 'Beverage', tags: ['Popular','Dessert'], cost_estimate: 1.20 },
  { item_name: 'Grilled Vegetables', description: 'Seasonal grilled vegetables.', price: 7.00, category: 'Side', tags: ['Vegan','Healthy'], cost_estimate: 1.50 },
  { item_name: 'Beef Steak', description: 'Grilled steak with herbs.', price: 20.00, category: 'Main Course', tags: ['Meat Lover'], cost_estimate: 8.50 },
  { item_name: 'Onion Rings', description: 'Crispy battered onion rings.', price: 4.00, category: 'Side', tags: ['Vegetarian'], cost_estimate: 0.70 },
  { item_name: 'Mango Smoothie', description: 'Fresh mango blended.', price: 4.50, category: 'Beverage', tags: ['Vegan','Healthy'], cost_estimate: 0.90 },
  { item_name: 'Stuffed Mushrooms', description: 'Baked mushrooms with cheese.', price: 6.00, category: 'Starter', tags: ['Vegetarian'], cost_estimate: 1.60 },
  { item_name: 'Cobb Salad', description: 'Chicken, bacon, avocado, egg.', price: 10.50, category: 'Salad', tags: ['Popular'], cost_estimate: 3.50 },
  { item_name: 'Pulled Pork Sandwich', description: 'Slow-cooked pulled pork.', price: 11.50, category: 'Main Course', tags: ['Comfort'], cost_estimate: 4.00 },
  { item_name: 'Falafel Plate', description: 'Falafel, hummus, salad.', price: 9.50, category: 'Main Course', tags: ['Vegan'], cost_estimate: 2.70 },
  { item_name: 'Sushi Roll (Veg)', description: 'Avocado, cucumber, rice.', price: 10.00, category: 'Main Course', tags: ['Vegetarian','Popular'], cost_estimate: 3.20 },
  { item_name: 'Sushi Roll (Salmon)', description: 'Salmon, avocado, rice.', price: 12.50, category: 'Main Course', tags: ['Seafood'], cost_estimate: 4.50 },
  { item_name: 'Iced Tea', description: 'Brewed tea with ice.', price: 2.80, category: 'Beverage', tags: ['Popular'], cost_estimate: 0.20 },
  { item_name: 'Bruschetta', description: 'Toasted bread with tomato topping.', price: 5.50, category: 'Starter', tags: ['Vegetarian'], cost_estimate: 1.10 }
];

const menuItems = menuItemsData.map(mi => ({
  _id: ObjectId(),
  item_name: mi.item_name,
  description: mi.description,
  price: mi.price,
  tags: mi.tags,
  cost_estimate: mi.cost_estimate,
  available: true,
  created_at: new Date()
}));

db.menu_items.insertMany(menuItems);
print('Inserted menu_items:', db.menu_items.countDocuments());

// ---------- Customers (100) ----------
const firstNames = ['John','Jane','Alex','Sam','Lina','Omar','Sara','Hassan','Fatima','Youssef','Nadia','Imane','Rachid','Khalid','Meryem'];
const lastNames = ['Doe','Smith','BenAli','ElAmrani','Johnson','Brown','Garcia','Martinez','Lopez','Haddad','Aziz'];

const customers = [];
for(let i=0;i<100;i++){
  const fn = firstNames[i % firstNames.length];
  const ln = lastNames[i % lastNames.length];
  const name = fn + ' ' + ln + (i>30?(' '+(i-30)):(''));
  const email = (fn + '.' + ln + i + '@example.com').toLowerCase();
  const phone = '+2126' + (10000000 + i).toString().slice(-8);
  customers.push({ _id: ObjectId(), customer_name: name, email: email, phone: phone, loyalty_points: Math.floor(Math.random()*500), created_at: new Date(Date.now() - Math.floor(Math.random()*365)*24*3600*1000) });
}

db.customers.insertMany(customers);
print('Inserted customers:', db.customers.countDocuments());

print('--- setup.js complete ---');
