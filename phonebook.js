var readline = require('readline');
var fs = require('fs');
var promisify = require('util').promisify

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

var phonebook = {};

fs.readFile('phonebook.txt', (err, entries) => {
    if (err) throw err;
    entries = JSON.parse(entries);
    phonebook = entries;
})

var loadEntries = function() {
    var book;
    fs.readFile('phonebook.txt', (err, entries) => {
        if (err) throw err;
        book = JSON.parse(entries);
        return book;
    })
    return book;
    
}

var saveEntries = function() {
    var entries = JSON.stringify(phonebook);
    fs.writeFile( 'phonebook.txt', entries, (err) => {
        if (err) throw err;
        console.log('entries were updated')
    })
}

var openBook = function() {
    
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

        if (answer === '1') {
            rl.question('Person\'s name: ', (name) => {
                phonebook[name] ? console.log(phonebook[name]): console.log('no such entry');

                setTimeout(openBook, 1200);
            })
        } else 
        if (answer === '2') {
            rl.question('Person\'s name: ', (name) => {
                rl.question('Person\'s phone number: ', (number) => {
                    phonebook[name] = number;
                    console.log('entry is set up')


                    setTimeout(openBook, 1200);
                })
            })
        } else
        if (answer === '3') {
            rl.question('Person\'s name: ', (name) => {
                if (phonebook[name]) {
                    delete phonebook[name];
                    console.log('entry was removed');
                } else { console.log('no such entry'); }

                setTimeout(openBook, 1200);
            })
        } else
        if (answer === '4') {
            for (var x in phonebook) {
                console.log(`${x}: ${phonebook[x]}`)
            }

            setTimeout(openBook, 1200);
            
        } else
        if (answer === '5') {
            saveEntries();

            rl.close();
        }
        
    })

}

openBook();