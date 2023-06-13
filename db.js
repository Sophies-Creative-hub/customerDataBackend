import { MongoClient, ObjectId } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const MONGO_DB = process.env.MONGO_DB || 'customerdb';

let db = null;
let collection = null;
let client = null;

export default class DB {
  /** Connect to MongoDB and open client */
  connect() {
    return MongoClient.connect(MONGO_URI)
      .then((_client) => {
        client = _client;
        db = client.db(MONGO_DB);
        collection = db.collection('customers');
      })
      .catch((err) => {
        console.error('Fehler beim Verbinden mit der Datenbank:', err);
        throw err;
      });
  }

  /** Close client connection to MongoDB */
  close() {
    return client.close();
  }

  createCustomer(customer) {
    const customerData = customer;
    customerData.address = {
      street: customerData.address.street || null,
      zip: customerData.address.zip || null,
      city: customerData.address.city || null
    };
    return collection.insertOne(customerData);
  }
  
  
  getAllCustomers() {
    return collection.find().toArray();
  }

  getCustomerById(_id) {
    return collection.findOne({ _id: new ObjectId(_id) });
  }

  updateCustomer(_id, data) {
    delete data._id;
    return collection.updateOne({ _id: new ObjectId(_id) }, { $set: data });
  }

  deleteCustomer(_id) {
    return collection.deleteOne({ _id: new ObjectId(_id) });
  }

  insertCustomer(customer) {
    return collection.insertOne(customer);
  }
}
