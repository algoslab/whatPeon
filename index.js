#!/usr/bin/env node
import { program } from 'commander';
import {scrape} from './commands/scrape.js';
import { login } from './login/whatsapp/whatsappLogin.js';

program
  .name('mycli')
  .description('CLI to some string utilities')
  .version('1.0.0');

  program
  .command('login')
  .argument('<social>', 'Login social media like whatsapp')
  .action(login);

  program
  .command('scrape')
  .argument('<country>', 'Short Country name: BD, UK, US etc')
  .option('--file <file>', 'File path to scrape data from')
  .option('--url <url>', 'Url to scrape data from.')
  .option('--map <map>', 'Google map or Yahoo map: Not in used currently.')
  .action(scrape);

program.parse();
