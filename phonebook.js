const readline = require('readline');
const fs = require('fs');
const promisify = require('util').promisify

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let phonebook = {};

fs.readFile('phonebook.txt', (err, entries) => {
    if (err) throw err;
    entries = JSON.parse(entries);
    phonebook = entries;
})

let loadEntries = () => {
    let book;
    fs.readFile('phonebook.txt', (err, entries) => {
        if (err) throw err;
        book = JSON.parse(entries);
        return book;
    })
    return book;
    
}

let saveEntries = () => {
    var entries = JSON.stringify(phonebook);
    fs.writeFile( 'phonebook.txt', entries, (err) => {
        if (err) throw err;
        console.log('entries were updated')
    })
}

let lookUpEntry = (callback) => {
    rl.question('Person\'s name: ', (name) => {
        phonebook[name] ? console.log(phonebook[name]): console.log('no such entry');
        callback();
    })
}

let setEntry = (callback) => {
    rl.question('Person\'s name: ', (name) => {
        rl.question('Person\'s phone number: ', (number) => {
            phonebook[name] = number;
            console.log('entry is set up');
            callback();
        })
    })
}

let deleteEntry = (callback) => {
    rl.question('Person\'s name: ', (name) => {
        if (phonebook[name]) {
            delete phonebook[name];
            console.log('entry was removed');
        } else { console.log('no such entry'); }
        callback();
    })
}

let listEntries = () => {
    for (let x in phonebook) {
        console.log(`${x}: ${phonebook[x]}`)
    }
}
    
let router = [lookUpEntry, setEntry, deleteEntry, listEntries]

let openBook = () => {
    
    rl.question(`
Electronic Phone Book
=====================
1. Look up an entry
2. Set an entry
3. Delete an entry
4. List all entries
5. Quit
What do you want to do (1-5)?

`, (answer) => {
        let number = Number(answer);
        if (answer === '5') { 
            saveEntries();
            rl.close();
            return;
         }
        router[number-1] ? router[number-1](() => setTimeout(openBook, 1200) ) : {}
        number > 5 ? console.log('choose correct digit!!'): setTimeout(openBook, 1200)
    })

}

openBook();