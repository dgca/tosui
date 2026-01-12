import { useState } from "react";
import "./App.css";
import { Box } from "./components/Box/Box";
import { Text } from "@/components/Text/Text";
import { Heading } from "@/components/Heading/Heading";
import { Button } from "@/components/Button/Button";
import { Spinner } from "@/components/Spinner/Spinner";
import { Divider } from "@/components/Divider/Divider";
import { Spacer } from "@/components/Spacer/Spacer";
import { Stack } from "@/components/Stack/Stack";
import { HStack } from "@/components/HStack/HStack";
import { VStack } from "@/components/VStack/VStack";
import { Flex } from "@/components/Flex/Flex";
import { Grid } from "@/components/Grid/Grid";
import { Container } from "@/components/Container/Container";

// Example sections - easy to add more as you build components
type Section =
  | "box"
  | "text"
  | "heading"
  | "button"
  | "spinner"
  | "stack"
  | "flex"
  | "grid"
  | "container"
  | "divider"
  | "spacer"
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
    { id: "stack", label: "Stack" },
    { id: "flex", label: "Flex" },
    { id: "grid", label: "Grid" },
    { id: "container", label: "Container" },
    { id: "divider", label: "Divider" },
    { id: "spacer", label: "Spacer" },
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
                  activeSection === section.id
                    ? "primary-emphasis"
                    : "foreground-muted"
                }
                border="thin"
                borderColor={
                  activeSection === section.id ? "primary" : "border"
                }
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

            <Box
              mt={4}
              mb={4}
              _hover={{ mt: 8, mb: { base: 4, md: 12 } }}
              style={{ background: "var(--t-color-primary-subtle)", padding: 16, transition: "margin 0.2s" }}
            >
              Hover me to see margin change (mt: 4→8, mb: 4→4/12)
            </Box>

            <Box
              display="flex"
              _hover={{ display: "block" }}
              style={{ background: "var(--t-color-accent-subtle)", padding: 16, gap: 8 }}
            >
              <span style={{ background: "var(--t-color-accent-default)", padding: 8 }}>A</span>
              <span style={{ background: "var(--t-color-accent-default)", padding: 8 }}>B</span>
              <span style={{ background: "var(--t-color-accent-default)", padding: 8 }}>C</span>
              <span style={{ fontSize: 12, opacity: 0.7 }}>(flex → block on hover)</span>
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
              <Box
                display="flex"
                gap={3}
                alignItems="center"
                flexWrap="wrap"
                mb={4}
              >
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
                Color Schemes
              </Text>
              <Box display="flex" gap={3} flexWrap="wrap" mb={4}>
                <Button colorScheme="primary">Primary</Button>
                <Button colorScheme="accent">Accent</Button>
                <Button colorScheme="success">Success</Button>
                <Button colorScheme="warning">Warning</Button>
                <Button colorScheme="error">Error</Button>
                <Button colorScheme="info">Info</Button>
              </Box>
              <Box display="flex" gap={3} flexWrap="wrap" mb={4}>
                <Button variant="outline" colorScheme="primary">Primary</Button>
                <Button variant="outline" colorScheme="accent">Accent</Button>
                <Button variant="outline" colorScheme="success">Success</Button>
                <Button variant="outline" colorScheme="warning">Warning</Button>
                <Button variant="outline" colorScheme="error">Error</Button>
                <Button variant="outline" colorScheme="info">Info</Button>
              </Box>
              <Box display="flex" gap={3} flexWrap="wrap" mb={4}>
                <Button variant="ghost" colorScheme="primary">Primary</Button>
                <Button variant="ghost" colorScheme="accent">Accent</Button>
                <Button variant="ghost" colorScheme="success">Success</Button>
                <Button variant="ghost" colorScheme="warning">Warning</Button>
                <Button variant="ghost" colorScheme="error">Error</Button>
                <Button variant="ghost" colorScheme="info">Info</Button>
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

        {/* Stack Component */}
        {shouldShowSection("stack") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Stack Component
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Text mb={3} weight="semibold">
                Stack (base component)
              </Text>
              <Stack gap={2} mb={4}>
                <Box p={3} bg="success-subtle" rounded="sm">Stack Item 1</Box>
                <Box p={3} bg="success-subtle" rounded="sm">Stack Item 2</Box>
              </Stack>

              <Text mb={3} weight="semibold">
                VStack (default direction="column")
              </Text>
              <VStack gap={2} mb={4}>
                <Box p={3} bg="primary-subtle" rounded="sm">Item 1</Box>
                <Box p={3} bg="primary-subtle" rounded="sm">Item 2</Box>
                <Box p={3} bg="primary-subtle" rounded="sm">Item 3</Box>
              </VStack>

              <Text mb={3} weight="semibold">
                HStack (direction="row")
              </Text>
              <HStack gap={2} mb={4}>
                <Box p={3} bg="accent-subtle" rounded="sm">Item 1</Box>
                <Box p={3} bg="accent-subtle" rounded="sm">Item 2</Box>
                <Box p={3} bg="accent-subtle" rounded="sm">Item 3</Box>
              </HStack>

              <Text mb={3} weight="semibold">
                Stack with different gaps
              </Text>
              <HStack gap={4} mb={4}>
                <VStack gap={1}>
                  <Text size="sm" color="foreground-muted">gap=1</Text>
                  <Box p={2} bg="success-subtle" rounded="sm">A</Box>
                  <Box p={2} bg="success-subtle" rounded="sm">B</Box>
                </VStack>
                <VStack gap={2}>
                  <Text size="sm" color="foreground-muted">gap=2</Text>
                  <Box p={2} bg="success-subtle" rounded="sm">A</Box>
                  <Box p={2} bg="success-subtle" rounded="sm">B</Box>
                </VStack>
                <VStack gap={4}>
                  <Text size="sm" color="foreground-muted">gap=4</Text>
                  <Box p={2} bg="success-subtle" rounded="sm">A</Box>
                  <Box p={2} bg="success-subtle" rounded="sm">B</Box>
                </VStack>
                <VStack gap={6}>
                  <Text size="sm" color="foreground-muted">gap=6</Text>
                  <Box p={2} bg="success-subtle" rounded="sm">A</Box>
                  <Box p={2} bg="success-subtle" rounded="sm">B</Box>
                </VStack>
              </HStack>

              <Text mb={3} weight="semibold">
                Stack with alignment
              </Text>
              <HStack gap={4}>
                <VStack gap={2} align="start" p={3} bg="warning-subtle" rounded="sm" w="120px">
                  <Text size="sm">align="start"</Text>
                  <Box p={2} bg="warning-default" rounded="sm">Short</Box>
                  <Box p={2} bg="warning-default" rounded="sm">Longer item</Box>
                </VStack>
                <VStack gap={2} align="center" p={3} bg="warning-subtle" rounded="sm" w="120px">
                  <Text size="sm">align="center"</Text>
                  <Box p={2} bg="warning-default" rounded="sm">Short</Box>
                  <Box p={2} bg="warning-default" rounded="sm">Longer item</Box>
                </VStack>
                <VStack gap={2} align="end" p={3} bg="warning-subtle" rounded="sm" w="120px">
                  <Text size="sm">align="end"</Text>
                  <Box p={2} bg="warning-default" rounded="sm">Short</Box>
                  <Box p={2} bg="warning-default" rounded="sm">Longer item</Box>
                </VStack>
              </HStack>
            </Box>
          </Box>
        )}

        {/* Flex Component */}
        {shouldShowSection("flex") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Flex Component
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Text mb={3} weight="semibold">
                Basic Flex (row direction)
              </Text>
              <Flex gap={3} mb={4}>
                <Box p={3} bg="primary-subtle" rounded="sm">Item 1</Box>
                <Box p={3} bg="primary-subtle" rounded="sm">Item 2</Box>
                <Box p={3} bg="primary-subtle" rounded="sm">Item 3</Box>
              </Flex>

              <Text mb={3} weight="semibold">
                Flex with justify
              </Text>
              <VStack gap={2} mb={4}>
                <Flex justify="start" p={2} bg="accent-subtle" rounded="sm">
                  <Text size="sm">justify="start"</Text>
                </Flex>
                <Flex justify="center" p={2} bg="accent-subtle" rounded="sm">
                  <Text size="sm">justify="center"</Text>
                </Flex>
                <Flex justify="end" p={2} bg="accent-subtle" rounded="sm">
                  <Text size="sm">justify="end"</Text>
                </Flex>
                <Flex justify="space-between" p={2} bg="accent-subtle" rounded="sm">
                  <Text size="sm">justify="space-between"</Text>
                  <Text size="sm">End</Text>
                </Flex>
              </VStack>

              <Text mb={3} weight="semibold">
                Flex with wrap
              </Text>
              <Flex wrap="wrap" gap={2} mb={4}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <Box key={n} p={3} bg="success-subtle" rounded="sm" minW="100px">
                    Item {n}
                  </Box>
                ))}
              </Flex>

              <Text mb={3} weight="semibold">
                Column direction
              </Text>
              <Flex direction="column" gap={2} align="start">
                <Box p={3} bg="error-subtle" rounded="sm">Column Item 1</Box>
                <Box p={3} bg="error-subtle" rounded="sm">Column Item 2</Box>
                <Box p={3} bg="error-subtle" rounded="sm">Column Item 3</Box>
              </Flex>
            </Box>
          </Box>
        )}

        {/* Grid Component */}
        {shouldShowSection("grid") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Grid Component
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Text mb={3} weight="semibold">
                Basic Grid (3 columns)
              </Text>
              <Grid columns="repeat(3, 1fr)" gap={3} mb={4}>
                <Box p={3} bg="primary-subtle" rounded="sm">1</Box>
                <Box p={3} bg="primary-subtle" rounded="sm">2</Box>
                <Box p={3} bg="primary-subtle" rounded="sm">3</Box>
                <Box p={3} bg="primary-subtle" rounded="sm">4</Box>
                <Box p={3} bg="primary-subtle" rounded="sm">5</Box>
                <Box p={3} bg="primary-subtle" rounded="sm">6</Box>
              </Grid>

              <Text mb={3} weight="semibold">
                4-column Grid
              </Text>
              <Grid columns="repeat(4, 1fr)" gap={3} mb={4}>
                <Box p={3} bg="accent-subtle" rounded="sm">Item 1</Box>
                <Box p={3} bg="accent-subtle" rounded="sm">Item 2</Box>
                <Box p={3} bg="accent-subtle" rounded="sm">Item 3</Box>
                <Box p={3} bg="accent-subtle" rounded="sm">Item 4</Box>
              </Grid>

              <Text mb={3} weight="semibold">
                Custom column template
              </Text>
              <Grid columns="1fr 2fr 1fr" gap={3} mb={4}>
                <Box p={3} bg="success-subtle" rounded="sm">1fr</Box>
                <Box p={3} bg="success-subtle" rounded="sm">2fr (wider)</Box>
                <Box p={3} bg="success-subtle" rounded="sm">1fr</Box>
              </Grid>

              <Text mb={3} weight="semibold">
                Grid with rows
              </Text>
              <Grid columns="repeat(2, 1fr)" rows="auto 100px auto" gap={3}>
                <Box p={3} bg="warning-subtle" rounded="sm">Row 1</Box>
                <Box p={3} bg="warning-subtle" rounded="sm">Row 1</Box>
                <Box p={3} bg="warning-subtle" rounded="sm" display="flex" alignItems="center" justifyContent="center">Row 2 (100px height)</Box>
                <Box p={3} bg="warning-subtle" rounded="sm" display="flex" alignItems="center" justifyContent="center">Row 2 (100px height)</Box>
                <Box p={3} bg="warning-subtle" rounded="sm">Row 3</Box>
                <Box p={3} bg="warning-subtle" rounded="sm">Row 3</Box>
              </Grid>
            </Box>
          </Box>
        )}

        {/* Container Component */}
        {shouldShowSection("container") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Container Component
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Text mb={3} weight="semibold">
                Container sizes
              </Text>
              <VStack gap={3} mb={4}>
                <Container size="sm" bg="primary-subtle" p={3} rounded="sm">
                  <Text size="sm">size="sm" (640px max)</Text>
                </Container>
                <Container size="md" bg="accent-subtle" p={3} rounded="sm">
                  <Text size="sm">size="md" (768px max)</Text>
                </Container>
                <Container size="lg" bg="success-subtle" p={3} rounded="sm">
                  <Text size="sm">size="lg" (1024px max) - default</Text>
                </Container>
                <Container size="xl" bg="warning-subtle" p={3} rounded="sm">
                  <Text size="sm">size="xl" (1280px max)</Text>
                </Container>
                <Container size="full" bg="error-subtle" p={3} rounded="sm">
                  <Text size="sm">size="full" (100% width)</Text>
                </Container>
              </VStack>

              <Text mb={3} weight="semibold">
                Container with centerContent
              </Text>
              <Container size="md" centerContent bg="info-subtle" p={4} rounded="sm">
                <Box p={3} bg="info-default" color="foreground-inverted" rounded="sm">
                  Centered content
                </Box>
              </Container>
            </Box>
          </Box>
        )}

        {/* Divider Component */}
        {shouldShowSection("divider") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Divider Component
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Text mb={3} weight="semibold">
                Horizontal Dividers (default)
              </Text>
              <Box mb={4}>
                <Text mb={2}>Content above</Text>
                <Divider />
                <Text mt={2}>Content below</Text>
              </Box>

              <Text mb={3} weight="semibold">
                Divider Colors
              </Text>
              <Box display="flex" flexDirection="column" gap={3} mb={4}>
                <Box>
                  <Text size="sm" color="foreground-muted" mb={1}>border-muted (default)</Text>
                  <Divider />
                </Box>
                <Box>
                  <Text size="sm" color="foreground-muted" mb={1}>border</Text>
                  <Divider color="border" />
                </Box>
                <Box>
                  <Text size="sm" color="foreground-muted" mb={1}>primary</Text>
                  <Divider color="primary" />
                </Box>
                <Box>
                  <Text size="sm" color="foreground-muted" mb={1}>accent</Text>
                  <Divider color="accent" />
                </Box>
                <Box>
                  <Text size="sm" color="foreground-muted" mb={1}>success</Text>
                  <Divider color="success" />
                </Box>
                <Box>
                  <Text size="sm" color="foreground-muted" mb={1}>error</Text>
                  <Divider color="error" />
                </Box>
              </Box>

              <Text mb={3} weight="semibold">
                Divider Thickness
              </Text>
              <Box display="flex" flexDirection="column" gap={3} mb={4}>
                <Box>
                  <Text size="sm" color="foreground-muted" mb={1}>1px (default)</Text>
                  <Divider thickness={1} color="primary" />
                </Box>
                <Box>
                  <Text size="sm" color="foreground-muted" mb={1}>2px</Text>
                  <Divider thickness={2} color="primary" />
                </Box>
                <Box>
                  <Text size="sm" color="foreground-muted" mb={1}>3px</Text>
                  <Divider thickness={3} color="primary" />
                </Box>
                <Box>
                  <Text size="sm" color="foreground-muted" mb={1}>4px</Text>
                  <Divider thickness={4} color="primary" />
                </Box>
              </Box>

              <Text mb={3} weight="semibold">
                Vertical Dividers
              </Text>
              <Box display="flex" gap={4} alignItems="stretch" h="80px">
                <Box p={3} bg="primary-subtle" display="flex" alignItems="center">
                  Left
                </Box>
                <Divider orientation="vertical" />
                <Box p={3} bg="accent-subtle" display="flex" alignItems="center">
                  Middle
                </Box>
                <Divider orientation="vertical" color="error" thickness={2} />
                <Box p={3} bg="success-subtle" display="flex" alignItems="center">
                  Right
                </Box>
              </Box>
            </Box>
          </Box>
        )}

        {/* Spacer Component */}
        {shouldShowSection("spacer") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Spacer Component
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Text mb={3} weight="semibold">
                Push items apart in flex container
              </Text>
              <Box display="flex" p={3} bg="primary-subtle" rounded="md" mb={4}>
                <Box p={2} bg="primary-default" color="foreground-inverted" rounded="sm">
                  Logo
                </Box>
                <Spacer />
                <Box p={2} bg="primary-default" color="foreground-inverted" rounded="sm">
                  Nav
                </Box>
              </Box>

              <Text mb={3} weight="semibold">
                Multiple spacers for equal distribution
              </Text>
              <Box display="flex" p={3} bg="accent-subtle" rounded="md" mb={4}>
                <Box p={2} bg="accent-default" color="foreground-inverted" rounded="sm">
                  A
                </Box>
                <Spacer />
                <Box p={2} bg="accent-default" color="foreground-inverted" rounded="sm">
                  B
                </Box>
                <Spacer />
                <Box p={2} bg="accent-default" color="foreground-inverted" rounded="sm">
                  C
                </Box>
              </Box>

              <Text mb={3} weight="semibold">
                Vertical spacer
              </Text>
              <Box display="flex" flexDirection="column" h="200px" p={3} bg="success-subtle" rounded="md">
                <Box p={2} bg="success-default" color="foreground-inverted" rounded="sm">
                  Header
                </Box>
                <Spacer />
                <Box p={2} bg="success-default" color="foreground-inverted" rounded="sm">
                  Footer
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
                <Box
                  p={4}
                  bg="primary-subtle"
                  border="thin"
                  borderColor="primary"
                >
                  Padding: p={"{4}"}
                </Box>
                <Box
                  px={6}
                  py={2}
                  bg="accent-subtle"
                  border="thin"
                  borderColor="accent"
                >
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
              <Box display="flex" gap={3} justifyContent="space-between" mb={4}>
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
                <Text color="foreground-inverted-subtle">Inverted Subtle</Text>
              </Box>

              <Text mb={3} weight="semibold">
                Background Colors
              </Text>
              <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
                <Box bg="primary-subtle" p={3} rounded="sm">
                  Primary Subtle
                </Box>
                <Box
                  bg="primary-default"
                  color="foreground-inverted"
                  p={3}
                  rounded="sm"
                >
                  Primary
                </Box>
                <Box
                  bg="primary-emphasis"
                  color="foreground-inverted"
                  p={3}
                  rounded="sm"
                >
                  Primary Emphasis
                </Box>
                <Box bg="accent-subtle" p={3} rounded="sm">
                  Accent Subtle
                </Box>
                <Box
                  bg="accent-default"
                  color="foreground-inverted"
                  p={3}
                  rounded="sm"
                >
                  Accent
                </Box>
                <Box
                  bg="accent-emphasis"
                  color="foreground-inverted"
                  p={3}
                  rounded="sm"
                >
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
              <Box
                display="grid"
                gridTemplateColumns="repeat(3, 1fr)"
                gap={3}
                mb={4}
              >
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
                <Box
                  p={3}
                  border="thin"
                  borderColor="border"
                  rounded="sm"
                  bg="primary-subtle"
                >
                  Small
                </Box>
                <Box
                  p={3}
                  border="thin"
                  borderColor="border"
                  rounded="md"
                  bg="accent-subtle"
                >
                  Medium
                </Box>
                <Box
                  p={3}
                  border="thin"
                  borderColor="border"
                  rounded="lg"
                  bg="success-subtle"
                >
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
                <Box
                  p={6}
                  shadow="none"
                  bg="background"
                  border="thin"
                  borderColor="border"
                  rounded="md"
                >
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
