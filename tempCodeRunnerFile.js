const person = {
  fullName: ''
}

function setFullName(name) {
  this.fullName = name;
}

const setPersonFullName = setFullName.bind(person);

setPersonFullName('John Smith');
console.log(person.fullName);