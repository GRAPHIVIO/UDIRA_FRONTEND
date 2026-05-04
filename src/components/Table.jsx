import React, { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

export default function Table({ columns, data, onRowClick, isLoading = false, selectable = false, selectedRows = [], onSelectionChange }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sorting logic
  let sortedData = [...data];
  if (sortConfig.key) {
    sortedData.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const renderCellContent = (value) => {
    if (typeof value === 'boolean') {
      return value ? (
        <span className="badge badge-success">Yes</span>
      ) : (
        <span className="badge badge-danger">No</span>
      );
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return value;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-primary-600 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="card p-0 overflow-hidden">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {selectable && (
                <th className="px-6 py-4 w-12">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    checked={paginatedData.length > 0 && paginatedData.every(row => selectedRows.includes(row.id))}
                    onChange={(e) => {
                      if (!onSelectionChange) return;
                      if (e.target.checked) {
                        const newSelected = [...new Set([...selectedRows, ...paginatedData.map(r => r.id)])];
                        onSelectionChange(newSelected);
                      } else {
                        const newSelected = selectedRows.filter(id => !paginatedData.find(r => r.id === id));
                        onSelectionChange(newSelected);
                      }
                    }}
                  />
                </th>
              )}
              {columns.map(column => (
                <th
                  key={column.key}
                  className={clsx(
                    'px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider',
                    column.sortable && 'cursor-pointer hover:bg-gray-100 transition-colors'
                  )}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.label}</span>
                    {column.sortable && sortConfig.key === column.key && (
                      sortConfig.direction === 'asc' ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-6 py-8 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => (
                <tr
                  key={idx}
                  className={clsx(
                    "border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200",
                    selectedRows.includes(row.id) && "bg-primary-50"
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {selectable && (
                    <td className="px-6 py-4 w-12" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        checked={selectedRows.includes(row.id)}
                        onChange={(e) => {
                          if (!onSelectionChange) return;
                          if (e.target.checked) {
                            onSelectionChange([...selectedRows, row.id]);
                          } else {
                            onSelectionChange(selectedRows.filter(id => id !== row.id));
                          }
                        }}
                      />
                    </td>
                  )}
                  {columns.map(column => (
                    <td
                      key={column.key}
                      className={clsx(
                        'px-6 py-4 text-sm text-gray-900',
                        column.render && 'render-cell'
                      )}
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : renderCellContent(row[column.key])}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of{' '}
            {sortedData.length} entries
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={clsx(
                    'px-3 py-1 rounded-lg text-sm font-medium transition-colors',
                    currentPage === page
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-200'
                  )}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
