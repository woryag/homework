let word = 'Сантимент';
let lowerWord = word.toLowerCase();
let reverseWord = lowerWord.split('').reverse().join('');

if(lowerWord === reverseWord) {
  console.log(`Слово ${word} является палиндромом`);
} else {
  console.log(`Слово ${word} не является палиндромом`);
}



// Задание 7.6.2

const arr = [1, 2, 3, 1, 5, 4, 2, 3, 5, 'they', 'don\'t', 'know', 'that', 'we', 'know', 'that', 'they', 'know' ]; 
const newArr = [];

for (let i = 0; i < arr.length; i += 1) {
  if(!newArr.includes(arr[i])) {
    newArr.push(arr[i]);
  }
}
console.log(newArr);


// Задание 7.6.3

let userNum = +prompt('Введите любое число');
let userArr = [];

for(let i = 0; i <= userNum; i += 1) {
  userArr.push(i)
}

console.log(userArr);



// Задание 7.6.4

let field = [
  'x o x',
  'o x o',
  'x o x'
];

for(let i = 0; i < field.length; i++) {
  console.log(field[i]);
}


// Задание 7.6.5

const obj = {
  some: 'some',
  dom: 'text',
  arr: [1, 2, 3, 4, 5],
  tom: 'there'
};
const arrValues = [];

for(let key in obj) {
  let value = obj[key];

  if(Array.isArray(value)){
    for(let item of value) {
      arrValues.push(item)
    }
  } else {
    arrValues.push(value);
  }
}   

console.log(arrValues);