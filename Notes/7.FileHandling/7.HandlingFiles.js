import { dir } from 'console';
import fs from 'fs';

const dirPath = 'Notes/7.FileHandling'; 
const filePath = 'Notes/7.FileHandling/file.txt'; 
const incorrectFilePath = 'Notes/7.FileHandling123/file.txt'; 

/* Handling files synchronously */

// Read file
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

// Write file
if(fs.existsSync(dirPath) === true) {
    const textToBeWritten = 'OVERWRITTEN';

    /* If file don't exist, it will create it, else it will overwrite it. */
    fs.writeFileSync(dirPath + '/GENERATED_FILE.txt', textToBeWritten);

    const textGenerated = fs.readFileSync(dirPath + '/GENERATED_FILE.txt', 'utf-8');
    console.log('TEXT -> ' + textGenerated);

} else {
    console.log('INCORRECT FILE PATH');
}

// Update/Append file
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





