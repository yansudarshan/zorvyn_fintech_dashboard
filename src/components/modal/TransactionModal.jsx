import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { categories } from '../../data/dummyData';
import { format } from 'date-fns';

export const TransactionModal = ({ isOpen, onClose, txToEdit = null }) => {
  const { addTransaction, updateTransaction } = useStore();
  
  const [formData, setFormData] = useState({
    amount: '',
    category: categories[0],
    type: 'Expense',
    date: format(new Date(), 'yyyy-MM-dd'),
    description: '',
  });

  useEffect(() => {
    if (txToEdit && isOpen) {
      setFormData({
        amount: txToEdit.amount,
        category: txToEdit.category,
        type: txToEdit.type,
        date: txToEdit.date.slice(0, 10),
        description: txToEdit.description,
      });
    } else if (isOpen && !txToEdit) {
      setFormData({
        amount: '',
        category: categories[0],
        type: 'Expense',
        date: format(new Date(), 'yyyy-MM-dd'),
        description: '',
      });
    }
  }, [txToEdit, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      amount: parseFloat(formData.amount),
      id: txToEdit ? txToEdit.id : Math.random().toString(36).substr(2, 9),
      date: new Date(formData.date).toISOString()
    };
    
    if (txToEdit) updateTransaction(txToEdit.id, payload);
    else addTransaction(payload);
    
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
              onClick={onClose}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md z-[70] p-6 bg-white/90 dark:bg-[#111827]/90 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl"
            >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {txToEdit ? 'Edit Transaction' : 'Add Transaction'}
              </h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-1 mb-1 block">Amount</label>
                <Input type="number" step="0.01" required value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} placeholder="0.00" />
              </div>
              
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-1 mb-1 block">Category</label>
                <select 
                  className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fintech-accent/50 appearance-none"
                  value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  {categories.map(c => <option className="dark:bg-gray-800" key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-1 mb-1 block">Type</label>
                <div className="grid grid-cols-2 gap-2 bg-gray-100/80 dark:bg-black/20 p-1 rounded-xl">
                  <button type="button" onClick={() => setFormData({...formData, type: 'Expense'})} className={`py-2 rounded-lg text-sm font-medium transition-colors ${formData.type === 'Expense' ? 'bg-red-500 text-white shadow-md' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>Expense</button>
                  <button type="button" onClick={() => setFormData({...formData, type: 'Income'})} className={`py-2 rounded-lg text-sm font-medium transition-colors ${formData.type === 'Income' ? 'bg-fintech-emerald text-white shadow-md' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>Income</button>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-1 mb-1 block">Description</label>
                <Input type="text" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Enter description" />
              </div>
              
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-1 mb-1 block">Date</label>
                <Input className="dark:[color-scheme:dark]" type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
              </div>

              <Button type="submit" className="mt-4 w-full py-3 text-lg font-semibold shadow-lg shadow-fintech-accent/25 hover:shadow-fintech-accent/40">
                {txToEdit ? 'Save Changes' : 'Add Transaction'}
              </Button>
            </form>
          </motion.div>
          </div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
};
