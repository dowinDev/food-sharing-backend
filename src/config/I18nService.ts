// src/config/i18n/i18n.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class I18nService {
  private messages: Record<string, any>;

  constructor() {
    this.loadMessages();
  }

  private loadMessages() {
    const filePath = path.join(__dirname, '../../src/utils/i18n/en.json');
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    this.messages = JSON.parse(fileContents);
  }

  getMessage(key: string, ...args: string[]): string {
    const message = this.messages.error[key];
    return this.format(message, args);
  }

  private format(message: string, args: string[]): string {
    return message.replace(/{(\d+)}/g, (match, index) => args[index] || match);
  }
}
