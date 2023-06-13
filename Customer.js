export class Customer {
  constructor(_id, firstName, lastName, email, address) {
    this._id = _id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.address = {
      street: address.street || null,
      zip: address.zip || null,
      city: address.city || null
    };
  }


  static createFromDTO(data) {
    return new Customer(
      data._id,
      data.firstName,
      data.lastName,
      data.email,
      {
        street: data.address.street || null,
        zip: data.address.zip || null,
        city: data.address.city || null
      }
    );
  }
}

  
