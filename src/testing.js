



function H() {

    const original = { a: { b: 1 }, anotherRandomValue: 42, c: [{ name: 'Rxel', id: 4 }, { name: 'Pagni', id: 5 }, {name: 'Alex', id:3}] };

    let index = original.c.findIndex(({ id }) => id === 1);
    let field = 'name'
    let value = '--------------------'

    const post = {
        name: 'ToOOROR',
        author: 'Axel Galicia',
        date: '2018-08-04 14:50:21',
        id: 1
    }
    console.log(index)
    //https://gist.github.com/gorangajic/e902c2ee994260b3348d.

    // Always put the original with the spread operator first
    const falseCopy = {
        ...original,
        c: [
            ...original.c.slice(0, index),
            {
                ...original.c[index],
                [field]: value
            },
            ...original.c.slice(index + 1)]
    };

    const falseCopyTwo = {
        ...original,
        c: [
            ...original.c.slice(0, index),
            post,
            ...original.c.slice(index + 1)]
    };

   // console.log(falseCopy) // logs { a: { b: 2 }, anotherRandomValue: 42 }

    //console.log(falseCopyTwo) // logs { a: { b: 2 }, anotherRandomValue: 42 }
    //console.log(original) // logs { a: { b: 1 }, anotherRandomValue: 42 }

    
    original.c.sort((a,b) => {
        
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();

        if(nameA < nameB) {
            return -1;
        }

        if(nameA > nameB) {
            return 1;
        }

        return 0;
    });

    console.log(original)

}

H();