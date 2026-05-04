import React from 'react';
import clsx from 'clsx';

export function Badge({ children, variant = 'primary', size = 'md' }) {
  return (
    <span
      className={clsx(
        'badge',
        {
          'badge-primary': variant === 'primary',
          'badge-success': variant === 'success',
          'badge-warning': variant === 'warning',
          'badge-danger': variant === 'danger',
        },
        {
          'px-2 py-0.5 text-xs': size === 'sm',
          'px-3 py-1 text-xs': size === 'md',
          'px-4 py-2 text-sm': size === 'lg',
        }
      )}
    >
      {children}
    </span>
  );
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <button
      className={clsx(
        'btn',
        {
          'btn-primary': variant === 'primary',
          'btn-secondary': variant === 'secondary',
          'btn-danger': variant === 'danger',
        },
        {
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-sm': size === 'md',
          'px-6 py-3 text-base': size === 'lg',
        },
        {
          'opacity-50 cursor-not-allowed': disabled || isLoading,
        },
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function StatsCard({ icon: Icon, label, value, change, changeType = 'positive' }) {
  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-2">{label}</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>
          {change !== undefined && (
            <p className={clsx('text-sm font-medium', changeType === 'positive' ? 'text-green-600' : 'text-red-600')}>
              {changeType === 'positive' ? '↑' : '↓'} {Math.abs(change)}% from last month
            </p>
          )}
        </div>
        <div className={clsx('p-3 rounded-lg', changeType === 'positive' ? 'bg-green-100' : 'bg-red-100')}>
          <Icon size={24} className={changeType === 'positive' ? 'text-green-600' : 'text-red-600'} />
        </div>
      </div>
    </div>
  );
}
