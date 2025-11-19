/* 
   Class representing a transaction object.
*/
class Transaction {
  static id = 0;

  #id = null;
  #name = null;
  #amount = null;
  #category = null;
  #transactionDate = null;
  #creationDate = null

  constructor ({name, amount, category, transactionDate, creationDate}) {
    this.#id = Transaction.id;
    Transaction.id++;

    this.#name = name;
    this.#amount = amount;
    this.#category = category;
    this.#transactionDate = transactionDate;
    this.#creationDate = creationDate;
  }

  getId() {
    return this.#id;
  }

  getName () {
    return this.#name;
  }

  setName (newName) {
    this.#name = newName;
  }

  getAmount () {
    return this.#amount;
  }

  setAmount (newAmount) {
    this.#amount = newAmount;
  }

  getCategory () {
    return this.#category;
  }

  setCategory (newCategory) {
    this.#category = newCategory;
  }

  getTransactionDate () {
    return this.#transactionDate;
  }

  setTransactionDate (newTransactionDate) {
    this.#transactionDate = newTransactionDate;
  }

  getCreationDate () {
    return this.#creationDate;
  }

  toString() {
    return this.#name + ";" + this.#amount + ";" + this.#category + ";" + this.#transactionDate + ";" + this.#creationDate;
  }
}

export default Transaction;