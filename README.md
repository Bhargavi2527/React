# React Components Assignment

A comprehensive React component library built with TypeScript, TailwindCSS, and Storybook. This project demonstrates modern React development practices with a focus on accessibility, type safety, and developer experience.

## 🚀 Components

### InputField
A flexible input component with validation states, multiple variants, and accessibility features.

**Features:**
- ✅ Multiple variants: `filled`, `outlined`, `ghost`
- ✅ Three sizes: `sm`, `md`, `lg`
- ✅ States: `disabled`, `invalid`, `loading`
- ✅ Optional features: clear button, password toggle
- ✅ Full TypeScript support
- ✅ WCAG AA accessibility compliance
- ✅ Light and dark theme support

### DataTable
A feature-rich data table component with TypeScript generics for type safety.

**Features:**
- ✅ Generic TypeScript support for any data type
- ✅ Column sorting with visual indicators
- ✅ Row selection (single/multiple)
- ✅ Loading and empty states
- ✅ Custom cell rendering with accessor functions
- ✅ Responsive design with horizontal scroll
- ✅ Full accessibility support

## 🛠️ Tech Stack

- **React 19** - Latest React with modern patterns
- **TypeScript** - Full type safety and IntelliSense
- **Next.js 15** - App Router and modern React features
- **TailwindCSS v4** - Utility-first CSS with custom properties
- **Storybook 8** - Component documentation and testing
- **Lucide React** - Beautiful, customizable icons

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Getting Started

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd react-components-assignment
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`
   Open [http://localhost:3000](http://localhost:3000) to view the demo page.

4. **Launch Storybook**
   \`\`\`bash
   npm run storybook
   \`\`\`
   Open [http://localhost:6006](http://localhost:6006) to explore component documentation.

## 📚 Storybook Documentation

Our Storybook includes comprehensive documentation for each component:

- **Component API** - Complete props and TypeScript interfaces
- **Interactive Examples** - Live component playground
- **Use Cases** - Real-world implementation examples
- **Accessibility Notes** - ARIA roles, keyboard navigation, focus management
- **Best Practices** - Do's and don'ts for each component
- **Theme Support** - Light/dark mode toggle in toolbar

### Key Storybook Features

- **Controls Panel** - Dynamically adjust component props
- **Docs Page** - Auto-generated documentation from TypeScript
- **Accessibility Testing** - Built-in a11y addon
- **Responsive Testing** - Viewport addon for mobile testing
- **Theme Toggle** - Switch between light and dark themes

## 🎨 Design System

### Color Palette
The components use a semantic color system with CSS custom properties:

- **Primary Colors**: Background, foreground, muted
- **Interactive Colors**: Primary, secondary, accent
- **Status Colors**: Destructive, success (via green variants)
- **Border Colors**: Border, input, ring

### Typography
- **Font Family**: Geist Sans (primary), Geist Mono (code)
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Text Sizes**: Responsive scale from `text-xs` to `text-3xl`

### Spacing & Layout
- **Consistent Spacing**: 4px base unit with Tailwind spacing scale
- **Responsive Design**: Mobile-first approach with breakpoint prefixes
- **Layout Method**: Flexbox for most layouts, CSS Grid for complex 2D layouts

## ♿ Accessibility

Both components follow WCAG 2.1 AA guidelines:

### InputField Accessibility
- Proper label association with `htmlFor` and `id`
- ARIA attributes: `aria-invalid`, `aria-describedby`
- Keyboard navigation support
- Screen reader announcements for state changes
- Color contrast compliance
- Focus management and visual indicators

### DataTable Accessibility
- Semantic table structure (`table`, `thead`, `tbody`)
- ARIA labels for interactive elements
- Keyboard navigation for sorting and selection
- Screen reader friendly sorting indicators
- Proper focus management
- Row and column headers properly associated

## 🧪 Testing & Quality

### Type Safety
- Full TypeScript coverage with strict mode
- Generic types for flexible, reusable components
- Proper prop validation and IntelliSense support

### Code Quality
- ESLint configuration for consistent code style
- Prettier integration for code formatting
- TypeScript strict mode for maximum type safety

## 📁 Project Structure

\`\`\`
├── .storybook/              # Storybook configuration
│   ├── main.ts             # Storybook main config
│   └── preview.tsx         # Global decorators and parameters
├── app/                    # Next.js app directory
│   ├── globals.css         # Global styles and CSS variables
│   ├── layout.tsx          # Root layout with fonts
│   └── page.tsx            # Demo page showcasing components
├── src/                    # Source components
│   ├── components/
│   │   ├── InputField/
│   │   │   ├── InputField.tsx
│   │   │   ├── InputField.stories.tsx
│   │   │   └── index.ts
│   │   └── DataTable/
│   │       ├── DataTable.tsx
│   │       ├── DataTable.stories.tsx
│   │       └── index.ts
│   └── lib/
│       └── utils.ts        # Utility functions (cn helper)
└── README.md               # This file
\`\`\`

## 🚀 Deployment

### Storybook Deployment
Deploy your Storybook to Chromatic or Vercel:

\`\`\`bash
# Build Storybook
npm run build-storybook

# Deploy to Vercel
npx vercel --prod
\`\`\`

### Next.js Deployment
Deploy the demo application:

\`\`\`bash
# Build application
npm run build

# Deploy to Vercel
npx vercel --prod
\`\`\`

## 🤝 Usage Examples

### InputField Usage

\`\`\`tsx
import { InputField } from './src/components/InputField'

function LoginForm() {
  return (
    <form className="space-y-4">
      <InputField
        label="Email"
        type="email"
        placeholder="Enter your email"
        variant="outlined"
        helperText="We'll never share your email"
      />
      <InputField
        label="Password"
        type="password"
        placeholder="Enter your password"
        variant="outlined"
      />
    </form>
  )
}
\`\`\`

### DataTable Usage

\`\`\`tsx
import { DataTable, Column } from './src/components/DataTable'

interface User {
  id: number
  name: string
  email: string
  role: string
}

const columns: Column<User>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
]

function UserTable({ users }: { users: User[] }) {
  return (
    <DataTable
      data={users}
      columns={columns}
      selectable
      onRowSelect={(selected) => console.log('Selected:', selected)}
    />
  )
}
\`\`\`

## 📋 Assignment Checklist

### ✅ Component Requirements
- [x] InputField with all required props and features
- [x] DataTable with sorting, selection, and states
- [x] TypeScript interfaces and proper typing
- [x] Multiple variants, sizes, and states
- [x] Loading and error states

### ✅ Storybook Documentation
- [x] Component name & description
- [x] Props & API definitions with TypeScript types
- [x] Use cases & real-world examples
- [x] Anatomy/structure breakdown
- [x] States & variants demonstration
- [x] Interaction behavior examples
- [x] Accessibility notes and keyboard navigation
- [x] Theming and responsiveness handling
- [x] Best practices, do's & don'ts

### ✅ Technical Requirements
- [x] React with TypeScript
- [x] TailwindCSS for styling
- [x] Modern React patterns (hooks, functional components)
- [x] Scalable project structure
- [x] Comprehensive documentation

## 🎯 Next Steps

This component library is ready for production use and can be extended with:

- Additional components (Button, Modal, Dropdown, etc.)
- Unit tests with Jest and React Testing Library
- Visual regression testing with Chromatic
- NPM package publishing
- Design tokens and theme customization
- Animation and micro-interactions

## 📄 License

This project is created for educational purposes as part of a React component development assignment.
#   R e a c t  
 