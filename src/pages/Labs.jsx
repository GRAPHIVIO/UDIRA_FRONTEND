import React, { useState, useMemo } from 'react';
import { Plus, Search, Download, AlertTriangle, FlaskConical, History, ClipboardCheck, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { Button, Badge } from '../components/shared';
import { mockLabInventory, mockLabTransactions, mockLabUsage, mockLocations } from '../utils/mockData';
import clsx from 'clsx';

export default function Labs() {
  const [activeTab, setActiveTab] = useState('inventory');
  const [inventory, setInventory] = useState(mockLabInventory);
  const [transactions, setTransactions] = useState(mockLabTransactions);
  const [usage, setUsage] = useState(mockLabUsage);
  const [locations] = useState(mockLocations.filter(l => l.location_type === 'lab'));

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isUsageModalOpen, setIsUsageModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  const [newItem, setNewItem] = useState({
    name: '', category: 'chemical', quantity: '', unit: 'Litres', expiry_date: '', location_id: '', safety_notes: ''
  });

  const handleAddItem = (e) => {
    e.preventDefault();
    const item = {
      ...newItem,
      id: inventory.length + 1,
      location_name: locations.find(l => l.id === parseInt(newItem.location_id))?.name || 'Unknown'
    };
    setInventory([...inventory, item]);
    setIsAddModalOpen(false);
    setNewItem({ name: '', category: 'chemical', quantity: '', unit: 'Litres', expiry_date: '', location_id: '', safety_notes: '' });
  };

  const filteredInventory = useMemo(() => {
    return inventory.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [inventory, searchTerm]);

  const inventoryColumns = [
    {
      key: 'name',
      label: 'Item Name',
      sortable: true,
      render: (v, row) => (
        <div>
          <p className="font-medium text-gray-900">{v}</p>
          <p className="text-xs text-gray-500 capitalize">{row.category}</p>
        </div>
      )
    },
    {
      key: 'quantity',
      label: 'Stock Level',
      sortable: true,
      render: (v, row) => (
        <span className="font-bold text-gray-900">{v} {row.unit}</span>
      )
    },
    {
      key: 'expiry_date',
      label: 'Expiry Date',
      sortable: true,
      render: (v) => {
        if (!v) return <span className="text-gray-400">N/A</span>;
        const expired = new Date(v) < new Date();
        return (
          <div className="flex items-center gap-2">
            <span className={expired ? 'text-red-600 font-bold' : 'text-gray-600'}>{v}</span>
            {expired && <AlertTriangle size={14} className="text-red-600" />}
          </div>
        );
      }
    },
    { key: 'location_name', label: 'Location' },
    {
      key: 'id',
      label: 'Actions',
      render: (v, row) => (
        <div className="flex gap-2">
          <button 
            onClick={() => { setSelectedItem(row); setIsStockModalOpen(true); }}
            className="p-1.5 hover:bg-primary-50 rounded text-primary-600" 
            title="Update Stock"
          >
            <Plus size={16} />
          </button>
          <button 
            onClick={() => { setSelectedItem(row); setIsUsageModalOpen(true); }}
            className="p-1.5 hover:bg-green-50 rounded text-green-600" 
            title="Log Usage"
          >
            <ClipboardCheck size={16} />
          </button>
        </div>
      )
    }
  ];

  const transactionColumns = [
    { key: 'date', label: 'Date', sortable: true },
    { 
      key: 'type', 
      label: 'Type',
      render: (v) => (
        <Badge variant={v === 'IN' ? 'success' : 'danger'} size="sm">
          <div className="flex items-center gap-1">
            {v === 'IN' ? <ArrowDownLeft size={12} /> : <ArrowUpRight size={12} />}
            {v}
          </div>
        </Badge>
      )
    },
    { key: 'quantity', label: 'Qty' },
    { key: 'handled_by', label: 'Handled By' },
  ];

  const usageColumns = [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'class_name', label: 'Class' },
    { key: 'teacher_name', label: 'Teacher' },
    { key: 'topic_experiment', label: 'Experiment / Topic' },
    { key: 'notes', label: 'Safety Notes' },
  ];

  return (
    <div className="px-4 lg:px-8 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Laboratory Module</h1>
          <p className="text-gray-600 mt-1">Manage consumable inventory, safety logs, and lab sessions</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus size={18} />
          New Item
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {[
          { id: 'inventory', label: 'Inventory Dashboard', icon: FlaskConical },
          { id: 'transactions', label: 'Stock Transactions', icon: History },
          { id: 'usage', label: 'Lab Usage Log', icon: ClipboardCheck },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              'flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px',
              activeTab === tab.id 
                ? 'border-primary-600 text-primary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            )}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'inventory' && (
        <div className="space-y-4">
          <div className="card grid grid-cols-1 md:grid-cols-3 gap-4 bg-red-50/50 border-red-100">
            <div className="flex items-center gap-3 p-2">
              <div className="p-2 bg-red-100 rounded-lg text-red-600">
                <AlertTriangle size={20} />
              </div>
              <div>
                <p className="text-xs text-red-700 uppercase font-bold">Expired Chemicals</p>
                <p className="text-xl font-bold text-red-900">1 Item Detected</p>
              </div>
            </div>
            {/* Add more inventory stats here */}
          </div>
          <div className="card">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search chemicals or equipment..."
                className="input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Table columns={inventoryColumns} data={filteredInventory} />
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="space-y-4">
          <div className="bg-primary-50 p-4 rounded-lg flex items-center gap-3 text-primary-800 text-sm">
            <History size={18} />
            <p>Every stock addition (IN) or removal (OUT) is recorded for accurate inventory audit.</p>
          </div>
          <Table columns={transactionColumns} data={transactions} />
        </div>
      )}

      {activeTab === 'usage' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button variant="secondary" size="sm" onClick={() => setIsUsageModalOpen(true)}>Log New Session</Button>
          </div>
          <Table columns={usageColumns} data={usage} />
        </div>
      )}

      {/* Add New Item Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Register New Lab Item">
        <form className="space-y-4" onSubmit={handleAddItem}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Item Name *</label>
              <input 
                type="text" className="input" placeholder="e.g. Sodium Chloride" required 
                value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})}
              />
            </div>
            <div>
              <label className="label">Category *</label>
              <select 
                className="input" required
                value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})}
              >
                <option value="chemical">Chemical</option>
                <option value="equipment">Equipment</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Quantity *</label>
              <input 
                type="number" step="0.01" className="input" placeholder="0.00" required 
                value={newItem.quantity} onChange={e => setNewItem({...newItem, quantity: e.target.value})}
              />
            </div>
            <div>
              <label className="label">Unit *</label>
              <input 
                type="text" className="input" placeholder="e.g. Litres, kg, Pcs" required 
                value={newItem.unit} onChange={e => setNewItem({...newItem, unit: e.target.value})}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Location *</label>
              <select 
                className="input" required
                value={newItem.location_id} onChange={e => setNewItem({...newItem, location_id: e.target.value})}
              >
                <option value="">Select Location</option>
                {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Expiry Date (for chemicals)</label>
              <input 
                type="date" className="input" 
                value={newItem.expiry_date} onChange={e => setNewItem({...newItem, expiry_date: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label className="label">Safety Notes</label>
            <textarea 
              className="input" rows="2" placeholder="Storage instructions or hazards..."
              value={newItem.safety_notes} onChange={e => setNewItem({...newItem, safety_notes: e.target.value})}
            ></textarea>
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button type="submit" variant="primary" className="flex-1">Save Item</Button>
            <Button type="button" variant="secondary" className="flex-1" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>

      {/* Modals for Stock IN/OUT, Lab Usage, etc. */}
      <Modal isOpen={isStockModalOpen} onClose={() => setIsStockModalOpen(false)} title={`Update Stock: ${selectedItem?.name}`}>
        <form className="space-y-4">
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer flex-1 p-3 border rounded-lg hover:bg-green-50 has-[:checked]:border-green-500 has-[:checked]:bg-green-50">
              <input type="radio" name="tx_type" value="IN" defaultChecked />
              <div className="text-sm font-bold text-green-700">STOCK IN (+)</div>
            </label>
            <label className="flex items-center gap-2 cursor-pointer flex-1 p-3 border rounded-lg hover:bg-red-50 has-[:checked]:border-red-500 has-[:checked]:bg-red-50">
              <input type="radio" name="tx_type" value="OUT" />
              <div className="text-sm font-bold text-red-700">STOCK OUT (-)</div>
            </label>
          </div>
          <div>
            <label className="label">Quantity ({selectedItem?.unit}) *</label>
            <input type="number" step="0.01" className="input" placeholder="0.00" required />
          </div>
          <div>
            <label className="label">Reference / Note</label>
            <input type="text" className="input" placeholder="e.g. Monthly refill, Practical session" />
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button type="submit" variant="primary" className="flex-1">Update Inventory</Button>
            <Button type="button" variant="secondary" className="flex-1" onClick={() => setIsStockModalOpen(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isUsageModalOpen} onClose={() => setIsUsageModalOpen(false)} title="Log Lab Session Usage">
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Class *</label>
              <select className="input" required>
                <option value="1">10-A</option>
                <option value="2">10-B</option>
              </select>
            </div>
            <div>
              <label className="label">Teacher *</label>
              <select className="input" required>
                <option value="1">MR. ERICK OPONDO</option>
              </select>
            </div>
          </div>
          <div>
            <label className="label">Date *</label>
            <input type="date" className="input" defaultValue={new Date().toISOString().split('T')[0]} required />
          </div>
          <div>
            <label className="label">Experiment Topic *</label>
            <input type="text" className="input" placeholder="e.g. Osmosis Practical" required />
          </div>
          <div>
            <label className="label">Safety / Observation Notes</label>
            <textarea className="input" rows="3" placeholder="Enter any safety concerns or general notes..."></textarea>
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button type="submit" variant="primary" className="flex-1">Log Session</Button>
            <Button type="button" variant="secondary" className="flex-1" onClick={() => setIsUsageModalOpen(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
