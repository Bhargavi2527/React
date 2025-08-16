import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { InputField } from "./InputField"

const meta = {
  title: "Components/InputField",
  component: InputField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
# InputField Component

A flexible and accessible input component with multiple variants, sizes, and states. 
Built with TypeScript and TailwindCSS, following modern React patterns.

## Features
- Multiple variants: filled, outlined, ghost
- Three sizes: small, medium, large
- States: disabled, invalid, loading
- Optional features: clear button, password toggle
- Full accessibility support with ARIA attributes
- Light and dark theme support

## Anatomy
The InputField consists of:
- Label (optional)
- Input field with proper styling
- Icon area for password toggle, clear button, or loading spinner
- Helper text or error message (optional)

## Accessibility
- Proper ARIA attributes and roles
- Keyboard navigation support
- Screen reader friendly
- Focus management
- Color contrast compliance (WCAG AA)
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["filled", "outlined", "ghost"],
      description: "Visual style variant of the input",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size of the input field",
    },
    type: {
      control: { type: "select" },
      options: ["text", "password", "email"],
      description: "Input type",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    invalid: {
      control: "boolean",
      description: "Whether the input is in an invalid state",
    },
    loading: {
      control: "boolean",
      description: "Whether the input is in a loading state",
    },
    showClearButton: {
      control: "boolean",
      description: "Whether to show the clear button when input has value",
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof InputField>

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    label: "Email Address",
    placeholder: "Enter your email...",
    helperText: "We'll never share your email with anyone else.",
  },
}

// Variants
export const Filled: Story = {
  args: {
    label: "Filled Input",
    placeholder: "This is a filled input",
    variant: "filled",
    helperText: "Filled variant with background color",
  },
}

export const Outlined: Story = {
  args: {
    label: "Outlined Input",
    placeholder: "This is an outlined input",
    variant: "outlined",
    helperText: "Outlined variant with border",
  },
}

export const Ghost: Story = {
  args: {
    label: "Ghost Input",
    placeholder: "This is a ghost input",
    variant: "ghost",
    helperText: "Ghost variant with minimal styling",
  },
}

// Sizes
export const Small: Story = {
  args: {
    label: "Small Input",
    placeholder: "Small size input",
    size: "sm",
  },
}

export const Medium: Story = {
  args: {
    label: "Medium Input",
    placeholder: "Medium size input",
    size: "md",
  },
}

export const Large: Story = {
  args: {
    label: "Large Input",
    placeholder: "Large size input",
    size: "lg",
  },
}

// States
export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "This input is disabled",
    disabled: true,
    helperText: "This field cannot be edited",
  },
}

export const Invalid: Story = {
  args: {
    label: "Invalid Input",
    placeholder: "This input has an error",
    invalid: true,
    errorMessage: "This field is required and cannot be empty",
    value: "",
  },
}

export const Loading: Story = {
  args: {
    label: "Loading Input",
    placeholder: "Processing...",
    loading: true,
    helperText: "Please wait while we process your request",
  },
}

// Special features
export const Password: Story = {
  args: {
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    helperText: "Click the eye icon to toggle visibility",
  },
}

export const WithClearButton: Story = {
  args: {
    label: "Input with Clear Button",
    placeholder: "Type something to see clear button",
    showClearButton: true,
    value: "Some text to clear",
    helperText: "Click the X to clear the input",
  },
}

// Real-world examples
export const LoginForm: Story = {
  name: "Real-world: Login Form",
  render: () => (
    <div className="w-80 space-y-4 p-6 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Sign In</h3>
      <InputField label="Email" type="email" placeholder="Enter your email" variant="outlined" />
      <InputField label="Password" type="password" placeholder="Enter your password" variant="outlined" />
    </div>
  ),
}

export const ContactForm: Story = {
  name: "Real-world: Contact Form",
  render: () => (
    <div className="w-96 space-y-4 p-6 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
      <InputField label="Full Name" placeholder="John Doe" variant="filled" showClearButton />
      <InputField
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        variant="filled"
        helperText="We'll respond within 24 hours"
      />
      <InputField label="Company (Optional)" placeholder="Acme Inc." variant="filled" showClearButton />
    </div>
  ),
}

// Interactive examples
export const AllVariants: Story = {
  name: "All Variants Comparison",
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <h4 className="font-medium mb-3">Variants</h4>
        <div className="space-y-3">
          <InputField variant="outlined" placeholder="Outlined" />
          <InputField variant="filled" placeholder="Filled" />
          <InputField variant="ghost" placeholder="Ghost" />
        </div>
      </div>
      <div>
        <h4 className="font-medium mb-3">Sizes</h4>
        <div className="space-y-3">
          <InputField size="sm" placeholder="Small" />
          <InputField size="md" placeholder="Medium" />
          <InputField size="lg" placeholder="Large" />
        </div>
      </div>
    </div>
  ),
}

// Accessibility demonstration
export const AccessibilityDemo: Story = {
  name: "Accessibility Features",
  render: () => (
    <div className="space-y-4 w-80">
      <div className="p-4 bg-muted rounded-lg">
        <h4 className="font-medium mb-2">Accessibility Features:</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Proper ARIA labels and descriptions</li>
          <li>• Keyboard navigation support</li>
          <li>• Screen reader friendly</li>
          <li>• Focus management</li>
          <li>• Error state announcements</li>
        </ul>
      </div>
      <InputField
        label="Accessible Input"
        placeholder="Try tabbing and using screen reader"
        helperText="This input follows WCAG guidelines"
      />
      <InputField
        label="Error Example"
        placeholder="This shows error handling"
        invalid
        errorMessage="Screen readers will announce this error"
      />
    </div>
  ),
}
