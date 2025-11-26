/* 
   Class representing a Transaction object.
*/
class Transaction {
  static id = 0;

  #id = null;
  #name = null;
  #amount = null;
  #category = null;
  #transactionDate = null;
  #creationDate = null

  constructor(name = "", amount = "0", category = null, transactionDate = 1598051730000, creationDate = 1598051730000) {
    this.#id = Transaction.id;
    Transaction.id++;

    this.#name = name;
    this.#amount = amount;
    this.#category = category;
    this.#transactionDate = transactionDate;
    this.#creationDate = creationDate;
  }

  // amount
  getAmount() {
    return this.#amount;
  }

  setAmount(newAmount) {
    this.#amount = newAmount;
  }

  // category
  getCategory() {
    return this.#category;
  }

  setCategory(newCategory) {
    this.#category = newCategory;
  }

  // creationDate
  getCreationDate() {
    return this.#creationDate;
  }

  // id
  getId() {
    return this.#id;
  }

  // name
  getName() {
    return this.#name;
  }

  setName(newName) {
    this.#name = newName;
  }

  // transactionDate
  getTransactionDate() {
    return this.#transactionDate;
  }

  setTransactionDate(newTransactionDate) {
    this.#transactionDate = newTransactionDate;
  }

  // For exporting Transaction objects.
  toString() {
    return this.#name + ";" + this.#amount + ";" + this.#category + ";" + this.#transactionDate + ";" + this.#creationDate;
  }
}

export default Transaction;