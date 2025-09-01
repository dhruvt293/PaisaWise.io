import React, { useState, useEffect, useMemo } from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Calendar, Plus, Home, PieChart, IndianRupee, BarChart3, Trash2 } from 'lucide-react';

// Main App Component - All code is in here!
export default function HisaabExpenseTracker() {
  // --- STATE MANAGEMENT ---
  const [expenses, setExpenses] = useState([]);
  const [activeTab, setActiveTab] = useState('quick-add');

  // --- LOCAL STORAGE ---
  // Load expenses from localStorage when the app starts
  useEffect(() => {
    const savedExpenses = localStorage.getItem('hisaab-expenses');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('hisaab-expenses', JSON.stringify(expenses));
  }, [expenses]);

  // --- HELPER FUNCTIONS ---
  const addExpense = (expenseData) => {
    const newExpense = {
      ...expenseData,
      id: Date.now().toString(), // Simple unique ID
    };
    setExpenses(prev => [newExpense, ...prev]);
    setActiveTab('dashboard'); // Switch to dashboard after adding
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      setExpenses([]);
    }
  };

  // --- UI & RENDER ---
  return (
    <div className="min-h-screen bg-orange-50 font-sans">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
        {/* Header */}
        <header className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-5 text-center shadow-md">
          <div className="flex items-center justify-center gap-2 mb-1">
            <IndianRupee className="w-8 h-8" />
            <h1 className="text-2xl font-bold">PaisaWise</h1>
          </div>
          <p className="text-orange-100 text-sm">Your Personal Expense Tracker</p>
        </header>

        {/* Navigation Tabs */}
        <div className="p-4">
          <div className="grid grid-cols-2 bg-gray-100 p-1 rounded-lg">
            <TabButton
              label="Quick Add"
              icon={<Plus size={16} />}
              isActive={activeTab === 'quick-add'}
              onClick={() => setActiveTab('quick-add')}
            />
            <TabButton
              label="Dashboard"
              icon={<Home size={16} />}
              isActive={activeTab === 'dashboard'}
              onClick={() => setActiveTab('dashboard')}
            />
          </div>
        </div>

        {/* Content Area */}
        <main className="p-4 pt-0">
          {activeTab === 'quick-add' && <QuickAddExpense onAddExpense={addExpense} />}
          {activeTab === 'dashboard' && <Dashboard expenses={expenses} />}
        </main>

        {/* Footer */}
        <footer className="p-4 mt-4 border-t bg-gray-50">
           <div className="flex items-center justify-between">
             <p className="text-sm text-gray-600">Total Entries: {expenses.length}</p>
             {expenses.length > 0 && (
               <button
                 onClick={clearAllData}
                 className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 border border-red-200 rounded-md hover:bg-red-50"
               >
                 <Trash2 size={14} /> Clear All
               </button>
             )}
           </div>
         </footer>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---
// These are all the smaller pieces that make up the app.

// Data and Configuration
const CATEGORIES = [
  { name: 'Food', emoji: '🍔', color: '#FF6B6B' },
  { name: 'Transport', emoji: '🚗', color: '#4ECDC4' },
  { name: 'Rent', emoji: '🏠', color: '#45B7D1' },
  { name: 'Shopping', emoji: '🛍️', color: '#96CEB4' },
  { name: 'Entertainment', emoji: '🎬', color: '#FFEAA7' },
  { name: 'Bills', emoji: '💡', color: '#DDA0DD' },
  { name: 'Health', emoji: '❤️', color: '#FF7675' },
  { name: 'Other', emoji: '🎉', color: '#FDCB6E' }
];

const formatIndianCurrency = (amount) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0,
}).format(amount);

// 1. Quick Add Screen Component
const QuickAddExpense = ({ onAddExpense }) => {
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleAddExpense = () => {
    if (!amount || !selectedCategory) return;
    const category = CATEGORIES.find(c => c.name === selectedCategory);
    if (!category) return;

    onAddExpense({
      amount: parseInt(amount),
      category: selectedCategory,
      note,
      date,
      emoji: category.emoji,
    });

    // Reset form after submission
    setAmount('');
    setSelectedCategory('');
    setNote('');
  };

  return (
    <div className="space-y-5">
      {/* Display for the amount being entered */}
      <div className="p-6 text-center rounded-lg bg-orange-50 border border-orange-200">
        <p className="text-3xl font-bold text-orange-600">
          {amount ? formatIndianCurrency(parseInt(amount)) : '₹0'}
        </p>
      </div>

      {/* Number Pad for input */}
      <div className="grid grid-cols-3 gap-3">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
          <button key={num} onClick={() => setAmount(prev => prev + num)} className="h-14 text-lg font-semibold border rounded-lg hover:bg-orange-50 active:scale-95 transition-transform">
            {num}
          </button>
        ))}
        <button onClick={() => setAmount('')} className="h-14 text-lg font-semibold border rounded-lg hover:bg-red-50 active:scale-95 transition-transform">
          Clear
        </button>
        <button onClick={() => setAmount(prev => prev + '0')} className="h-14 text-lg font-semibold border rounded-lg hover:bg-orange-50 active:scale-95 transition-transform">
          0
        </button>
        <button onClick={() => setAmount(prev => prev.slice(0, -1))} className="h-14 text-lg font-semibold border rounded-lg hover:bg-orange-50 active:scale-95 transition-transform">
          Del
        </button>
      </div>

      {/* Category Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-slate-800">Select Category</h3>
        <div className="grid grid-cols-4 gap-3">
          {CATEGORIES.map(cat => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`h-16 flex flex-col items-center justify-center gap-1 rounded-lg border transition-all ${selectedCategory === cat.name ? 'bg-orange-500 text-white border-orange-500' : 'hover:bg-orange-50 hover:border-orange-200'}`}
            >
              <span className="text-2xl">{cat.emoji}</span>
              <span className="text-xs font-medium">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Additional Details */}
      <div className="space-y-4">
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 border rounded-md" />
        <textarea placeholder="Add a note (optional)..." value={note} onChange={e => setNote(e.target.value)} className="w-full p-2 border rounded-md resize-none" rows={2}/>
      </div>

      {/* Add Button */}
      <button onClick={handleAddExpense} disabled={!amount || !selectedCategory} className="w-full h-14 text-lg font-semibold bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300 transition-colors">
        Add Expense
      </button>
    </div>
  );
};

// 2. Dashboard Screen Component
const Dashboard = ({ expenses }) => {
  const monthlyExpenses = useMemo(() => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    return expenses.filter(exp => exp.date.startsWith(currentMonth));
  }, [expenses]);

  const totalSpending = useMemo(() => monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0), [monthlyExpenses]);

  const categoryData = useMemo(() => {
    const totals = monthlyExpenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});
    return CATEGORIES.map(cat => ({...cat, value: totals[cat.name] || 0 })).filter(item => item.value > 0).sort((a,b) => b.value - a.value);
  }, [monthlyExpenses]);

  const recentTransactions = useMemo(() => [...expenses].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 5), [expenses]);

  return (
    <div className="space-y-6">
      {/* Monthly Total Card */}
      <div className="p-5 text-center rounded-lg bg-green-50 border border-green-200">
        <h3 className="text-lg text-green-700">This Month's Spending</h3>
        <p className="text-4xl font-bold text-green-600">{formatIndianCurrency(totalSpending)}</p>
      </div>

      {/* Category Breakdown Card */}
      <div className="p-5 rounded-lg border">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><PieChart size={20}/> Category Breakdown</h3>
        {categoryData.length > 0 ? (
          <>
            <div className="h-48 w-full">
              <ResponsiveContainer>
                <RechartsPieChart>
                  <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2}>
                    {categoryData.map(entry => <Cell key={entry.name} fill={entry.color} />)}
                  </Pie>
                  <Tooltip content={({ active, payload }) => active && payload?.length ? <div className="bg-white p-2 border rounded-lg shadow-lg">{`${payload[0].payload.emoji} ${payload[0].name}: ${formatIndianCurrency(payload[0].value)}`}</div> : null} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {categoryData.map(item => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}/>
                    <span>{item.emoji} {item.name}</span>
                  </div>
                  <span className="font-medium">{formatIndianCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </>
        ) : <p className="text-center text-gray-500 py-4">No spending data for this month.</p>}
      </div>

      {/* Recent Transactions Card */}
      <div className="p-5 rounded-lg border">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><BarChart3 size={20}/> Recent Transactions</h3>
        {recentTransactions.length > 0 ? (
          <div className="space-y-3">
            {recentTransactions.map(exp => (
              <div key={exp.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{exp.emoji}</span>
                  <div>
                    <p className="font-medium">{exp.category}</p>
                    <p className="text-xs text-gray-500">{exp.note || new Date(exp.date).toLocaleDateString('en-IN')}</p>
                  </div>
                </div>
                <p className="font-semibold text-red-600">{formatIndianCurrency(exp.amount)}</p>
              </div>
            ))}
          </div>
        ) : <p className="text-center text-gray-500 py-4">No transactions yet.</p>}
      </div>
    </div>
  );
};

// A simple reusable button for the main tabs
const TabButton = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center gap-2 py-2 rounded-md transition-colors ${isActive ? 'bg-orange-500 text-white' : 'hover:bg-orange-100'}`}
  >
    {icon} {label}
  </button>
);