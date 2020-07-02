import { getRepository, In, getCustomRepository } from 'typeorm';
import path from 'path';

import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

import loadCSV from '../utils/loadCSV';

class ImportTransactionsService {
  async execute(filename: string): Promise<Transaction[]> {
    const csvFilePath = path.resolve(__dirname, '..', '..', 'tmp', filename);
    const dataTransactions = await loadCSV(csvFilePath);

    const categoriesNameCSV = dataTransactions.map(
      transaction => transaction.category,
    );

    const categoryRepository = getRepository(Category);

    const categories = await categoryRepository.find({
      where: { title: In(categoriesNameCSV) },
    });

    const categoriesName = categories.map(category => category.title);

    const categoriesNotCreated = categoriesNameCSV
      .filter(category => !categoriesName.includes(category))
      .filter(
        (category, index, currentArray) =>
          currentArray.indexOf(category) === index,
      );

    const categoriesCreated = categoryRepository.create(
      categoriesNotCreated.map(category => ({
        title: category,
      })),
    );

    const allCategories = [...categories, ...categoriesCreated];

    await categoryRepository.save(categoriesCreated);

    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transactions = transactionsRepository.create(
      dataTransactions.map(transaction => ({
        title: transaction.title,
        value: transaction.value,
        type: transaction.type,
        category: allCategories.find(
          category => category.title === transaction.category,
        ),
      })),
    );

    await transactionsRepository.save(transactions);

    return transactions;
  }
}

export default ImportTransactionsService;
