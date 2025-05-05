import fs from 'fs';
import { spawn } from 'child_process';
import { client, login} from '../login/whatsapp/whatsappLogin.js'
import { db } from '../helpers/dbConnection.js';
import { randomDelayBetweenInSeconds } from '../helpers/helper.js';



export function scrape(country, options){
    login(); // this whatsapp login is needed to client.initialize(); 


    if(options.url){
        //URL
        console.log("url: "+options.url);
    }else if(options.file){
        //file handle 
        console.log("file: "+options.file);
        // fs.readFile(source, (error, data) => {
        //     console.log('error: ', error);
        //     console.log('Data : ', data);
        // })
    }else if(options.map){
        //from google map.
        console.log("Map: "+options.map);
        const keyword = "Hospitals"; //Hospitals or whatever in some country location like state or district.
        console.log("Passing keyword to scraper: "+keyword);
        const process = spawn('python', ['-u','bots/googleMapBot.py', keyword, country]);
        let numbersArray = [];
        process.stdout.on('data', (data) => {
            numbersArray = JSON.parse(data);
            console.log("Scraper collected "+numbersArray.length+" numbers...");
            //check numbers has whatsapp and insert into database.
            client.on('ready', async () => {
                console.log("Ready to check whatsapp numbers...");
                for(const phoneNumber of numbersArray){
                    const chatId = `${phoneNumber}@c.us`;
                    const isRegistered = await client.isRegisteredUser(chatId);
                    let name = null;
                    let isWhatsapp = false;
                    if(isRegistered){
                        let contact = await client.getContactById(chatId);
                        name = contact.pushname || contact.name || null;
                        isWhatsapp = true;
                    }
                    
                    try{
                        await db.query(`INSERT INTO marketing_contacts (name, number, whatsapp, sent) VALUES ($1, $2, $3, $4)`, [name, phoneNumber, isWhatsapp, null]);
                        console.log("Inserted", phoneNumber);
                    }catch (err) {
                        console.error('Error inserting:', err.message);
                    }
                    //const sentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
                    await randomDelayBetweenInSeconds(2, 5); //2-5 seconds delay
                }
            });        
        });

        process.stderr.on('data', (data) => {
            console.error('Error:', data.toString());
        });

        process.on('close', (code) => {
            console.log(`Scraper script exited with code ${code}: Waiting for whatsapp client to initialize...`);
        });

          
    }
}

