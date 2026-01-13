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
import { Code } from "@/components/Code/Code";
import { Input } from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import { Textarea } from "@/components/Textarea/Textarea";
import { Select } from "@/components/Select/Select";
import { Checkbox } from "@/components/Checkbox/Checkbox";
import { Radio } from "@/components/Radio/Radio";
import { Switch } from "@/components/Switch/Switch";
import { FormField } from "@/components/FormField/FormField";
import { IconButton } from "@/components/IconButton/IconButton";
import { Alert } from "@/components/Alert/Alert";
import { Badge } from "@/components/Badge/Badge";
import { Progress } from "@/components/Progress/Progress";
import { Skeleton } from "@/components/Skeleton/Skeleton";
import { Avatar } from "@/components/Avatar/Avatar";
import { Card, CardHeader, CardBody, CardFooter } from "@/components/Card/Card";
import { Image } from "@/components/Image/Image";
import { List, ListItem, ListIcon } from "@/components/List/List";
import { Link } from "@/components/Link/Link";
import { Tabs, TabList, Tab, TabPanel } from "@/components/Tabs/Tabs";
import { Breadcrumb, BreadcrumbItem } from "@/components/Breadcrumb/Breadcrumb";
import { Menu, MenuButton, MenuList, MenuItem } from "@/components/Menu/Menu";
import { Pagination } from "@/components/Pagination/Pagination";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/Modal/Modal";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { Popover, PopoverHeader, PopoverBody } from "@/components/Popover/Popover";
import { Accordion, AccordionItem } from "@/components/Accordion/Accordion";

// Modal example with state
function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState<"sm" | "md" | "lg" | "xl" | "full">("md");

  const openWithSize = (newSize: typeof size) => {
    setSize(newSize);
    setIsOpen(true);
  };

  return (
    <Box as="section" mb={8}>
      <Heading level={2} mb={4}>
        Modal Component
      </Heading>
      <Box
        p={4}
        bg="surface"
        border="thin"
        borderColor="border"
        rounded="md"
      >
        <Text mb={3} weight="semibold">
          Different Sizes
        </Text>
        <HStack gap={2} mb={4}>
          <Button size="sm" onClick={() => openWithSize("sm")}>Small</Button>
          <Button size="sm" onClick={() => openWithSize("md")}>Medium</Button>
          <Button size="sm" onClick={() => openWithSize("lg")}>Large</Button>
          <Button size="sm" onClick={() => openWithSize("xl")}>Extra Large</Button>
          <Button size="sm" onClick={() => openWithSize("full")}>Full</Button>
        </HStack>

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size={size}>
          <ModalHeader>Modal Title ({size})</ModalHeader>
          <ModalBody>
            <Text mb={3}>
              This is the modal body. It can contain any content you need.
            </Text>
            <Text color="foreground-muted">
              Press Escape or click the backdrop to close.
            </Text>
          </ModalBody>
          <ModalFooter>
            <HStack gap={2}>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsOpen(false)}>Confirm</Button>
            </HStack>
          </ModalFooter>
        </Modal>
      </Box>
    </Box>
  );
}

// Pagination example with state
function PaginationExample() {
  const [page, setPage] = useState(5);
  return (
    <Box as="section" mb={8}>
      <Heading level={2} mb={4}>
        Pagination Component
      </Heading>
      <Box
        p={4}
        bg="surface"
        border="thin"
        borderColor="border"
        rounded="md"
      >
        <Text mb={3} weight="semibold">
          Basic Pagination
        </Text>
        <Box mb={4}>
          <Pagination
            page={page}
            totalPages={20}
            onPageChange={setPage}
          />
          <Text size="sm" color="foreground-muted" mt={2}>
            Current page: {page}
          </Text>
        </Box>

        <Text mb={3} weight="semibold">
          Without Edge Buttons
        </Text>
        <Pagination
          page={page}
          totalPages={20}
          onPageChange={setPage}
          showEdges={false}
        />
      </Box>
    </Box>
  );
}

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
  | "code"
  | "input"
  | "label"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "switch"
  | "formfield"
  | "iconbutton"
  | "alert"
  | "badge"
  | "progress"
  | "skeleton"
  | "avatar"
  | "card"
  | "image"
  | "list"
  | "link"
  | "tabs"
  | "breadcrumb"
  | "menu"
  | "pagination"
  | "modal"
  | "tooltip"
  | "popover"
  | "accordion"
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
    { id: "code", label: "Code" },
    { id: "input", label: "Input" },
    { id: "label", label: "Label" },
    { id: "textarea", label: "Textarea" },
    { id: "select", label: "Select" },
    { id: "checkbox", label: "Checkbox" },
    { id: "radio", label: "Radio" },
    { id: "switch", label: "Switch" },
    { id: "formfield", label: "FormField" },
    { id: "iconbutton", label: "IconButton" },
    { id: "alert", label: "Alert" },
    { id: "badge", label: "Badge" },
    { id: "progress", label: "Progress" },
    { id: "skeleton", label: "Skeleton" },
    { id: "avatar", label: "Avatar" },
    { id: "card", label: "Card" },
    { id: "image", label: "Image" },
    { id: "list", label: "List" },
    { id: "link", label: "Link" },
    { id: "tabs", label: "Tabs" },
    { id: "breadcrumb", label: "Breadcrumb" },
    { id: "menu", label: "Menu" },
    { id: "pagination", label: "Pagination" },
    { id: "modal", label: "Modal" },
    { id: "tooltip", label: "Tooltip" },
    { id: "popover", label: "Popover" },
    { id: "accordion", label: "Accordion" },
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

        {/* Code Component */}
        {shouldShowSection("code") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Code Component
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Text mb={3} weight="semibold">
                Plain variant (default)
              </Text>
              <Text mb={4}>
                Use <Code>npm install</Code> to install packages. The{" "}
                <Code>package.json</Code> file defines your dependencies.
              </Text>

              <Text mb={3} weight="semibold">
                Subtle variant
              </Text>
              <Text mb={4}>
                Run <Code variant="subtle">pnpm build</Code> to compile the project.
                Check <Code variant="subtle">dist/</Code> for output files.
              </Text>

              <Text mb={3} weight="semibold">
                Different sizes
              </Text>
              <VStack gap={2} align="start">
                <Text>
                  <Code size="xs">xs code</Code> — Extra small
                </Text>
                <Text>
                  <Code size="sm">sm code</Code> — Small
                </Text>
                <Text>
                  <Code size="md">md code</Code> — Medium (default)
                </Text>
                <Text>
                  <Code size="lg">lg code</Code> — Large
                </Text>
              </VStack>
            </Box>
          </Box>
        )}

        {/* Input Component */}
        {shouldShowSection("input") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Input Component
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
              <VStack gap={3} mb={4}>
                <Input size="sm" placeholder="Small input" />
                <Input size="md" placeholder="Medium input (default)" />
                <Input size="lg" placeholder="Large input" />
              </VStack>

              <Text mb={3} weight="semibold">
                Variants
              </Text>
              <VStack gap={3} mb={4}>
                <Input variant="outline" placeholder="Outline variant (default)" />
                <Input variant="filled" placeholder="Filled variant" />
              </VStack>

              <Text mb={3} weight="semibold">
                States
              </Text>
              <VStack gap={3} mb={4}>
                <Input placeholder="Normal input" />
                <Input isDisabled placeholder="Disabled input" />
                <Input isInvalid placeholder="Invalid input" />
              </VStack>
            </Box>
          </Box>
        )}

        {/* Label Component */}
        {shouldShowSection("label") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Label Component
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Text mb={3} weight="semibold">
                Basic labels
              </Text>
              <VStack gap={3} mb={4} align="start">
                <Box>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </Box>
                <Box>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </Box>
              </VStack>

              <Text mb={3} weight="semibold">
                Required indicator
              </Text>
              <VStack gap={3} mb={4} align="start">
                <Box>
                  <Label htmlFor="required-field" required>Required Field</Label>
                  <Input id="required-field" placeholder="This field is required" />
                </Box>
              </VStack>

              <Text mb={3} weight="semibold">
                Size and weight variants
              </Text>
              <VStack gap={2} align="start">
                <Label size="xs">Extra small label</Label>
                <Label size="sm">Small label (default)</Label>
                <Label size="md">Medium label</Label>
                <Label size="lg" weight="bold">Large bold label</Label>
              </VStack>
            </Box>
          </Box>
        )}

        {/* Textarea Component */}
        {shouldShowSection("textarea") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Textarea Component
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
              <VStack gap={3} mb={4}>
                <Textarea size="sm" placeholder="Small textarea" rows={2} />
                <Textarea size="md" placeholder="Medium textarea (default)" rows={3} />
                <Textarea size="lg" placeholder="Large textarea" rows={4} />
              </VStack>

              <Text mb={3} weight="semibold">
                Variants
              </Text>
              <VStack gap={3} mb={4}>
                <Textarea variant="outline" placeholder="Outline variant (default)" />
                <Textarea variant="filled" placeholder="Filled variant" />
              </VStack>

              <Text mb={3} weight="semibold">
                States
              </Text>
              <VStack gap={3} mb={4}>
                <Textarea placeholder="Normal textarea" />
                <Textarea isDisabled placeholder="Disabled textarea" />
                <Textarea isInvalid placeholder="Invalid textarea" />
              </VStack>

              <Text mb={3} weight="semibold">
                Resize options
              </Text>
              <HStack gap={3}>
                <Box flex="1">
                  <Label>resize="none"</Label>
                  <Textarea resize="none" rows={2} placeholder="No resize" />
                </Box>
                <Box flex="1">
                  <Label>resize="vertical"</Label>
                  <Textarea resize="vertical" rows={2} placeholder="Vertical only" />
                </Box>
                <Box flex="1">
                  <Label>resize="both"</Label>
                  <Textarea resize="both" rows={2} placeholder="Both directions" />
                </Box>
              </HStack>
            </Box>
          </Box>
        )}

        {/* Select Component */}
        {shouldShowSection("select") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Select Component
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
              <VStack gap={3} mb={4}>
                <Select size="sm">
                  <option value="">Small select</option>
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
                </Select>
                <Select size="md">
                  <option value="">Medium select (default)</option>
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
                </Select>
                <Select size="lg">
                  <option value="">Large select</option>
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
                </Select>
              </VStack>

              <Text mb={3} weight="semibold">
                Variants
              </Text>
              <VStack gap={3} mb={4}>
                <Select variant="outline">
                  <option value="">Outline variant (default)</option>
                  <option value="1">Option 1</option>
                </Select>
                <Select variant="filled">
                  <option value="">Filled variant</option>
                  <option value="1">Option 1</option>
                </Select>
              </VStack>

              <Text mb={3} weight="semibold">
                States
              </Text>
              <VStack gap={3}>
                <Select>
                  <option value="">Normal select</option>
                  <option value="1">Option 1</option>
                </Select>
                <Select isDisabled>
                  <option value="">Disabled select</option>
                  <option value="1">Option 1</option>
                </Select>
                <Select isInvalid>
                  <option value="">Invalid select</option>
                  <option value="1">Option 1</option>
                </Select>
              </VStack>
            </Box>
          </Box>
        )}

        {/* Checkbox Component */}
        {shouldShowSection("checkbox") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Checkbox Component
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
              <HStack gap={4} mb={4}>
                <Checkbox size="sm" label="Small" />
                <Checkbox size="md" label="Medium" />
                <Checkbox size="lg" label="Large" />
              </HStack>

              <Text mb={3} weight="semibold">
                Without labels
              </Text>
              <HStack gap={4} mb={4}>
                <Checkbox size="sm" />
                <Checkbox size="md" />
                <Checkbox size="lg" />
              </HStack>

              <Text mb={3} weight="semibold">
                Checked states
              </Text>
              <HStack gap={4} mb={4}>
                <Checkbox label="Unchecked" />
                <Checkbox label="Checked" defaultChecked />
              </HStack>

              <Text mb={3} weight="semibold">
                Disabled state
              </Text>
              <HStack gap={4}>
                <Checkbox label="Disabled unchecked" isDisabled />
                <Checkbox label="Disabled checked" isDisabled defaultChecked />
              </HStack>
            </Box>
          </Box>
        )}

        {/* Radio Component */}
        {shouldShowSection("radio") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Radio Component
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
              <HStack gap={4} mb={4}>
                <Radio size="sm" label="Small" name="size-demo" />
                <Radio size="md" label="Medium" name="size-demo" />
                <Radio size="lg" label="Large" name="size-demo" />
              </HStack>

              <Text mb={3} weight="semibold">
                Radio group
              </Text>
              <VStack gap={2} align="start" mb={4}>
                <Radio name="options" label="Option A" defaultChecked />
                <Radio name="options" label="Option B" />
                <Radio name="options" label="Option C" />
              </VStack>

              <Text mb={3} weight="semibold">
                Disabled state
              </Text>
              <HStack gap={4}>
                <Radio name="disabled-demo" label="Disabled" isDisabled />
                <Radio name="disabled-demo-2" label="Disabled checked" isDisabled defaultChecked />
              </HStack>
            </Box>
          </Box>
        )}

        {/* Switch Component */}
        {shouldShowSection("switch") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Switch Component
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
              <HStack gap={4} mb={4}>
                <Switch size="sm" label="Small" />
                <Switch size="md" label="Medium" />
                <Switch size="lg" label="Large" />
              </HStack>

              <Text mb={3} weight="semibold">
                Without labels
              </Text>
              <HStack gap={4} mb={4}>
                <Switch size="sm" />
                <Switch size="md" />
                <Switch size="lg" />
              </HStack>

              <Text mb={3} weight="semibold">
                On/Off states
              </Text>
              <HStack gap={4} mb={4}>
                <Switch label="Off" />
                <Switch label="On" defaultChecked />
              </HStack>

              <Text mb={3} weight="semibold">
                Disabled state
              </Text>
              <HStack gap={4}>
                <Switch label="Disabled off" isDisabled />
                <Switch label="Disabled on" isDisabled defaultChecked />
              </HStack>
            </Box>
          </Box>
        )}

        {/* FormField Component */}
        {shouldShowSection("formfield") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              FormField Component
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Text mb={3} weight="semibold">
                With helper text
              </Text>
              <Box mb={4} maxW="400px">
                <FormField
                  label="Username"
                  helperText="Choose a unique username"
                >
                  <Input placeholder="Enter username" />
                </FormField>
              </Box>

              <Text mb={3} weight="semibold">
                With error message
              </Text>
              <Box mb={4} maxW="400px">
                <FormField
                  label="Email"
                  isInvalid
                  errorMessage="Please enter a valid email address"
                >
                  <Input placeholder="Enter email" />
                </FormField>
              </Box>

              <Text mb={3} weight="semibold">
                Required field
              </Text>
              <Box mb={4} maxW="400px">
                <FormField
                  label="Password"
                  isRequired
                  helperText="Must be at least 8 characters"
                >
                  <Input type="password" placeholder="Enter password" />
                </FormField>
              </Box>

              <Text mb={3} weight="semibold">
                Disabled field
              </Text>
              <Box mb={4} maxW="400px">
                <FormField
                  label="Read Only"
                  isDisabled
                  helperText="This field is disabled"
                >
                  <Input placeholder="Cannot edit" />
                </FormField>
              </Box>

              <Text mb={3} weight="semibold">
                With Select
              </Text>
              <Box maxW="400px">
                <FormField
                  label="Country"
                  isRequired
                  helperText="Select your country"
                >
                  <Select>
                    <option value="">Choose a country</option>
                    <option value="us">United States</option>
                    <option value="uk">United Kingdom</option>
                    <option value="ca">Canada</option>
                  </Select>
                </FormField>
              </Box>
            </Box>
          </Box>
        )}

        {/* IconButton Component */}
        {shouldShowSection("iconbutton") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              IconButton Component
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
              <HStack gap={3} mb={4}>
                <IconButton icon={<span>+</span>} aria-label="Add" size="sm" />
                <IconButton icon={<span>+</span>} aria-label="Add" size="md" />
                <IconButton icon={<span>+</span>} aria-label="Add" size="lg" />
              </HStack>

              <Text mb={3} weight="semibold">
                Variants
              </Text>
              <HStack gap={3} mb={4}>
                <IconButton icon={<span>+</span>} aria-label="Add" variant="solid" />
                <IconButton icon={<span>+</span>} aria-label="Add" variant="outline" />
                <IconButton icon={<span>+</span>} aria-label="Add" variant="ghost" />
              </HStack>

              <Text mb={3} weight="semibold">
                Color Schemes
              </Text>
              <HStack gap={3} mb={4}>
                <IconButton icon={<span>+</span>} aria-label="Add" colorScheme="primary" />
                <IconButton icon={<span>+</span>} aria-label="Add" colorScheme="accent" />
                <IconButton icon={<span>+</span>} aria-label="Add" colorScheme="success" />
                <IconButton icon={<span>+</span>} aria-label="Add" colorScheme="warning" />
                <IconButton icon={<span>+</span>} aria-label="Add" colorScheme="error" />
                <IconButton icon={<span>+</span>} aria-label="Add" colorScheme="info" />
              </HStack>

              <Text mb={3} weight="semibold">
                States
              </Text>
              <HStack gap={3}>
                <IconButton icon={<span>+</span>} aria-label="Add" disabled />
                <IconButton icon={<span>+</span>} aria-label="Add" loading />
              </HStack>
            </Box>
          </Box>
        )}

        {/* Alert Component */}
        {shouldShowSection("alert") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Alert Component
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Text mb={3} weight="semibold">
                Status Variants
              </Text>
              <VStack gap={3} mb={4}>
                <Alert status="success" title="Success">
                  Your changes have been saved successfully.
                </Alert>
                <Alert status="warning" title="Warning">
                  Please review your input before proceeding.
                </Alert>
                <Alert status="error" title="Error">
                  Something went wrong. Please try again.
                </Alert>
                <Alert status="info" title="Info">
                  New features are available. Check them out!
                </Alert>
              </VStack>

              <Text mb={3} weight="semibold">
                With Close Button
              </Text>
              <Alert
                status="info"
                title="Dismissable"
                onClose={() => alert("Alert dismissed!")}
              >
                Click the X to dismiss this alert.
              </Alert>
            </Box>
          </Box>
        )}

        {/* Badge Component */}
        {shouldShowSection("badge") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Badge Component
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Text mb={3} weight="semibold">
                Color Schemes (Subtle)
              </Text>
              <HStack gap={2} mb={4}>
                <Badge colorScheme="gray">Gray</Badge>
                <Badge colorScheme="primary">Primary</Badge>
                <Badge colorScheme="accent">Accent</Badge>
                <Badge colorScheme="success">Success</Badge>
                <Badge colorScheme="warning">Warning</Badge>
                <Badge colorScheme="error">Error</Badge>
                <Badge colorScheme="info">Info</Badge>
              </HStack>

              <Text mb={3} weight="semibold">
                Color Schemes (Solid)
              </Text>
              <HStack gap={2} mb={4}>
                <Badge colorScheme="gray" variant="solid">Gray</Badge>
                <Badge colorScheme="primary" variant="solid">Primary</Badge>
                <Badge colorScheme="accent" variant="solid">Accent</Badge>
                <Badge colorScheme="success" variant="solid">Success</Badge>
                <Badge colorScheme="warning" variant="solid">Warning</Badge>
                <Badge colorScheme="error" variant="solid">Error</Badge>
                <Badge colorScheme="info" variant="solid">Info</Badge>
              </HStack>

              <Text mb={3} weight="semibold">
                Sizes
              </Text>
              <HStack gap={2}>
                <Badge size="sm">Small</Badge>
                <Badge size="md">Medium</Badge>
              </HStack>
            </Box>
          </Box>
        )}

        {/* Progress Component */}
        {shouldShowSection("progress") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Progress Component
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Text mb={3} weight="semibold">
                Values
              </Text>
              <VStack gap={3} mb={4}>
                <Box>
                  <Text size="sm" color="foreground-muted" mb={1}>25%</Text>
                  <Progress value={25} />
                </Box>
                <Box>
                  <Text size="sm" color="foreground-muted" mb={1}>50%</Text>
                  <Progress value={50} />
                </Box>
                <Box>
                  <Text size="sm" color="foreground-muted" mb={1}>75%</Text>
                  <Progress value={75} />
                </Box>
                <Box>
                  <Text size="sm" color="foreground-muted" mb={1}>100%</Text>
                  <Progress value={100} />
                </Box>
              </VStack>

              <Text mb={3} weight="semibold">
                Sizes
              </Text>
              <VStack gap={3} mb={4}>
                <Progress value={60} size="sm" />
                <Progress value={60} size="md" />
                <Progress value={60} size="lg" />
              </VStack>

              <Text mb={3} weight="semibold">
                Color Schemes
              </Text>
              <VStack gap={3} mb={4}>
                <Progress value={70} colorScheme="primary" />
                <Progress value={70} colorScheme="accent" />
                <Progress value={70} colorScheme="success" />
                <Progress value={70} colorScheme="warning" />
                <Progress value={70} colorScheme="error" />
                <Progress value={70} colorScheme="info" />
              </VStack>

              <Text mb={3} weight="semibold">
                Indeterminate
              </Text>
              <Progress isIndeterminate colorScheme="primary" />
            </Box>
          </Box>
        )}

        {/* Skeleton Component */}
        {shouldShowSection("skeleton") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Skeleton Component
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Text mb={3} weight="semibold">
                Text Placeholder
              </Text>
              <VStack gap={2} mb={4} align="start">
                <Skeleton w="200px" h="16px" />
                <Skeleton w="160px" h="16px" />
                <Skeleton w="180px" h="16px" />
              </VStack>

              <Text mb={3} weight="semibold">
                Avatar Placeholder
              </Text>
              <HStack gap={3} mb={4}>
                <Skeleton w="40px" h="40px" rounded="full" />
                <Skeleton w="48px" h="48px" rounded="full" />
                <Skeleton w="56px" h="56px" rounded="full" />
              </HStack>

              <Text mb={3} weight="semibold">
                Card Placeholder
              </Text>
              <Box p={4} border="thin" borderColor="border" rounded="md" maxW="300px">
                <Skeleton w="100%" h="150px" rounded="md" />
                <Box mt={3}>
                  <Skeleton w="80%" h="20px" />
                </Box>
                <Box mt={2}>
                  <Skeleton w="60%" h="14px" />
                </Box>
              </Box>
            </Box>
          </Box>
        )}

        {/* Avatar Component */}
        {shouldShowSection("avatar") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Avatar Component
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
              <HStack gap={3} mb={4}>
                <Avatar size="sm" name="John Doe" />
                <Avatar size="md" name="Jane Smith" />
                <Avatar size="lg" name="Bob Wilson" />
                <Avatar size="xl" name="Alice Brown" />
              </HStack>

              <Text mb={3} weight="semibold">
                With Images
              </Text>
              <HStack gap={3} mb={4}>
                <Avatar
                  src="https://i.pravatar.cc/150?u=1"
                  name="User 1"
                  size="md"
                />
                <Avatar
                  src="https://i.pravatar.cc/150?u=2"
                  name="User 2"
                  size="md"
                />
                <Avatar
                  src="https://i.pravatar.cc/150?u=3"
                  name="User 3"
                  size="md"
                />
              </HStack>

              <Text mb={3} weight="semibold">
                Rounded Variants
              </Text>
              <HStack gap={3} mb={4}>
                <Avatar name="Full" rounded="full" />
                <Avatar name="Medium" rounded="md" />
              </HStack>

              <Text mb={3} weight="semibold">
                Fallback (no name)
              </Text>
              <Avatar />
            </Box>
          </Box>
        )}

        {/* Card Component */}
        {shouldShowSection("card") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Card Component
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Text mb={3} weight="semibold">
                Basic Card
              </Text>
              <Box mb={4} maxW="400px">
                <Card>
                  <CardBody>
                    <Text>This is a basic card with just body content.</Text>
                  </CardBody>
                </Card>
              </Box>

              <Text mb={3} weight="semibold">
                Card with Header/Body/Footer
              </Text>
              <Box mb={4} maxW="400px">
                <Card>
                  <CardHeader>
                    <Text weight="semibold">Card Title</Text>
                  </CardHeader>
                  <CardBody>
                    <Text>Card body content goes here. It can contain any content you want.</Text>
                  </CardBody>
                  <CardFooter>
                    <HStack gap={2}>
                      <Button size="sm">Action</Button>
                      <Button size="sm" variant="ghost">Cancel</Button>
                    </HStack>
                  </CardFooter>
                </Card>
              </Box>

              <Text mb={3} weight="semibold">
                Shadow Variants
              </Text>
              <HStack gap={4}>
                <Card shadow="none">
                  <CardBody>
                    <Text size="sm">shadow="none"</Text>
                  </CardBody>
                </Card>
                <Card shadow="sm">
                  <CardBody>
                    <Text size="sm">shadow="sm"</Text>
                  </CardBody>
                </Card>
                <Card shadow="md">
                  <CardBody>
                    <Text size="sm">shadow="md"</Text>
                  </CardBody>
                </Card>
              </HStack>
            </Box>
          </Box>
        )}

        {/* Image Component */}
        {shouldShowSection("image") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Image Component
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Text mb={3} weight="semibold">
                Basic Image
              </Text>
              <Box mb={4}>
                <Image
                  src="https://picsum.photos/300/200"
                  alt="Random image"
                  w="300px"
                  h="200px"
                />
              </Box>

              <Text mb={3} weight="semibold">
                Rounded Variants
              </Text>
              <HStack gap={3} mb={4}>
                <Image
                  src="https://picsum.photos/100/100?1"
                  alt="No rounding"
                  w="100px"
                  h="100px"
                  rounded="none"
                />
                <Image
                  src="https://picsum.photos/100/100?2"
                  alt="Medium rounding"
                  w="100px"
                  h="100px"
                  rounded="md"
                />
                <Image
                  src="https://picsum.photos/100/100?3"
                  alt="Full rounding"
                  w="100px"
                  h="100px"
                  rounded="full"
                />
              </HStack>

              <Text mb={3} weight="semibold">
                Error Fallback (broken src)
              </Text>
              <Image
                src="https://invalid-url-that-will-fail.com/image.jpg"
                alt="Broken image"
                w="200px"
                h="150px"
              />
            </Box>
          </Box>
        )}

        {/* List Component */}
        {shouldShowSection("list") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              List Component
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Text mb={3} weight="semibold">
                Unordered List (no bullets)
              </Text>
              <Box mb={4}>
                <List spacing={1}>
                  <ListItem>First item</ListItem>
                  <ListItem>Second item</ListItem>
                  <ListItem>Third item</ListItem>
                </List>
              </Box>

              <Text mb={3} weight="semibold">
                Unordered List (with bullets)
              </Text>
              <Box mb={4}>
                <List styleType="disc" spacing={1}>
                  <ListItem>First item</ListItem>
                  <ListItem>Second item</ListItem>
                  <ListItem>Third item</ListItem>
                </List>
              </Box>

              <Text mb={3} weight="semibold">
                Ordered List
              </Text>
              <Box mb={4}>
                <List as="ol" spacing={1}>
                  <ListItem>Step one</ListItem>
                  <ListItem>Step two</ListItem>
                  <ListItem>Step three</ListItem>
                </List>
              </Box>

              <Text mb={3} weight="semibold">
                List with Icons
              </Text>
              <List spacing={2}>
                <ListItem>
                  <ListIcon>
                    <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </ListIcon>
                  Feature one completed
                </ListItem>
                <ListItem>
                  <ListIcon>
                    <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </ListIcon>
                  Feature two completed
                </ListItem>
                <ListItem>
                  <ListIcon>
                    <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </ListIcon>
                  Feature three completed
                </ListItem>
              </List>
            </Box>
          </Box>
        )}

        {/* Link Component */}
        {shouldShowSection("link") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Link Component
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Text mb={3} weight="semibold">
                Default Variant
              </Text>
              <Box mb={4}>
                <Text>
                  Visit our <Link href="#">documentation</Link> for more details.
                </Text>
              </Box>

              <Text mb={3} weight="semibold">
                Underline Variant
              </Text>
              <Box mb={4}>
                <Text>
                  Read the <Link href="#" variant="underline">terms of service</Link> carefully.
                </Text>
              </Box>

              <Text mb={3} weight="semibold">
                Subtle Variant
              </Text>
              <Box mb={4}>
                <Text>
                  See the <Link href="#" variant="subtle">changelog</Link> for updates.
                </Text>
              </Box>

              <Text mb={3} weight="semibold">
                External Link
              </Text>
              <Text>
                Check out <Link href="https://example.com" external>example.com</Link> (opens in new tab).
              </Text>
            </Box>
          </Box>
        )}

        {/* Tabs Component */}
        {shouldShowSection("tabs") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Tabs Component
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Text mb={3} weight="semibold">
                Line Variant (default)
              </Text>
              <Box mb={4}>
                <Tabs>
                  <TabList>
                    <Tab index={0}>Account</Tab>
                    <Tab index={1}>Security</Tab>
                    <Tab index={2}>Notifications</Tab>
                  </TabList>
                  <TabPanel index={0}>
                    <Text>Manage your account settings and preferences.</Text>
                  </TabPanel>
                  <TabPanel index={1}>
                    <Text>Update your password and security options.</Text>
                  </TabPanel>
                  <TabPanel index={2}>
                    <Text>Configure your notification preferences.</Text>
                  </TabPanel>
                </Tabs>
              </Box>

              <Text mb={3} weight="semibold">
                Enclosed Variant
              </Text>
              <Box mb={4}>
                <Tabs variant="enclosed">
                  <TabList>
                    <Tab index={0}>Overview</Tab>
                    <Tab index={1}>Analytics</Tab>
                    <Tab index={2} disabled>Settings</Tab>
                  </TabList>
                  <TabPanel index={0}>
                    <Text>Project overview and summary.</Text>
                  </TabPanel>
                  <TabPanel index={1}>
                    <Text>View detailed analytics data.</Text>
                  </TabPanel>
                  <TabPanel index={2}>
                    <Text>Settings panel content.</Text>
                  </TabPanel>
                </Tabs>
              </Box>
            </Box>
          </Box>
        )}

        {/* Breadcrumb Component */}
        {shouldShowSection("breadcrumb") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Breadcrumb Component
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Text mb={3} weight="semibold">
                Default Separator
              </Text>
              <Box mb={4}>
                <Breadcrumb>
                  <BreadcrumbItem href="#">Home</BreadcrumbItem>
                  <BreadcrumbItem href="#">Products</BreadcrumbItem>
                  <BreadcrumbItem href="#">Electronics</BreadcrumbItem>
                  <BreadcrumbItem>Smartphones</BreadcrumbItem>
                </Breadcrumb>
              </Box>

              <Text mb={3} weight="semibold">
                Custom Separator
              </Text>
              <Box mb={4}>
                <Breadcrumb separator="→">
                  <BreadcrumbItem href="#">Dashboard</BreadcrumbItem>
                  <BreadcrumbItem href="#">Settings</BreadcrumbItem>
                  <BreadcrumbItem>Profile</BreadcrumbItem>
                </Breadcrumb>
              </Box>

              <Text mb={3} weight="semibold">
                Icon Separator
              </Text>
              <Breadcrumb separator={<span>›</span>}>
                <BreadcrumbItem href="#">Docs</BreadcrumbItem>
                <BreadcrumbItem href="#">Components</BreadcrumbItem>
                <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
              </Breadcrumb>
            </Box>
          </Box>
        )}

        {/* Menu Component */}
        {shouldShowSection("menu") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Menu Component
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Text mb={3} weight="semibold">
                Basic Menu
              </Text>
              <HStack gap={4} mb={4}>
                <Menu>
                  <MenuButton>Actions ▾</MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => alert("Edit clicked")}>Edit</MenuItem>
                    <MenuItem onClick={() => alert("Duplicate clicked")}>Duplicate</MenuItem>
                    <MenuItem onClick={() => alert("Delete clicked")}>Delete</MenuItem>
                  </MenuList>
                </Menu>

                <Menu>
                  <MenuButton variant="outline">Options ▾</MenuButton>
                  <MenuList>
                    <MenuItem>View Details</MenuItem>
                    <MenuItem>Share</MenuItem>
                    <MenuItem disabled>Archive (disabled)</MenuItem>
                  </MenuList>
                </Menu>
              </HStack>

              <Text color="foreground-muted" size="sm">
                Click outside or press Escape to close the menu.
              </Text>
            </Box>
          </Box>
        )}

        {/* Pagination Component */}
        {shouldShowSection("pagination") && (
          <PaginationExample />
        )}

        {/* Modal Component */}
        {shouldShowSection("modal") && (
          <ModalExample />
        )}

        {/* Tooltip Component */}
        {shouldShowSection("tooltip") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Tooltip Component
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Text mb={3} weight="semibold">
                Different Placements
              </Text>
              <HStack gap={4} mb={4}>
                <Tooltip label="Tooltip on top" placement="top">
                  <Button variant="outline" size="sm">Top</Button>
                </Tooltip>
                <Tooltip label="Tooltip on bottom" placement="bottom">
                  <Button variant="outline" size="sm">Bottom</Button>
                </Tooltip>
                <Tooltip label="Tooltip on left" placement="left">
                  <Button variant="outline" size="sm">Left</Button>
                </Tooltip>
                <Tooltip label="Tooltip on right" placement="right">
                  <Button variant="outline" size="sm">Right</Button>
                </Tooltip>
              </HStack>

              <Text mb={3} weight="semibold">
                With Delay
              </Text>
              <HStack gap={4} mb={4}>
                <Tooltip label="Instant tooltip" openDelay={0}>
                  <Button variant="outline" size="sm">No delay</Button>
                </Tooltip>
                <Tooltip label="Delayed tooltip" openDelay={500}>
                  <Button variant="outline" size="sm">500ms delay</Button>
                </Tooltip>
              </HStack>

              <Text mb={3} weight="semibold">
                Disabled
              </Text>
              <Tooltip label="This won't show" isDisabled>
                <Button variant="ghost" size="sm">Tooltip disabled</Button>
              </Tooltip>
            </Box>
          </Box>
        )}

        {/* Popover Component */}
        {shouldShowSection("popover") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Popover Component
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Text mb={3} weight="semibold">
                Different Placements
              </Text>
              <HStack gap={4} mb={4}>
                <Popover
                  placement="top"
                  content={
                    <>
                      <PopoverHeader>Popover Top</PopoverHeader>
                      <PopoverBody>
                        <Text size="sm">Content appears above the trigger.</Text>
                      </PopoverBody>
                    </>
                  }
                >
                  <Button variant="outline" size="sm">Top</Button>
                </Popover>
                <Popover
                  placement="bottom"
                  content={
                    <>
                      <PopoverHeader>Popover Bottom</PopoverHeader>
                      <PopoverBody>
                        <Text size="sm">Content appears below the trigger.</Text>
                      </PopoverBody>
                    </>
                  }
                >
                  <Button variant="outline" size="sm">Bottom</Button>
                </Popover>
                <Popover
                  placement="left"
                  content={
                    <>
                      <PopoverHeader>Left</PopoverHeader>
                      <PopoverBody>
                        <Text size="sm">Content on left.</Text>
                      </PopoverBody>
                    </>
                  }
                >
                  <Button variant="outline" size="sm">Left</Button>
                </Popover>
                <Popover
                  placement="right"
                  content={
                    <>
                      <PopoverHeader>Right</PopoverHeader>
                      <PopoverBody>
                        <Text size="sm">Content on right.</Text>
                      </PopoverBody>
                    </>
                  }
                >
                  <Button variant="outline" size="sm">Right</Button>
                </Popover>
              </HStack>

              <Text color="foreground-muted" size="sm">
                Click trigger to open, click outside or press Escape to close.
              </Text>
            </Box>
          </Box>
        )}

        {/* Accordion Component */}
        {shouldShowSection("accordion") && (
          <Box as="section" mb={8}>
            <Heading level={2} mb={4}>
              Accordion Component
            </Heading>
            <Box
              p={4}
              bg="surface"
              border="thin"
              borderColor="border"
              rounded="md"
            >
              <Text mb={3} weight="semibold">
                Single Expand (default)
              </Text>
              <Box mb={4} maxW="500px">
                <Accordion defaultIndex={0}>
                  <AccordionItem index={0} title="Section 1">
                    <Text>Content for section 1. Only one section can be open at a time.</Text>
                  </AccordionItem>
                  <AccordionItem index={1} title="Section 2">
                    <Text>Content for section 2. Clicking opens this and closes others.</Text>
                  </AccordionItem>
                  <AccordionItem index={2} title="Section 3">
                    <Text>Content for section 3.</Text>
                  </AccordionItem>
                </Accordion>
              </Box>

              <Text mb={3} weight="semibold">
                Multiple Expand
              </Text>
              <Box mb={4} maxW="500px">
                <Accordion allowMultiple defaultIndex={[0, 1]}>
                  <AccordionItem index={0} title="FAQ Item 1">
                    <Text>Multiple items can be expanded simultaneously.</Text>
                  </AccordionItem>
                  <AccordionItem index={1} title="FAQ Item 2">
                    <Text>This is also expanded by default.</Text>
                  </AccordionItem>
                  <AccordionItem index={2} title="FAQ Item 3 (Disabled)" isDisabled>
                    <Text>This item is disabled.</Text>
                  </AccordionItem>
                </Accordion>
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
