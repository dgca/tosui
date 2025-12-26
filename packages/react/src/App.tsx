import { useState } from "react";
import "./App.css";
import { Box } from "@/components/Box/Box";
import { Text } from "@/components/Text/Text";
import { Heading } from "@/components/Heading/Heading";
import { Button } from "@/components/Button/Button";
import { Spinner } from "@/components/Spinner/Spinner";

// Example sections - easy to add more as you build components
type Section =
  | "box"
  | "text"
  | "heading"
  | "button"
  | "spinner"
  | "spacing"
  | "layout"
  | "colors"
  | "borders"
  | "shadows";

function App() {
  const [theme, setTheme] = useState<"light" | "dark" | "auto">("auto");
  const [activeSection, setActiveSection] = useState<Section | "all">("all");

  // Apply theme to root element
  const handleThemeChange = (newTheme: typeof theme) => {
    setTheme(newTheme);
    if (newTheme === "auto") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", newTheme);
    }
  };

  const sections: { id: Section | "all"; label: string }[] = [
    { id: "all", label: "All" },
    { id: "box", label: "Box" },
    { id: "text", label: "Text" },
    { id: "heading", label: "Heading" },
    { id: "button", label: "Button" },
    { id: "spinner", label: "Spinner" },
    { id: "spacing", label: "Spacing" },
    { id: "layout", label: "Layout" },
    { id: "colors", label: "Colors" },
    { id: "borders", label: "Borders" },
    { id: "shadows", label: "Shadows" },
  ];

  const shouldShowSection = (section: Section) =>
    activeSection === "all" || activeSection === section;

  return (
    <Box>
      {/* Header with navigation and theme toggle */}
      <Box
        as="header"
        position="sticky"
        top={0}
        bg="surface"
        borderBottom="thin"
        borderColor="border"
        p={4}
        zIndex="sticky"
        shadow="sm"
      >
        <Box maxW="1200px" mx="auto">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
            <Heading level={1} size="2xl">
              Tosui Playground
            </Heading>

            {/* Theme Toggle */}
            <Box display="flex" gap={2}>
              <Box
                as="button"
                p={2}
                px={3}
                rounded="md"
                cursor="pointer"
                bg={theme === "light" ? "primary-default" : "surface"}
                color={theme === "light" ? "foreground-inverted" : "foreground"}
                border="thin"
                borderColor={theme === "light" ? "primary" : "border"}
                onClick={() => handleThemeChange("light")}
              >
                Light
              </Box>
              <Box
                as="button"
                p={2}
                px={3}
                rounded="md"
                cursor="pointer"
                bg={theme === "auto" ? "primary-default" : "surface"}
                color={theme === "auto" ? "foreground-inverted" : "foreground"}
                border="thin"
                borderColor={theme === "auto" ? "primary" : "border"}
                onClick={() => handleThemeChange("auto")}
              >
                Auto
              </Box>
              <Box
                as="button"
                p={2}
                px={3}
                rounded="md"
                cursor="pointer"
                bg={theme === "dark" ? "primary-default" : "surface"}
                color={theme === "dark" ? "foreground-inverted" : "foreground"}
                border="thin"
                borderColor={theme === "dark" ? "primary" : "border"}
                onClick={() => handleThemeChange("dark")}
              >
                Dark
              </Box>
            </Box>
          </Box>

          {/* Section Navigation */}
          <Box display="flex" gap={2} flexWrap="wrap">
            {sections.map((section) => (
              <Box
                key={section.id}
                as="button"
                p={2}
                px={3}
                rounded="sm"
                cursor="pointer"
                bg={activeSection === section.id ? "primary-subtle" : "surface"}
                color={
                  activeSection === section.id ? "primary-emphasis" : "foreground-muted"
                }
                border="thin"
                borderColor={activeSection === section.id ? "primary" : "border"}
                onClick={() => setActiveSection(section.id)}
                fontSize="sm"
              >
                {section.label}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box as="main" p={8} maxW="1200px" mx="auto">
        {/* Box Component */}
        {shouldShowSection("box") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Box Component
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Text mb={2}>The Box component is the foundation primitive.</Text>
              <Text color="foreground-muted">
                It accepts all layout, spacing, color, and styling props.
              </Text>
            </Box>
          </Box>
        )}

        {/* Text Component */}
        {shouldShowSection("text") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Text Component
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Box display="flex" flexDirection="column" gap={2}>
                <Text size="xs">Extra Small (xs)</Text>
                <Text size="sm">Small (sm)</Text>
                <Text size="md">Medium (md)</Text>
                <Text size="lg">Large (lg)</Text>
                <Text size="xl">Extra Large (xl)</Text>
                <Text size="2xl">2XL</Text>
              </Box>
            </Box>
          </Box>
        )}

        {/* Heading Component */}
        {shouldShowSection("heading") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Heading Component
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Box display="flex" flexDirection="column" gap={3}>
                <Heading level={1}>Heading Level 1</Heading>
                <Heading level={2}>Heading Level 2</Heading>
                <Heading level={3}>Heading Level 3</Heading>
                <Heading level={4}>Heading Level 4</Heading>
                <Heading level={5}>Heading Level 5</Heading>
                <Heading level={6}>Heading Level 6</Heading>
              </Box>
            </Box>
          </Box>
        )}

        {/* Button Component */}
        {shouldShowSection("button") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Button Component
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Text mb={3} weight="semibold">
                Variants
              </Text>
              <Box display="flex" gap={3} flexWrap="wrap" mb={4}>
                <Button>Solid (default)</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </Box>

              <Text mb={3} weight="semibold">
                Sizes
              </Text>
              <Box display="flex" gap={3} alignItems="center" flexWrap="wrap" mb={4}>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </Box>

              <Text mb={3} weight="semibold">
                States
              </Text>
              <Box display="flex" gap={3} flexWrap="wrap" mb={4}>
                <Button disabled>Disabled</Button>
                <Button loading>Loading</Button>
                <Button variant="outline" disabled>
                  Outline Disabled
                </Button>
              </Box>

              <Text mb={3} weight="semibold">
                With Icons
              </Text>
              <Box display="flex" gap={3} flexWrap="wrap" mb={4}>
                <Button leftIcon={<span>+</span>}>Add Item</Button>
                <Button rightIcon={<span>→</span>}>Next</Button>
                <Button leftIcon={<span>←</span>} rightIcon={<span>→</span>}>
                  Both
                </Button>
                <Button loading leftIcon={<span>+</span>}>
                  Loading replaces left icon
                </Button>
              </Box>

              <Text mb={3} weight="semibold">
                Custom Colors
              </Text>
              <Box display="flex" gap={3} flexWrap="wrap" mb={4}>
                <Button bg="success-default">Success</Button>
                <Button bg="error-default">Error</Button>
                <Button variant="outline" borderColor="accent" color="accent">
                  Accent Outline
                </Button>
                <Button variant="ghost" color="error">
                  Error Ghost
                </Button>
              </Box>

              <Text mb={3} weight="semibold">
                Full Width
              </Text>
              <Box mb={4}>
                <Button fullWidth>Full Width Button</Button>
              </Box>

              <Text mb={3} weight="semibold">
                As Link
              </Text>
              <Box display="flex" gap={3} flexWrap="wrap">
                <Button as="a" href="#">
                  Link Button
                </Button>
                <Button as="a" href="#" variant="outline">
                  Outline Link
                </Button>
              </Box>
            </Box>
          </Box>
        )}

        {/* Spinner Component */}
        {shouldShowSection("spinner") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Spinner Component
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Text mb={3} weight="semibold">
                Sizes
              </Text>
              <Box display="flex" gap={4} alignItems="center" mb={4}>
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
              </Box>

              <Text mb={3} weight="semibold">
                Colors (inherits from parent)
              </Text>
              <Box display="flex" gap={4} alignItems="center">
                <Box color="primary">
                  <Spinner />
                </Box>
                <Box color="success">
                  <Spinner />
                </Box>
                <Box color="error">
                  <Spinner />
                </Box>
                <Box color="warning">
                  <Spinner />
                </Box>
              </Box>
            </Box>
          </Box>
        )}

        {/* Spacing */}
        {shouldShowSection("spacing") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Spacing
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Box display="flex" flexDirection="column" gap={3}>
                <Box p={4} bg="primary-subtle" border="thin" borderColor="primary">
                  Padding: p={"{4}"}
                </Box>
                <Box px={6} py={2} bg="accent-subtle" border="thin" borderColor="accent">
                  Horizontal & Vertical: px={"{6}"} py={"{2}"}
                </Box>
                <Box
                  p={{ base: 2, md: 4, lg: 6 }}
                  bg="success-subtle"
                  border="thin"
                  borderColor="success"
                >
                  Responsive: p={"{"}base: 2, md: 4, lg: 6{"}"}
                </Box>
              </Box>
            </Box>
          </Box>
        )}

        {/* Layout */}
        {shouldShowSection("layout") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Layout
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Text mb={3} weight="semibold">
                Flexbox
              </Text>
              <Box
                display="flex"
                gap={3}
                justifyContent="space-between"
                mb={4}
              >
                <Box p={3} bg="primary-subtle" flex="1">
                  Item 1
                </Box>
                <Box p={3} bg="accent-subtle" flex="1">
                  Item 2
                </Box>
                <Box p={3} bg="success-subtle" flex="1">
                  Item 3
                </Box>
              </Box>

              <Text mb={3} weight="semibold">
                Grid
              </Text>
              <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={3}>
                <Box p={3} bg="primary-subtle">
                  Grid 1
                </Box>
                <Box p={3} bg="accent-subtle">
                  Grid 2
                </Box>
                <Box p={3} bg="success-subtle">
                  Grid 3
                </Box>
              </Box>
            </Box>
          </Box>
        )}

        {/* Colors */}
        {shouldShowSection("colors") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Colors
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Text mb={3} weight="semibold">
                Text Colors
              </Text>
              <Box display="flex" flexDirection="column" gap={2} mb={4}>
                <Text color="foreground">Foreground</Text>
                <Text color="foreground-muted">Foreground Muted</Text>
                <Text color="foreground-subtle">Foreground Subtle</Text>
                <Text color="primary">Primary</Text>
                <Text color="accent">Accent</Text>
                <Text color="success">Success</Text>
                <Text color="error">Error</Text>
                <Text color="warning">Warning</Text>
                <Text color="info">Info</Text>
              </Box>

              <Text mb={3} weight="semibold">
                Inverted Colors
              </Text>
              <Box bg="foreground" p={4} rounded="md" mb={4}>
                <Text color="foreground-inverted" mb={2}>
                  Inverted Foreground
                </Text>
                <Text color="foreground-inverted-muted" mb={2}>
                  Inverted Muted
                </Text>
                <Text color="foreground-inverted-subtle">
                  Inverted Subtle
                </Text>
              </Box>

              <Text mb={3} weight="semibold">
                Background Colors
              </Text>
              <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
                <Box bg="primary-subtle" p={3} rounded="sm">
                  Primary Subtle
                </Box>
                <Box bg="primary-default" color="foreground-inverted" p={3} rounded="sm">
                  Primary
                </Box>
                <Box bg="primary-emphasis" color="foreground-inverted" p={3} rounded="sm">
                  Primary Emphasis
                </Box>
                <Box bg="accent-subtle" p={3} rounded="sm">
                  Accent Subtle
                </Box>
                <Box bg="accent-default" color="foreground-inverted" p={3} rounded="sm">
                  Accent
                </Box>
                <Box bg="accent-emphasis" color="foreground-inverted" p={3} rounded="sm">
                  Accent Emphasis
                </Box>
              </Box>
            </Box>
          </Box>
        )}

        {/* Borders */}
        {shouldShowSection("borders") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Borders & Roundness
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Text mb={3} weight="semibold">
                Border Widths
              </Text>
              <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={3} mb={4}>
                <Box p={3} border="thin" borderColor="border">
                  Thin
                </Box>
                <Box p={3} border="medium" borderColor="border">
                  Medium
                </Box>
                <Box p={3} border="thick" borderColor="border">
                  Thick
                </Box>
              </Box>

              <Text mb={3} weight="semibold">
                Roundness
              </Text>
              <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={3}>
                <Box p={3} border="thin" borderColor="border" rounded="sm" bg="primary-subtle">
                  Small
                </Box>
                <Box p={3} border="thin" borderColor="border" rounded="md" bg="accent-subtle">
                  Medium
                </Box>
                <Box p={3} border="thin" borderColor="border" rounded="lg" bg="success-subtle">
                  Large
                </Box>
              </Box>
            </Box>
          </Box>
        )}

        {/* Shadows */}
        {shouldShowSection("shadows") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Shadows
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={4}>
                <Box p={6} shadow="none" bg="background" border="thin" borderColor="border" rounded="md">
                  None
                </Box>
                <Box p={6} shadow="sm" bg="background" rounded="md">
                  Small
                </Box>
                <Box p={6} shadow="md" bg="background" rounded="md">
                  Medium
                </Box>
                <Box p={6} shadow="lg" bg="background" rounded="md">
                  Large
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default App;
