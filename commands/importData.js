import fs from 'fs';
import readline from 'readline';
import { db } from '../helpers/dbConnection.js';


async function importData(options){
    let filepath = '';
    if(options.categories){
        console.log("Importing categories from file: "+options.categories);
        filepath = options.categories;
    }else if(options.keywords){
        console.log("Importing keywords from file: "+options.keywords);
        filepath = options.keywords
    }else{
        console.log("Unknown Command?");
        process.exit(1);
    }
    

    if (fs.existsSync(filepath)) {
        console.log('File exists.');
        const readStream = fs.createReadStream(filepath);

        const readerObject = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity, // Recognize all instances of CR LF ('\r\n') as a single line break
        });

        readerObject.on('line', (line) => {
            console.log(`Line from file: ${line}`);
            if(options.categories){
                try{
                    db.query(`INSERT INTO category (category) VALUES ($1)`, [line]);
                }catch (err) {
                    console.error('Error inserting table category :', err.message);
                }
            }else if(options.keywords){
                try{
                    db.query(`INSERT INTO keywords (keyword, scraped) VALUES ($1, $2)`, [line, null]);
                }catch (err) {
                    console.error('Error inserting table keywords :', err.message);
                }
            }
            

        });

        readerObject.on('error', (error) => {
            console.error('Error reading file:', error);
        });

        readerObject.on('close', () => {
            console.log('Finished reading file line by line.');
        });
    } else {
        console.log('File does not exist.');
        process.exit(1);
    }
    
    
}


export {importData}