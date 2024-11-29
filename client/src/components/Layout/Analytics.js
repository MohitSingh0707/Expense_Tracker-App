import React from 'react';
import { Progress } from 'antd';

const Analytics = ({ allTransaction }) => {
    // Dynamically generate categories
    const categories = [...new Set(allTransaction.map(transaction => transaction.category))];

    // Total transaction stats
    const totalTransaction = allTransaction.length;
    const totalIncomeTransaction = allTransaction.filter(transaction => transaction.type === 'income');
    const totalExpenseTransaction = allTransaction.filter(transaction => transaction.type === 'expense');

    const totalIncomePercent = (totalIncomeTransaction.length / totalTransaction) * 100;
    const totalExpensePercent = (totalExpenseTransaction.length / totalTransaction) * 100;

    // Total turnover
    const totalTurnover = allTransaction.reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalIncomeTurnover = totalIncomeTransaction.reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalExpenseTurnover = totalExpenseTransaction.reduce((acc, transaction) => acc + transaction.amount, 0);

    return (
        <>
            {/* Total Transaction Section */}
            <div className="row m-3">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">Total Transaction: {totalTransaction}</div>
                        <div className="card-body">
                            <h5 className="text-success">Income: {totalIncomeTransaction.length}</h5>
                            <h5 className="text-danger">Expense: {totalExpenseTransaction.length}</h5>
                            <div>
                                <Progress type="circle" strokeColor="green" className="mx-2" percent={totalIncomePercent.toFixed(0)} />
                                <Progress type="circle" strokeColor="red" className="mx-2" percent={totalExpensePercent.toFixed(0)} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Total Turnover Section */}
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">Total Turnover: {totalTurnover}</div>
                        <div className="card-body">
                            <h5 className="text-success">Income: {totalIncomeTurnover}</h5>
                            <h5 className="text-danger">Expense: {totalExpenseTurnover}</h5>
                            <div>
                                <Progress type="circle" strokeColor="green" className="mx-2" percent={((totalIncomeTurnover / totalTurnover) * 100).toFixed(0)} />
                                <Progress type="circle" strokeColor="red" className="mx-2" percent={((totalExpenseTurnover / totalTurnover) * 100).toFixed(0)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Wise Income and Expense */}
            <div className="row mt-3">
                <div className="col-md-4">
                    <h4>Category wise Income</h4>
                    {categories.map(category => {
                        const incomeAmount = allTransaction
                            .filter(transaction => transaction.type === 'income' && transaction.category === category)
                            .reduce((acc, transaction) => acc + transaction.amount, 0);

                        return (
                            incomeAmount > 0 && (
                                <div className="card" key={category}>
                                    <div className="card-body">
                                        <h5>{category}</h5>
                                        <Progress percent={((incomeAmount / totalIncomeTurnover) * 100).toFixed(0)} />
                                    </div>
                                </div>
                            )
                        );
                    })}
                </div>

                <div className="col-md-4">
                    <h4>Category wise Expense</h4>
                    {categories.map(category => {
                        const expenseAmount = allTransaction
                            .filter(transaction => transaction.type === 'expense' && transaction.category === category)
                            .reduce((acc, transaction) => acc + transaction.amount, 0);

                        return (
                            expenseAmount > 0 && (
                                <div className="card" key={category}>
                                    <div className="card-body">
                                        <h5>{category}</h5>
                                        <Progress percent={((expenseAmount / totalExpenseTurnover) * 100).toFixed(0)} />
                                    </div>
                                </div>
                            )
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Analytics;
