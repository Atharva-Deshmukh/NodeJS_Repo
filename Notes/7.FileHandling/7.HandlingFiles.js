import fs from 'fs';

const dirPath = 'Notes/7.FileHandling'; 
const filePath = 'Notes/7.FileHandling/file.txt'; 
const incorrectFilePath = 'Notes/7.FileHandling123/file.txt'; 

/*                                  HANDLING FILES SYNCHRONOUSLY
                                    ----------------------------

- The functions execute synchronously, one by one.
- This is recommended when we are outside cypress hooks and blocks, in node js env.
- We cannot take advantage of cypress' built-in waits, retries... 
- It BLOCKS EXECUTION, till it is resolved */

/************************************** Read file *********************************************/

/* utf-8 means we contents of file are extracted in text format, else it would be binary encoding */
const textRead = fs.readFileSync(filePath, 'utf-8');
console.log('TEXT -> ' + textRead);

// Read file if file exists
if(fs.existsSync(incorrectFilePath) === true) {
    const textRead = fs.readFileSync(filePath, 'utf-8');
    console.log('TEXT -> ' + textRead);
} else {
    console.log('INCORRECT FILE PATH');
}

/*********************************** Write file ***************************************/
if(fs.existsSync(dirPath) === true) {
    const textToBeWritten = 'OVERWRITTEN';

    /* If file don't exist, it will create it, else it will overwrite it. */
    fs.writeFileSync(dirPath + '/GENERATED_FILE.txt', textToBeWritten);

    const textGenerated = fs.readFileSync(dirPath + '/GENERATED_FILE.txt', 'utf-8');
    console.log('TEXT -> ' + textGenerated);

} else {
    console.log('INCORRECT FILE PATH');
}

/*********************************** Update/Append file ***************************************/

// Way - 1: use {flag: a}, a -> append
if(fs.existsSync(dirPath) === true) {
    const textToBeWritten = '  APPENDED WAY 1';

    /* If file don't exist, it will create it, else it will overwrite it. */
    fs.writeFileSync(dirPath + '/GENERATED_FILE.txt', textToBeWritten, {flag: 'a'});

    const textGenerated = fs.readFileSync(dirPath + '/GENERATED_FILE.txt', 'utf-8');
    console.log('TEXT -> ' + textGenerated);

} else {
    console.log('INCORRECT FILE PATH');
}

// Way - 2: use dedicated function
if(fs.existsSync(dirPath) === true) {
    const textToBeWritten = '  APPENDED WAY 2';

    fs.appendFileSync(dirPath + '/GENERATED_FILE.txt', textToBeWritten);

    const textGenerated = fs.readFileSync(dirPath + '/GENERATED_FILE.txt', 'utf-8');
    console.log('TEXT -> ' + textGenerated);

} else {
    console.log('INCORRECT FILE PATH');
}

/************************************** Rename file *********************************************/
if(fs.existsSync(dirPath) === true) {
    const newName = 'renamedFile.txt';

    fs.renameSync(dirPath + '/GENERATED_FILE.txt', dirPath + '/' + newName);

    const textGenerated = fs.readFileSync( dirPath + '/' + newName, 'utf-8');
    console.log('TEXT -> ' + textGenerated);

} else {
    console.log('INCORRECT FILE PATH');
}


/************************************** Delete file *********************************************/
const newName = 'renamedFile.txt';
if(fs.existsSync(dirPath + '/' + newName) === true) {

    fs.unlinkSync(dirPath + '/' + newName);

} else {
    console.log('FILE NOT FOUND!!');
}

/*                                  HANDLING FILES ASYNCHRONOUSLY
                                    ----------------------------

- Recommended when we want to chain inside cypress
- Cypress' features like automatic retries and waits are available here 
- It doesn't block execution  */

/*********************************** Read file ***************************************/

fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
    if(err) console.log('ERROR -> ', err.message);
    else console.log('DATA -> ', data);
});

fs.readFile(incorrectFilePath, {encoding: 'utf-8'}, (err, data) => {
    if(err) console.log('ERROR -> ', err.message);
    else console.log('DATA -> ', data);
});

/*********************************** Write file ***************************************/

const textToBeWritten = 'WRITTEN IN ASYNC WAY';

fs.writeFile(dirPath + '/WRITTEN_FILE.txt', textToBeWritten, (err) => {
    if(err) console.log('ERROR -> ', err.message);
    else console.log('FILE CREATED !!');
});

/********************************* Append/Update file ************************************/

const textToBeAppended = '\n Appended Text!!';

fs.appendFile(dirPath + '/WRITTEN_FILE.txt', textToBeAppended, (err) => {
    if(err) console.log('ERROR -> ', err.message);
    else console.log('FILE APPENDED !!');
});

/********************************* Delete file ************************************/

fs.unlink(dirPath + '/WRITTEN_FILE.txt', (err) => {
    if(err) console.log('ERROR -> ', err.message);
    else console.log('FILE DELETED !!');
});



