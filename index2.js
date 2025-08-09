//Задание 8.7.1

const human = {
  name: 'Alex',
  age: 23
}

function printInfo() {
  console.log(`Name: ${this.name}, Age: ${this.age}.`)
}

printInfo.call(human);


// Задание 8.7.2

function calculate(a, b, operator) {
  if(operator === '+') {
    return this.a + this.b
  } else if(operator === '-') {
    return this.a - this.b
  } else if(operator === '*') {
    return this.a * this.b
  } else if(operator === '/') {
    return this.a / this.b
  }
}

const data = {
  a: 2,
  b: 3,
  operator: '+'
}

console.log(calculate.apply(data, [data.a, data.b, data.operator]));


// Задание 8.7.3

const users = [
  {name: 'Alex', age: 23},
  {name: 'Pavel', age: 21},
  {name: 'Vlad', age: 5},
  {name: 'Valeria', age: 20}
]

const adultsUsers = users.filter(users => users.age >= 18);
const nameUsers = users.map(users => users.name);

console.log(adultsUsers);
console.log(nameUsers);


// Задание 8.7.4

const person = {
  fullName: ''
}

function setFullName(name) {
  this.fullName = name;
}

const setPersonFullName = setFullName.bind(person);

setPersonFullName('John Smith');
console.log(person.fullName);


// Задание 8.7.5

function getUniqueSortedArray(arr) {
  const unique = [];

  for (let i = 0; i < arr.length; i++) {
    let alreadyExists = false;

    for (let j = 0; j < unique.length; j++) {
      if (arr[i] === unique[j]) {
        alreadyExists = true;
        break;
      }
    }

    if (!alreadyExists) {
      unique.push(arr[i]);
    }
  }

  for (let i = 0; i < unique.length - 1; i++) {
    for (let j = 0; j < unique.length - i - 1; j++) {
      if (unique[j] > unique[j + 1]) {
        let temp = unique[j];
        unique[j] = unique[j + 1];
        unique[j + 1] = temp;
      }
    }
  }

  return unique;
}

const numbers = [5, 2, 8, 2, 3, 5, 1, 8];
console.log(getUniqueSortedArray(numbers));