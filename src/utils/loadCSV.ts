import fs from 'fs';
import csvParse from 'csv-parse';
import { Transaction } from 'typeorm';

interface Transaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

export default async function loadCSV(
  filePath: string,
): Promise<Transaction[]> {
  const readCSVStream = fs.createReadStream(filePath);

  const parseStream = csvParse({
    columns: true,
    ltrim: true,
    rtrim: true,
  });

  const parseCSV = readCSVStream.pipe(parseStream);

  const lines: Transaction[] = [];

  parseCSV.on('data', (line: Transaction) => {
    lines.push(line);
  });

  await new Promise(resolve => {
    parseCSV.on('end', resolve);
  });

  return lines;
}
