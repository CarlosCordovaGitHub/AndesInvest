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

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Historial de Transacciones', 14, 22);

    transactions.forEach((transaction, index) => {
      doc.setFontSize(12);
      const startY = 30 + (index * 20);

      doc.text(`Fecha: ${new Date(transaction.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}`, 14, startY);
      doc.text(`Hora: ${new Date(transaction.date).toLocaleTimeString('es-ES')}`, 14, startY + 5);
      doc.text(`Beneficiario: ${transaction.toAccount.userId ? transaction.toAccount.userId.fullName : 'Desconocido'}`, 14, startY + 10);
      doc.text(`Monto: ${transaction.amount > 0 ? `+${transaction.amount}` : `${transaction.amount}`}`, 14, startY + 15);
      doc.line(10, startY + 17, 200, startY + 17); // Línea separadora
    });

    doc.save('transacciones.pdf');
  };

  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && transactionDate < start) return false;
    if (end && transactionDate > end) return false;
    return true;
  });

  if (accounts.length === 0) {
    return <p>No accounts available.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-custom-darkgray p-6">
      <header className="page-header mb-6 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-black">Transacciones</h1>
      </header>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <select
              id="fromAccountId"
              name="fromAccountId"
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
            >
              <option value="" disabled>Selecciona una cuenta</option>
              {accounts.map(account => (
                <option key={account._id} value={account._id}>
                  {account.accountNumber} - {account.userId.fullName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
            />
            <button
              onClick={exportToPDF}
              className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Exportar en PDF
            </button>
          </div>
        </div>

        <div className="mt-4">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction, index) => (
              <div key={transaction._id} className="border-b border-gray-200 py-4">
                {(index === 0 || new Date(filteredTransactions[index - 1].date).toLocaleDateString() !== new Date(transaction.date).toLocaleDateString()) && (
                  <div className="bg-gray-100 p-2 rounded-md text-gray-500 font-bold mb-2">
                    {new Date(transaction.date).toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })}
                  </div>
                )}
                <div className="flex justify-between">
                  <div className="text-gray-900">
                    <div>Beneficiario: {transaction.toAccount.userId ? transaction.toAccount.userId.fullName : 'Desconocido'}</div>
                    <div>Fecha: {new Date(transaction.date).toLocaleString()}</div>
                  </div>
                  <div className="text-gray-900">
                    {transaction.amount > 0 ? `+${transaction.amount}` : `-${Math.abs(transaction.amount)}`}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No transactions available for this account.</p>
          )}
        </div>
      </div>
      <footer className="mt-6 text-black">
        <p>&copy; 2024 AndesInvest</p>
      </footer>
    </div>
  );
};

export default Transacciones;
