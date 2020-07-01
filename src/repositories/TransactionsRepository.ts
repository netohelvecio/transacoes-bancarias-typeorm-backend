import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const balance = transactions.reduce(
      (accumulator, currentTransaction) => {
        if (currentTransaction.type === 'income') {
          accumulator.income += currentTransaction.value;
        } else {
          accumulator.outcome += currentTransaction.value;
        }

        accumulator.total = accumulator.income - accumulator.outcome;

        return accumulator;
      },
      {
        outcome: 0,
        income: 0,
        total: 0,
      },
    );

    return balance;
  }
}

export default TransactionsRepository;
