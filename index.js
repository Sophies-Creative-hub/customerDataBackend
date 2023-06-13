import express from 'express';
import DB from './db.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './swagger.js';
import { Customer } from './Customer.js';
import { validationRules, validate } from './validations.js';

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 3000;

/** global instance of our database */
let db = new DB();

/** Initialize database connection */
async function initDB() {
  await db.connect();
  console.log("Connected to database");
}

await initDB();
let server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Alle Kunden abrufen
 *     description: Ruft alle Kunden ab.
 *     responses:
 *       '200':
 *         description: Erfolgreich abgerufene Kunden.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 */
app.get('/customers', async (req, res) => {
  let customers = await db.getAllCustomers();
  res.status(200).json(customers);
});

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Kunden abrufen
 *     description: Ruft einen Kunden anhand seiner ID ab.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID des abzurufenden Kunden
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Erfolgreich abgerufener Kunde.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       '404':
 *         description: Kunde nicht gefunden.
 */
app.get('/customers/:id', async (req, res) => {
    let customer = await db.getCustomerById(req.params.id);
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).send();
    }
  });
  

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Kunden erstellen
 *     description: Erstellt einen neuen Kunden.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       '201':
 *         description: Erfolgreich erstellter Kunde.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       '400':
 *         description: Ungültige Anfrage.
 */
app.post('/customers', validationRules, validate, async (req, res) => {
  let customer = Customer.createFromDTO(req.body);
  let result = await db.createCustomer(customer);
  customer._id = result.insertedId;
  res.status(201).send(customer);
});

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Kunden aktualisieren
 *     description: Aktualisiert einen Kunden anhand seiner ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID des zu aktualisierenden Kunden
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       '200':
 *         description: Kunde erfolgreich aktualisiert.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       '400':
 *         description: Ungültige Anfrage.
 *       '404':
 *         description: Kunde nicht gefunden.
 */
app.put('/customers/:id', validationRules, validate, async (req, res) => {
    const customer = Customer.createFromDTO(req.body);
    const result = await db.updateCustomer(req.params.id, customer);
    if (result.modifiedCount === 1) {
      const updatedCustomer = await db.getCustomerById(req.params.id);
      res.status(200).send(updatedCustomer);
    } else {
      res.status(404).send();
    }
  });

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Kunden löschen
 *     description: Löscht einen Kunden anhand seiner ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID des zu löschenden Kunden
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Kunde erfolgreich gelöscht.
 *       '404':
 *         description: Kunde nicht gefunden.
 */
app.delete('/customers/:id', async (req, res) => {
    let result = await db.deleteCustomer(req.params.id);
    if (result.deletedCount === 1) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  });

export { app, server, db };
