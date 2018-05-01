function H() {

const original = { a: { b: 1 }, anotherRandomValue: 42, c: [{ name: 'Rxel', id: 4 }, { name: 'Pagni', id: 5 }, {name: 'Alex', id:3}] };


let other = JSON.parse(JSON.stringify(original.c))

other[0].name='iiiiiiiiiiiiiiiiiiiiiiiiiiiiiii'
console.log(other)
console.log(original)

//console.log(original);
//console.log(other[0])
//other[0].name = 'RAMONA';

//console.log(other)
//console.log(original);




}




H();