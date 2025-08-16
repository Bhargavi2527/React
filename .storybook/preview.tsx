import type { Preview } from "@storybook/react"
import "../src/styles/globals.css"

// Theme decorator to toggle between light and dark themes
const withTheme = (Story: any, context: any) => {
  const theme = context.globals.theme || "light"

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="bg-background text-foreground min-h-screen p-4">
        <Story />
      </div>
    </div>
  )
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true, // Disable default backgrounds since we handle theming
    },
    docs: {
      theme: undefined, // Let our custom theme handle this
    },
  },
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "circlehollow", title: "Light" },
          { value: "dark", icon: "circle", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
}

export default preview
