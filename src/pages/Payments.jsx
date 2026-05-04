import React, { useState } from 'react';
import { Download, Plus, Eye } from 'lucide-react';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { Button, Badge } from '../components/shared';
import { mockPayments } from '../utils/mockData';

export default function Payments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleViewPayment = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const stats = {
    totalReceived: mockPayments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
    pending: mockPayments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Student,Type,Amount,Status,Date\n"
      + mockPayments.map(p => `${p.studentName},${p.type},${p.amount},${p.status},${p.date}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "payments_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    { key: 'studentName', label: 'Student Name', sortable: true },
    { key: 'type', label: 'Fee Type', sortable: true },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      render: (value) => <span className="font-medium">KSH{value.toLocaleString()}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <Badge variant={value === 'paid' ? 'success' : 'warning'} size="sm">
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      ),
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'id',
      label: 'Actions',
      render: (value, row) => (
        <button onClick={() => handleViewPayment(row)} className="p-1.5 hover:bg-gray-100 rounded-lg">
          <Eye size={16} className="text-gray-600" />
        </button>
      ),
    },
  ];

  return (
    <div className="px-4 lg:px-8 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fees & Payments</h1>
          <p className="text-gray-600 mt-1">Track fees collection and payments</p>
        </div>
        <Button variant="secondary" onClick={handleExport}>
          <Download size={18} />
          Export
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <p className="text-sm text-gray-600 mb-2">Total Received</p>
          <p className="text-3xl font-bold text-green-600">KSH{stats.totalReceived.toLocaleString()}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-2">Pending Amount</p>
          <p className="text-3xl font-bold text-yellow-600">KSH{stats.pending.toLocaleString()}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-2">Collection Rate</p>
          <p className="text-3xl font-bold text-primary-600">
            {((stats.totalReceived / (stats.totalReceived + stats.pending)) * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      <Table columns={columns} data={mockPayments} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Payment Details">
        {selectedPayment && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Student Name</p>
                <p className="text-sm font-medium text-gray-900">{selectedPayment.studentName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Fee Type</p>
                <p className="text-sm font-medium text-gray-900">{selectedPayment.type}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Amount</p>
                <p className="text-lg font-bold text-primary-600">KSH{selectedPayment.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Status</p>
                <Badge variant={selectedPayment.status === 'paid' ? 'success' : 'warning'} size="sm">
                  {selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Date</p>
                <p className="text-sm font-medium text-gray-900">{new Date(selectedPayment.date).toLocaleDateString()}</p>
              </div>
              {selectedPayment.receipt && (
                <div>
                  <p className="text-xs text-gray-500 uppercase">Receipt</p>
                  <p className="text-sm font-medium text-primary-600">{selectedPayment.receipt}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
