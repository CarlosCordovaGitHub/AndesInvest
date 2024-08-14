import React, { useEffect, useState } from 'react';
import { useAccount } from '../context/accountContext';
import { useTransaction } from '../context/transactionContext';
import jsPDF from 'jspdf';

const Transacciones = () => {
  const { accounts, fetchAccounts } = useAccount();
  const { transactions, fetchTransactions } = useTransaction();
  const [selectedAccount, setSelectedAccount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  useEffect(() => {
    if (selectedAccount) {
      fetchTransactions(selectedAccount).catch(error => console.error('Error fetching transactions:', error));
    }
  }, [selectedAccount, fetchTransactions]);

  const filterTransactions = () => {
    const start = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
    const end = endDate ? new Date(endDate).setHours(23, 59, 59, 999) : null;
    
    return transactions.filter(transaction => {
      const date = new Date(transaction.date).getTime();
      return (!start || date >= start) && (!end || date <= end);
    });
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Historial de Transacciones', 14, 22);

    filterTransactions().forEach((transaction, index) => {
      doc.setFontSize(12);
      const startY = 30 + (index * 20);

      doc.text(`Fecha: ${new Date(transaction.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}`, 14, startY);
      doc.text(`Hora: ${new Date(transaction.date).toLocaleTimeString('es-ES')}`, 14, startY + 5);
      doc.text(`Beneficiario: ${transaction.toAccount.userId ? transaction.toAccount.userId.fullName : 'Desconocido'}`, 14, startY + 10);
      doc.text(`Monto: ${transaction.amount}`, 14, startY + 15);
      doc.line(10, startY + 17, 200, startY + 17); // Línea separadora
    });

    doc.save('transacciones.pdf');
  };

  if (accounts.length === 0) {
    return <p>No accounts available.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4 sm:p-6">
      <header className="page-header mb-6 w-full max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left">Historial de Transacciones</h1>
      </header>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4">
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-4">
          <select
            id="fromAccountId"
            name="fromAccountId"
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="w-full sm:w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-700"
          >
            <option value="" disabled>Selecciona una cuenta</option>
            {accounts.map(account => (
              <option key={account._id} value={account._id}>
                {account.accountNumber} - {account.userId.fullName}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full sm:w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-700"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full sm:w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-700"
          />
        </div>
        <div className="mt-4 flex justify-center sm:justify-end">
          <button
            onClick={exportToPDF}
            className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Exportar en PDF
          </button>
        </div>

        <div className="mt-4">
          {filterTransactions().length > 0 ? (
            filterTransactions().map((transaction, index) => (
              <div key={transaction._id} className="border-b border-gray-200 py-4">
                {(index === 0 || new Date(transactions[index - 1].date).toLocaleDateString() !== new Date(transaction.date).toLocaleDateString()) && (
                  <div className="bg-gray-50 p-2 rounded-md text-gray-600 font-semibold mb-2">
                    {new Date(transaction.date).toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })}
                  </div>
                )}
                <div className="flex justify-between">
                  <div className="text-gray-900">
                    <div className="font-medium">Beneficiario: {transaction.toAccount.userId ? transaction.toAccount.userId.fullName : 'Desconocido'}</div>
                    <div className="text-sm">Fecha: {new Date(transaction.date).toLocaleString()}</div>
                  </div>
                  <div className="text-gray-900 font-medium">
                    {transaction.amount}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-900 text-center">No transactions available for this account within the selected date range.</p>
          )}
        </div>
      </div>
      <footer className="mt-6 text-gray-700 text-center">
        <p>&copy; 2024 AndesInvest</p>
      </footer>
    </div>
  );
};

export default Transacciones;

