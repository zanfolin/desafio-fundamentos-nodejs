import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  type: 'outcome' | 'income';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[]{
    return this.transactions;
  }

  public getBalance(): Balance {

    const outcome = this.transactions
      .filter(t => t.type === 'outcome')
      .reduce((total, t) => total + t.value,0)

    const income = this.transactions
      .filter(t => t.type === 'income')
      .reduce((total, t) => total + t.value,0)

    const balance = {
      outcome,
      income,
      total : income - outcome
    }

    return balance
  }

  public create({type, title, value}:CreateTransactionDTO): Transaction {
    const transaction = new Transaction({title, type, value});

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
