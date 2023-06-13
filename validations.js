import { check, validationResult } from 'express-validator';

const validationRules = [
  check('firstName')
    .notEmpty()
    .withMessage('Vorname darf nicht leer sein')
    .isLength({ min: 1 })
    .withMessage('Vorname muss mindestens 1 Zeichen lang sein'),
  check('lastName')
    .notEmpty()
    .withMessage('Nachname darf nicht leer sein')
    .isLength({ min: 1 })
    .withMessage('Nachname muss mindestens 1 Zeichen lang sein'),
  check('email')
    .notEmpty()
    .withMessage('E-Mail-Adresse darf nicht leer sein')
    .isEmail()
    .withMessage('E-Mail-Adresse muss gültig sein'),
  check('address.street')
    .notEmpty()
    .withMessage('Straße darf nicht leer sein'),
  check('address.zip')
    .notEmpty()
    .withMessage('PLZ darf nicht leer sein'),
  check('address.city')
    .notEmpty()
    .withMessage('Ort darf nicht leer sein'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  // console.log('Validierung fehlgeschlagen:', errors.array());
  return res.status(400).json({
    errors: errors.array(),
  });
};

export { validationRules, validate };
