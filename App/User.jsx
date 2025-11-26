/* 
   Class representing a User object.
*/
class User {
  #name = null;
  #salary = null;

  constructor ({name, salary}) {
    this.#name = name;
    this.#salary = salary;
  }

  // name
  getName() {
    return this.#name;
  }
  
  setName(newName) {
    this.#name = newName;
  }

  // salary
  getSalary() {
    return this.#salary;
  }

  setSalary(newSalary) {
    this.#salary = newSalary;
  }

  // For exporting User objects.
  toString() {
    return this.#name + ";" + this.#salary;
  }
}

export default User;