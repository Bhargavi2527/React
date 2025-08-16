import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { DataTable, type Column } from "./DataTable"

// Sample data types
interface User {
  id: number
  name: string
  email: string
  role: string
  status: "active" | "inactive"
  joinDate: string
}

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  rating: number
}

// Sample data
const sampleUsers: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "active", joinDate: "2023-01-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "active", joinDate: "2023-02-20" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor", status: "inactive", joinDate: "2023-03-10" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User", status: "active", joinDate: "2023-04-05" },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "Admin",
    status: "active",
    joinDate: "2023-05-12",
  },
]

const sampleProducts: Product[] = [
  { id: 1, name: "Laptop Pro", category: "Electronics", price: 1299.99, stock: 15, rating: 4.8 },
  { id: 2, name: "Wireless Mouse", category: "Electronics", price: 29.99, stock: 50, rating: 4.2 },
  { id: 3, name: "Office Chair", category: "Furniture", price: 199.99, stock: 8, rating: 4.5 },
  { id: 4, name: "Desk Lamp", category: "Furniture", price: 49.99, stock: 25, rating: 4.1 },
  { id: 5, name: "Keyboard", category: "Electronics", price: 79.99, stock: 30, rating: 4.6 },
]

// Column definitions
const userColumns: Column<User>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
  { key: "role", header: "Role", sortable: true },
  {
    key: "status",
    header: "Status",
    sortable: true,
    accessor: (user) => (
      <span
        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
          user.status === "active"
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
        }`}
      >
        {user.status}
      </span>
    ),
  },
  { key: "joinDate", header: "Join Date", sortable: true },
]

const productColumns: Column<Product>[] = [
  { key: "name", header: "Product", sortable: true },
  { key: "category", header: "Category", sortable: true },
  {
    key: "price",
    header: "Price",
    sortable: true,
    align: "right",
    accessor: (product) => `$${product.price.toFixed(2)}`,
  },
  { key: "stock", header: "Stock", sortable: true, align: "center" },
  {
    key: "rating",
    header: "Rating",
    sortable: true,
    align: "center",
    accessor: (product) => (
      <div className="flex items-center justify-center">
        <span className="text-yellow-500">★</span>
        <span className="ml-1">{product.rating}</span>
      </div>
    ),
  },
]

const meta = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# DataTable Component

A flexible and feature-rich data table component built with TypeScript generics to handle any data type.
Supports sorting, row selection, loading states, and custom cell rendering.

## Features
- **Generic TypeScript support** - Works with any data type
- **Column sorting** - Click headers to sort data
- **Row selection** - Single or multiple row selection
- **Loading states** - Built-in loading and empty states
- **Custom cell rendering** - Use accessor functions for complex content
- **Responsive design** - Horizontal scroll on smaller screens
- **Accessibility** - Proper ARIA labels and keyboard navigation

## Column Configuration
Each column can be configured with:
- \`key\`: Property key or identifier
- \`header\`: Display text for column header
- \`accessor\`: Custom function to render cell content
- \`sortable\`: Enable/disable sorting for this column
- \`width\`: CSS width value
- \`align\`: Text alignment (left, center, right)

## Accessibility
- Proper table semantics with thead/tbody
- ARIA labels for selection checkboxes
- Keyboard navigation support
- Screen reader friendly sorting indicators
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    loading: {
      control: "boolean",
      description: "Show loading state",
    },
    selectable: {
      control: "boolean",
      description: "Enable row selection",
    },
    emptyMessage: {
      control: "text",
      description: "Message to show when no data",
    },
    loadingMessage: {
      control: "text",
      description: "Message to show while loading",
    },
  },
  args: {
    onRowSelect: fn(),
  },
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

// Basic usage
export const Default: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
  },
}

// With selection
export const WithSelection: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    selectable: true,
  },
}

// Loading state
export const Loading: Story = {
  args: {
    data: [],
    columns: userColumns,
    loading: true,
    loadingMessage: "Fetching user data...",
  },
}

// Empty state
export const Empty: Story = {
  args: {
    data: [],
    columns: userColumns,
    emptyMessage: "No users found. Try adjusting your search criteria.",
  },
}

// Products table with custom formatting
export const ProductsTable: Story = {
  args: {
    data: sampleProducts,
    columns: productColumns,
    selectable: true,
  },
}

// Minimal columns
export const MinimalTable: Story = {
  args: {
    data: sampleUsers.slice(0, 3),
    columns: [
      { key: "name", header: "Name", sortable: true },
      { key: "email", header: "Email", sortable: true },
    ],
  },
}

// Real-world examples
export const UserManagement: Story = {
  name: "Real-world: User Management",
  render: () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">User Management</h3>
        <div className="text-sm text-muted-foreground">{sampleUsers.length} users total</div>
      </div>
      <DataTable
        data={sampleUsers}
        columns={userColumns}
        selectable
        onRowSelect={(selected) => console.log("Selected users:", selected)}
      />
    </div>
  ),
}

export const ProductCatalog: Story = {
  name: "Real-world: Product Catalog",
  render: () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Product Catalog</h3>
        <div className="text-sm text-muted-foreground">{sampleProducts.length} products</div>
      </div>
      <DataTable
        data={sampleProducts}
        columns={productColumns}
        selectable
        onRowSelect={(selected) => console.log("Selected products:", selected)}
      />
    </div>
  ),
}

// Interactive sorting demo
export const SortingDemo: Story = {
  name: "Sorting Demonstration",
  render: () => (
    <div className="space-y-4">
      <div className="p-4 bg-muted rounded-lg">
        <h4 className="font-medium mb-2">Sorting Features:</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Click column headers to sort</li>
          <li>• Click again to reverse sort</li>
          <li>• Click third time to remove sorting</li>
          <li>• Visual indicators show sort direction</li>
        </ul>
      </div>
      <DataTable data={sampleUsers} columns={userColumns} />
    </div>
  ),
}

// Custom cell rendering example
export const CustomRendering: Story = {
  name: "Custom Cell Rendering",
  args: {
    data: sampleUsers,
    columns: [
      { key: "name", header: "User", sortable: true },
      {
        key: "email",
        header: "Contact",
        accessor: (user) => (
          <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">
            {user.email}
          </a>
        ),
      },
      {
        key: "role",
        header: "Role",
        accessor: (user) => (
          <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {user.role}
          </span>
        ),
      },
      {
        key: "status",
        header: "Status",
        accessor: (user) => (
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${user.status === "active" ? "bg-green-500" : "bg-red-500"}`} />
            {user.status}
          </div>
        ),
      },
    ],
    selectable: true,
  },
}
