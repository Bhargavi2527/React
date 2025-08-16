"use client"

import { useState } from "react"
import { InputField } from "../src/components/InputField/InputField"
import { DataTable, type Column } from "../src/components/DataTable/DataTable"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"

import { useEffect } from "react"

interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
}

const users: User[] = [
  { id: 1, name: "Sarah Chen", email: "sarah.chen@company.com", role: "Product Manager", status: "Active" },
  { id: 2, name: "Marcus Johnson", email: "marcus.j@company.com", role: "Senior Developer", status: "Active" },
  { id: 3, name: "Elena Rodriguez", email: "elena.r@company.com", role: "UX Designer", status: "Away" },
  { id: 4, name: "David Kim", email: "david.kim@company.com", role: "DevOps Engineer", status: "Active" },
  { id: 5, name: "Lisa Wang", email: "lisa.wang@company.com", role: "Data Analyst", status: "Inactive" },
]

const columns: Column<User>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
  { key: "role", header: "Role", sortable: true },
  {
    key: "status",
    header: "Status",
    sortable: true,
    accessor: (user) => (
      <Badge variant={user.status === "Active" ? "default" : user.status === "Away" ? "secondary" : "outline"}>
        {user.status}
      </Badge>
    ),
  },
]

export default function Home() {
  const [textValue, setTextValue] = useState("")
  const [emailValue, setEmailValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">RC</span>
            </div>
            <h1 className="text-xl font-bold text-primary">React Components</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#inputfield" className="text-sm font-medium hover:text-primary transition-colors">
              InputField
            </a>
            <a href="#datatable" className="text-sm font-medium hover:text-primary transition-colors">
              DataTable
            </a>
            <Button variant="outline" size="sm" onClick={() => setIsDark(!isDark)} className="ml-4">
              {isDark ? "☀️" : "🌙"}
            </Button>
          </nav>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 font-sans">Professional React Components</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-mono">
            Two production-ready components built with TypeScript, TailwindCSS, and modern React patterns. Complete with
            Storybook documentation and accessibility features.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2">
              TypeScript
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              TailwindCSS
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              Storybook
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              Accessible
            </Badge>
          </div>
        </div>
      </section>

      <div className="container max-w-6xl mx-auto px-4 pb-20 space-y-20">
        <section id="inputfield" className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary mb-4 font-sans">InputField Component</h2>
            <p className="text-lg text-muted-foreground font-mono max-w-2xl mx-auto">
              A flexible input component with validation states, multiple variants, and optional features like password
              toggle and clear button.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Interactive Examples</CardTitle>
                <CardDescription>Try typing in these inputs to see the functionality</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <InputField
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                  helperText="This field supports real-time validation"
                  showClearButton
                />

                <InputField
                  label="Email Address"
                  type="email"
                  placeholder="you@company.com"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  helperText="We'll never share your email"
                  variant="filled"
                />

                <InputField
                  label="Password"
                  type="password"
                  placeholder="Create a secure password"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  helperText="Click the eye icon to toggle visibility"
                />

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-sm">Live Values:</h4>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <p>
                      Name: <span className="text-foreground">"{textValue}"</span>
                    </p>
                    <p>
                      Email: <span className="text-foreground">"{emailValue}"</span>
                    </p>
                    <p>
                      Password: <span className="text-foreground">{"*".repeat(passwordValue.length)}</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Variants & States</CardTitle>
                <CardDescription>Different styles and states available</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Variants</h4>
                  <InputField label="Outlined (Default)" placeholder="Default style" variant="outlined" />
                  <InputField label="Filled Background" placeholder="Filled style" variant="filled" />
                  <InputField label="Ghost Minimal" placeholder="Ghost style" variant="ghost" />
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">States</h4>
                  <InputField label="Disabled Input" placeholder="Cannot type here" disabled />
                  <InputField
                    label="Invalid Input"
                    placeholder="This has an error"
                    invalid
                    errorMessage="This field is required"
                  />
                  <InputField label="Loading State" placeholder="Processing..." loading />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="datatable" className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary mb-4 font-sans">DataTable Component</h2>
            <p className="text-lg text-muted-foreground font-mono max-w-2xl mx-auto">
              A powerful data table with sorting, selection, loading states, and TypeScript generics for type safety.
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Interactive Data Table</CardTitle>
                <CardDescription>Click column headers to sort, use checkboxes to select rows</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={users}
                  columns={columns}
                  selectable
                  onRowSelect={(selected) => {
                    console.log("Selected users:", selected)
                  }}
                />
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Loading State</CardTitle>
                  <CardDescription>Shows skeleton loading animation</CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable data={[]} columns={columns} loading />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Empty State</CardTitle>
                  <CardDescription>Displays when no data is available</CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable data={[]} columns={columns} emptyMessage="No team members found" />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl p-8 border">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-card-foreground mb-4">Component Features</h2>
            <p className="text-muted-foreground">Built with modern React patterns and best practices</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-accent mb-4">InputField</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✅ TypeScript interfaces with full type safety</li>
                <li>✅ Three variants: outlined, filled, ghost</li>
                <li>✅ Multiple sizes: small, medium, large</li>
                <li>✅ States: disabled, invalid, loading</li>
                <li>✅ Optional clear button and password toggle</li>
                <li>✅ Accessibility with ARIA labels</li>
                <li>✅ Light and dark theme support</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-accent mb-4">DataTable</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✅ Generic TypeScript support for any data type</li>
                <li>✅ Column sorting with visual indicators</li>
                <li>✅ Single and multiple row selection</li>
                <li>✅ Loading state with skeleton animation</li>
                <li>✅ Empty state with custom messages</li>
                <li>✅ Custom cell rendering with accessor functions</li>
                <li>✅ Responsive design and keyboard navigation</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
