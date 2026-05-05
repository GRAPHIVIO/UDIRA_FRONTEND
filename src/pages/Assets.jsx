import React, { useState, useMemo } from 'react';
import { Plus, Search, Download, Edit2, Trash2, Wrench, Move, Box, MapPin, History } from 'lucide-react';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { Button, Badge } from '../components/shared';
import { mockAssets, mockLocations, mockAssetLogs } from '../utils/mockData';
import clsx from 'clsx';

export default function Assets() {
  const [activeTab, setActiveTab] = useState('inventory');
  const [assets, setAssets] = useState(mockAssets);
  const [locations, setLocations] = useState(mockLocations);
  const [logs, setLogs] = useState(mockAssetLogs);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const [newAsset, setNewAsset] = useState({
    asset_code: '', name: '', category: 'furniture', purchase_date: '', cost: '', location_id: '', assigned_to: ''
  });

  const handleAddAsset = (e) => {
    e.preventDefault();
    const asset = {
      ...newAsset,
      id: assets.length + 1,
      location_name: locations.find(l => l.id === parseInt(newAsset.location_id))?.name || 'Unknown',
      assigned_to_name: newAsset.assigned_to === '1' ? 'MR. ERICK OPONDO' : 'Unassigned',
      condition: 'good'
    };
    setAssets([...assets, asset]);
    setIsAddModalOpen(false);
    setNewAsset({ asset_code: '', name: '', category: 'furniture', purchase_date: '', cost: '', location_id: '', assigned_to: '' });
  };

  const filteredAssets = useMemo(() => {
    return assets.filter(asset => 
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.asset_code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [assets, searchTerm]);

  const assetColumns = [
    {
      key: 'asset_code',
      label: 'Code',
      sortable: true,
      render: (v) => <span className="font-mono text-xs font-bold bg-gray-100 px-2 py-1 rounded">{v}</span>
    },
    {
      key: 'name',
      label: 'Asset Name',
      sortable: true,
      render: (v, row) => (
        <div>
          <p className="font-medium text-gray-900">{v}</p>
          <p className="text-xs text-gray-500 capitalize">{row.category}</p>
        </div>
      )
    },
    {
      key: 'location_name',
      label: 'Location',
      sortable: true,
    },
    {
      key: 'assigned_to_name',
      label: 'Assigned To',
      sortable: true,
    },
    {
      key: 'condition',
      label: 'Condition',
      sortable: true,
      render: (v) => (
        <Badge variant={v === 'good' ? 'success' : v === 'damaged' ? 'danger' : 'warning'} size="sm">
          {v.toUpperCase()}
        </Badge>
      )
    },
    {
      key: 'id',
      label: 'Actions',
      render: (v, row) => (
        <div className="flex gap-2">
          <button className="p-1 hover:bg-gray-100 rounded text-blue-600"><Wrench size={16} /></button>
          <button className="p-1 hover:bg-gray-100 rounded text-green-600"><Move size={16} /></button>
          <button className="p-1 hover:bg-gray-100 rounded text-gray-600"><Edit2 size={16} /></button>
        </div>
      )
    }
  ];

  const logColumns = [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'asset_id', label: 'Asset ID' },
    { key: 'from_location', label: 'From' },
    { key: 'to_location', label: 'To' },
    { key: 'moved_by', label: 'Moved By' },
  ];

  const locationColumns = [
    { key: 'name', label: 'Location Name', sortable: true },
    { key: 'location_type', label: 'Type', sortable: true, render: (v) => <Badge variant="secondary">{v.toUpperCase()}</Badge> },
  ];

  return (
    <div className="px-4 lg:px-8 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assets Management</h1>
          <p className="text-gray-600 mt-1">Long-term school property tracking and audit trail</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus size={18} />
          Add Asset
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {[
          { id: 'inventory', label: 'Inventory', icon: Box },
          { id: 'audit', label: 'Audit Trail', icon: History },
          { id: 'locations', label: 'Locations', icon: MapPin },
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
          <div className="card">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or code..."
                className="input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Table columns={assetColumns} data={filteredAssets} />
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3 text-blue-800 text-sm">
            <History size={18} />
            <p>Every asset movement and change is logged here for full audit accountability.</p>
          </div>
          <Table columns={logColumns} data={logs} />
        </div>
      )}

      {activeTab === 'locations' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button variant="secondary" size="sm">Add Location</Button>
          </div>
          <Table columns={locationColumns} data={locations} />
        </div>
      )}

      {/* Add Asset Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Register New Asset">
        <form className="space-y-4" onSubmit={handleAddAsset}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Asset Code *</label>
              <input 
                type="text" className="input" placeholder="e.g. ELE-102" required 
                value={newAsset.asset_code} onChange={e => setNewAsset({...newAsset, asset_code: e.target.value})}
              />
            </div>
            <div>
              <label className="label">Category *</label>
              <select 
                className="input" required
                value={newAsset.category} onChange={e => setNewAsset({...newAsset, category: e.target.value})}
              >
                <option value="furniture">Furniture</option>
                <option value="electronics">Electronics</option>
                <option value="lab">Lab Equipment</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div>
            <label className="label">Asset Name *</label>
            <input 
              type="text" className="input" placeholder="e.g. Dell Monitor" required 
              value={newAsset.name} onChange={e => setNewAsset({...newAsset, name: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Location *</label>
              <select 
                className="input" required
                value={newAsset.location_id} onChange={e => setNewAsset({...newAsset, location_id: e.target.value})}
              >
                <option value="">Select Location</option>
                {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Assigned To</label>
              <select 
                className="input"
                value={newAsset.assigned_to} onChange={e => setNewAsset({...newAsset, assigned_to: e.target.value})}
              >
                <option value="">Unassigned</option>
                <option value="1">MR. ERICK OPONDO</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Purchase Date</label>
              <input 
                type="date" className="input" 
                value={newAsset.purchase_date} onChange={e => setNewAsset({...newAsset, purchase_date: e.target.value})}
              />
            </div>
            <div>
              <label className="label">Cost (KES)</label>
              <input 
                type="number" className="input" placeholder="0.00" 
                value={newAsset.cost} onChange={e => setNewAsset({...newAsset, cost: e.target.value})}
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button type="submit" variant="primary" className="flex-1">Save Asset</Button>
            <Button type="button" variant="secondary" className="flex-1" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
