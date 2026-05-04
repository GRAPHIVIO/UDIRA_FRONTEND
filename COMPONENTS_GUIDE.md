# Component Usage Guide

## Overview

This guide shows how to use all reusable components in the UDIRA SMS dashboard.

## Table Component

The most powerful component for displaying tabular data.

### Basic Usage

```jsx
import Table from '../components/Table'

export default function MyPage() {
  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'status', label: 'Status', sortable: false },
  ]

  const data = [
    { name: 'John', email: 'john@example.com', status: 'active' },
    { name: 'Jane', email: 'jane@example.com', status: 'inactive' },
  ]

  return <Table columns={columns} data={data} />
}
```

### Advanced: Custom Renderers

```jsx
const columns = [
  {
    key: 'name',
    label: 'Student Name',
    sortable: true,
    render: (value, row) => (
      <div className="flex items-center gap-3">
        <img src={row.avatar} className="w-8 h-8 rounded-full" />
        <span>{value}</span>
      </div>
    ),
  },
  {
    key: 'gpa',
    label: 'GPA',
    sortable: true,
    render: (value) => (
      <span className="font-bold text-primary-600">{value.toFixed(2)}</span>
    ),
  },
]
```

### Advanced: Row Click Handler

```jsx
<Table
  columns={columns}
  data={data}
  onRowClick={(row) => {
    console.log('Clicked row:', row)
    handleViewDetails(row)
  }}
/>
```

## Modal Component

For dialogs, forms, and popups.

### Basic Modal

```jsx
import { useState } from 'react'
import Modal from '../components/Modal'

export default function Component() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal Title"
      >
        <p>Modal content goes here</p>
      </Modal>
    </>
  )
}
```

### Modal with Form

```jsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Add Student"
  size="md"
>
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label className="label">Name</label>
      <input type="text" className="input" />
    </div>
    <div>
      <label className="label">Email</label>
      <input type="email" className="input" />
    </div>
    <div className="flex gap-3">
      <button type="submit" className="btn btn-primary flex-1">
        Save
      </button>
      <button
        type="button"
        onClick={() => setIsOpen(false)}
        className="btn btn-secondary flex-1"
      >
        Cancel
      </button>
    </div>
  </form>
</Modal>
```

### Modal Sizes

```jsx
// Available sizes: sm, md, lg, xl
<Modal size="lg" ... >
```

## Button Component

Styled buttons with variants and sizes.

### Basic Button

```jsx
import { Button } from '../components/shared'

<Button>Click me</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Delete</Button>
```

### With Icons

```jsx
import { Plus } from 'lucide-react'

<Button>
  <Plus size={18} />
  Add New
</Button>
```

### Button Variants

```jsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
```

### Button Sizes

```jsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### Loading State

```jsx
<Button isLoading={true}>Loading...</Button>
```

## Badge Component

Status indicators and labels.

### Basic Badge

```jsx
import { Badge } from '../components/shared'

<Badge>Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
```

### Badge Sizes

```jsx
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

## StatsCard Component

Display statistics with icons.

### Basic StatsCard

```jsx
import { StatsCard } from '../components/shared'
import { Users } from 'lucide-react'

<StatsCard
  icon={Users}
  label="Total Students"
  value={347}
  change={12}
/>
```

### Without Change

```jsx
<StatsCard
  icon={Users}
  label="Total Students"
  value={347}
/>
```

### With Negative Change

```jsx
<StatsCard
  icon={Users}
  label="Absences Today"
  value={15}
  change={5}
  changeType="negative"
/>
```

## Sidebar Component

Fixed navigation sidebar with collapsible menu.

### How it Works

- Automatically shows/hides based on user role
- Mobile hamburger menu
- Active route highlighting
- User logout button

### Usage

```jsx
import Sidebar from '../components/Sidebar'

export default function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <main>{/* Page content */}</main>
    </div>
  )
}
```

### Menu Items by Role

Edit `MENU_ITEMS` in `Sidebar.jsx` to customize:

```jsx
const MENU_ITEMS = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    path: '/',
    roles: ['admin', 'teacher', 'student'],
  },
  // ... more items
]
```

## Navbar Component

Top navigation bar with profile and notifications.

### Features

- User profile dropdown
- Notifications dropdown
- Search bar (hidden on mobile)
- Responsive design

### Usage

```jsx
import Navbar from '../components/Navbar'

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>{/* Content below navbar */}</main>
    </>
  )
}
```

## Form Components

### Input Field

```jsx
<div>
  <label className="label">Email Address</label>
  <input type="email" className="input" />
</div>
```

### Select Dropdown

```jsx
<div>
  <label className="label">Select Class</label>
  <select className="input">
    <option>10-A</option>
    <option>10-B</option>
  </select>
</div>
```

### Text Area

```jsx
<div>
  <label className="label">Comments</label>
  <textarea className="input" rows="4"></textarea>
</div>
```

### Error State

```jsx
<input type="email" className="input input-error" />
```

## Layout Components

### Card Container

```jsx
<div className="card">
  <h3 className="text-lg font-bold">Card Title</h3>
  <p>Card content</p>
</div>
```

### Card with Hover

```jsx
<div className="card-hover" onClick={handleClick}>
  <p>Clickable card</p>
</div>
```

## Complete Page Example

```jsx
import React, { useState } from 'react'
import { Plus, Search, Download } from 'lucide-react'
import Table from '../components/Table'
import Modal from '../components/Modal'
import { Button, Badge } from '../components/shared'

export default function Students() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [students] = useState([
    { id: 1, name: 'John', email: 'john@example.com', status: 'active' },
    { id: 2, name: 'Jane', email: 'jane@example.com', status: 'active' },
  ])

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <Badge variant={value === 'active' ? 'success' : 'danger'}>
          {value}
        </Badge>
      ),
    },
  ]

  return (
    <div className="px-4 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Students</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Add Student
        </Button>
      </div>

      {/* Filters */}
      <div className="card">
        <input
          type="text"
          placeholder="Search students..."
          className="input"
        />
      </div>

      {/* Table */}
      <Table columns={columns} data={students} />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Student"
      >
        <form className="space-y-4">
          <input type="text" placeholder="Name" className="input" />
          <input type="email" placeholder="Email" className="input" />
          <Button className="w-full">Save</Button>
        </form>
      </Modal>
    </div>
  )
}
```

## Styling Classes

### Text

```jsx
<h1 className="text-3xl font-bold">Large Title</h1>
<p className="text-sm text-gray-600">Small description</p>
```

### Spacing

```jsx
<div className="space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Grid

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Items */}
</div>
```

### Colors

```jsx
<div className="bg-primary-600 text-white">Primary</div>
<div className="bg-green-50 text-green-900">Success</div>
<div className="bg-red-50 text-red-900">Danger</div>
```

## Icon Usage

```jsx
import { Users, Plus, Edit2, Trash2, Eye } from 'lucide-react'

<Users size={24} className="text-primary-600" />
<Plus size={18} />
<Edit2 size={16} />
```

## Tips & Best Practices

1. **Always use sortable: true** for filterable columns
2. **Use custom renderers** for complex cell content
3. **Combine Badge + Button** for action-heavy tables
4. **Use Modal for forms** rather than separate pages
5. **Always handle loading states** with isLoading prop
6. **Test responsive design** at all breakpoints
7. **Use Lucide icons** for consistent iconography
8. **Follow Tailwind conventions** for spacing

## Common Patterns

### Search & Filter Pattern

```jsx
const [search, setSearch] = useState('')
const filtered = items.filter(item =>
  item.name.toLowerCase().includes(search.toLowerCase())
)
<Table data={filtered} />
```

### Add/Edit Pattern

```jsx
const [isOpen, setIsOpen] = useState(false)
const [isEdit, setIsEdit] = useState(false)

const handleEdit = (item) => {
  setForm(item)
  setIsEdit(true)
  setIsOpen(true)
}
```

### Confirmation Pattern

```jsx
if (!confirm('Are you sure?')) return
handleDelete(id)
```

---

For more examples, check the page components in `/src/pages/`
