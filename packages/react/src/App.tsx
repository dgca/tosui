import "./App.css";
import { Box } from "@/components/Box/Box";
import { Text } from "@/components/Text/Text";
import { Heading } from "@/components/Heading/Heading";

function App() {
  return (
    <Box p={8}>
      <h1>TOSUI StyleX Component Playground</h1>

      {/* Spacing Tests */}
      <section>
        <h2>Spacing</h2>
        <Box p={4} mb={3} style={{ backgroundColor: "#dbeafe" }}>
          Padding on all sides (p=4)
        </Box>
        <Box px={6} py={2} mb={3} style={{ backgroundColor: "#fef3c7" }}>
          Horizontal & vertical padding (px=6, py=2)
        </Box>
        <Box p={4} pt={8} mb={6} style={{ backgroundColor: "#dcfce7" }}>
          Override top padding (p=4, pt=8)
        </Box>

        {/* Responsive Spacing */}
        <h3>Responsive Spacing</h3>
        <Box
          p={{ base: 2, sm: 4, md: 6, lg: 8 }}
          mb={3}
          style={{ backgroundColor: "#dbeafe" }}
        >
          Responsive padding - increases from 2 (mobile) → 4 (sm) → 6 (md) → 8
          (lg)
        </Box>
        <Box
          px={{ base: 2, md: 8 }}
          py={{ base: 1, md: 4 }}
          mb={3}
          style={{ backgroundColor: "#fef3c7" }}
        >
          Responsive axes - px: 2→8 (md+), py: 1→4 (md+)
        </Box>
        <Box
          p={4}
          pt={{ base: 2, sm: 4, md: 8, lg: 12 }}
          mb={{ base: 2, sm: 4, md: 8, lg: 12 }}
          style={{ backgroundColor: "#dcfce7" }}
        >
          Mixed static + responsive - p=4 (all sides), pt grows: 2→4→8→12
        </Box>
      </section>

      {/* Layout - Display & Flexbox */}
      <section>
        <h2>Layout - Display & Flexbox</h2>
        <Box
          display="flex"
          gap={4}
          justifyContent="space-between"
          alignItems="center"
          mb={3}
          p={4}
          style={{ border: "1px solid #e5e7eb" }}
        >
          <Box p={3} style={{ backgroundColor: "#dbeafe" }}>
            Flex Item 1
          </Box>
          <Box p={3} style={{ backgroundColor: "#fef3c7" }}>
            Flex Item 2
          </Box>
          <Box p={3} style={{ backgroundColor: "#dcfce7" }}>
            Flex Item 3
          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          p={4}
          mb={6}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <Box>Flex Column - Item 1</Box>
          <Box>Flex Column - Item 2</Box>
          <Box>Flex Column - Item 3</Box>
        </Box>
      </section>

      {/* Sizing */}
      <section>
        <h2>Sizing</h2>
        <Box
          w="100%"
          h="100px"
          p={4}
          mb={2}
          style={{ backgroundColor: "#dbeafe" }}
        >
          Full width (w="100%"), fixed height (h="100px")
        </Box>
        <Box
          w="50%"
          h="80px"
          p={4}
          mb={2}
          style={{ backgroundColor: "#fef3c7" }}
        >
          Half width (w="50%")
        </Box>
        <Box
          w={80}
          h={80}
          p={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{ backgroundColor: "#dcfce7" }}
          mb={2}
        >
          Square (w={"{80}"}, h={"{80}"})
        </Box>
        <Box
          minW="200px"
          maxW="400px"
          w="100%"
          p={4}
          mb={6}
          style={{ backgroundColor: "#fce7f3" }}
        >
          Constrained width (minW="200px", maxW="400px")
        </Box>
      </section>

      {/* Grid Layout */}
      <section>
        <h2>Grid Layout</h2>
        <Box
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          gap={4}
          p={4}
          mb={3}
          style={{ border: "1px solid #e5e7eb" }}
        >
          <Box p={4} style={{ backgroundColor: "#dbeafe" }}>
            Grid 1
          </Box>
          <Box p={4} style={{ backgroundColor: "#fef3c7" }}>
            Grid 2
          </Box>
          <Box p={4} style={{ backgroundColor: "#dcfce7" }}>
            Grid 3
          </Box>
          <Box p={4} style={{ backgroundColor: "#fce7f3" }}>
            Grid 4
          </Box>
          <Box
            p={4}
            justifySelf="center"
            style={{ backgroundColor: "#e0e7ff" }}
          >
            Grid 5 (justifySelf="center")
          </Box>
          <Box p={4} style={{ backgroundColor: "#fef9c3" }}>
            Grid 6
          </Box>
        </Box>

        <Box
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)"
          gridTemplateRows="100px 150px"
          gap={3}
          p={4}
          mb={6}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <Box p={3} style={{ backgroundColor: "#dbeafe" }}>
            Custom rows: 100px
          </Box>
          <Box p={3} style={{ backgroundColor: "#fef3c7" }}>
            Custom rows: 100px
          </Box>
          <Box p={3} style={{ backgroundColor: "#dcfce7" }}>
            This row: 150px
          </Box>
          <Box p={3} style={{ backgroundColor: "#fce7f3" }}>
            This row: 150px
          </Box>
        </Box>
      </section>

      {/* Overflow */}
      <section>
        <h2>Overflow</h2>
        <Box
          w="300px"
          h="100px"
          overflow="auto"
          p={4}
          mb={3}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <Box>This content is taller than the container.</Box>
          <Box>Scroll to see more content.</Box>
          <Box>Line 3</Box>
          <Box>Line 4</Box>
          <Box>Line 5</Box>
          <Box>Line 6</Box>
        </Box>
        <Box
          w="200px"
          h="60px"
          overflow="hidden"
          p={4}
          mb={6}
          style={{ backgroundColor: "#fef3c7" }}
        >
          This text overflows but is hidden. You can't see the rest of this very
          long sentence.
        </Box>
      </section>

      {/* Position & Z-Index */}
      <section>
        <h2>Position & Z-Index & Inset</h2>
        <Box
          position="relative"
          h="150px"
          mb={3}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <p>Relative container with stacked boxes (using zIndex)</p>
          <Box
            position="absolute"
            top={10}
            left={0}
            w="200px"
            h="100px"
            p={4}
            zIndex="base"
            style={{ backgroundColor: "#dbeafe" }}
          >
            Base layer (zIndex="base")
          </Box>
          <Box
            position="absolute"
            top={15}
            left={15}
            w="200px"
            h="100px"
            p={4}
            zIndex="dropdown"
            style={{ backgroundColor: "#fef3c7" }}
          >
            Dropdown layer (zIndex="dropdown")
          </Box>
          <Box
            position="absolute"
            top={20}
            left={30}
            w="200px"
            h="100px"
            p={4}
            zIndex="modal"
            style={{ backgroundColor: "#dcfce7" }}
          >
            Modal layer (zIndex="modal")
          </Box>
        </Box>

        <Box
          position="relative"
          h="200px"
          mb={6}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <p>Positioned boxes using inset props</p>
          <Box
            position="absolute"
            top={2}
            right={2}
            p={2}
            style={{ backgroundColor: "#dbeafe", fontSize: "12px" }}
          >
            Top Right (top={"{2}"}, right={"{2}"})
          </Box>
          <Box
            position="absolute"
            bottom={2}
            left={2}
            p={2}
            style={{ backgroundColor: "#fef3c7", fontSize: "12px" }}
          >
            Bottom Left (bottom={"{2}"}, left={"{2}"})
          </Box>
          <Box
            position="absolute"
            insetY={0}
            right={2}
            p={2}
            display="flex"
            alignItems="center"
            style={{ backgroundColor: "#dcfce7", fontSize: "12px" }}
          >
            Right Edge (insetY={"{0}"}, right={"{2}"})
          </Box>
        </Box>
      </section>

      {/* Colors */}
      <section>
        <h2>Colors</h2>

        {/* Text Colors */}
        <Box
          mb={3}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <h3 style={{ marginTop: 0 }}>Text Colors</h3>
          <Box color="foreground" mb={2}>
            Foreground (color="foreground")
          </Box>
          <Box color="foreground-muted" mb={2}>
            Foreground Muted (color="foreground-muted")
          </Box>
          <Box color="foreground-subtle" mb={2}>
            Foreground Subtle (color="foreground-subtle")
          </Box>
          <Box color="primary" mb={2}>
            Primary (color="primary")
          </Box>
          <Box color="primary-emphasis" mb={2}>
            Primary Emphasis (color="primary-emphasis")
          </Box>
          <Box color="accent" mb={2}>
            Accent (color="accent")
          </Box>
          <Box color="accent-emphasis" mb={2}>
            Accent Emphasis (color="accent-emphasis")
          </Box>
          <Box color="success" mb={2}>
            Success (color="success")
          </Box>
          <Box color="error" mb={2}>
            Error (color="error")
          </Box>
          <Box color="warning" mb={2}>
            Warning (color="warning")
          </Box>
          <Box color="info">Info (color="info")</Box>
        </Box>

        {/* Background Colors */}
        <Box
          mb={3}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <h3 style={{ marginTop: 0 }}>Background Colors</h3>
          <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
            <Box bg="primary-subtle" p={3}>
              primary-subtle
            </Box>
            <Box bg="primary-default" p={3} color="foreground">
              primary-default
            </Box>
            <Box bg="primary-emphasis" p={3} color="foreground">
              primary-emphasis
            </Box>
            <Box bg="accent-subtle" p={3}>
              accent-subtle
            </Box>
            <Box bg="accent-default" p={3} color="foreground">
              accent-default
            </Box>
            <Box bg="accent-emphasis" p={3} color="foreground">
              accent-emphasis
            </Box>
            <Box bg="success-subtle" p={3}>
              success-subtle
            </Box>
            <Box bg="success-default" p={3} color="foreground">
              success-default
            </Box>
            <Box bg="success-emphasis" p={3} color="foreground">
              success-emphasis
            </Box>
            <Box bg="warning-subtle" p={3}>
              warning-subtle
            </Box>
            <Box bg="warning-default" p={3}>
              warning-default
            </Box>
            <Box bg="warning-emphasis" p={3}>
              warning-emphasis
            </Box>
            <Box bg="error-subtle" p={3}>
              error-subtle
            </Box>
            <Box bg="error-default" p={3} color="foreground">
              error-default
            </Box>
            <Box bg="error-emphasis" p={3} color="foreground">
              error-emphasis
            </Box>
            <Box bg="info-subtle" p={3}>
              info-subtle
            </Box>
            <Box bg="info-default" p={3} color="foreground">
              info-default
            </Box>
            <Box bg="info-emphasis" p={3} color="foreground">
              info-emphasis
            </Box>
          </Box>
        </Box>

        {/* Border Colors */}
        <Box
          mb={6}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <h3 style={{ marginTop: 0 }}>Border Colors</h3>
          <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={3}>
            <Box
              p={3}
              borderColor="border"
              style={{ borderWidth: "2px", borderStyle: "solid" }}
            >
              border
            </Box>
            <Box
              p={3}
              borderColor="border-muted"
              style={{ borderWidth: "2px", borderStyle: "solid" }}
            >
              border-muted
            </Box>
            <Box
              p={3}
              borderColor="primary"
              style={{ borderWidth: "2px", borderStyle: "solid" }}
            >
              primary
            </Box>
            <Box
              p={3}
              borderColor="accent"
              style={{ borderWidth: "2px", borderStyle: "solid" }}
            >
              accent
            </Box>
            <Box
              p={3}
              borderColor="success"
              style={{ borderWidth: "2px", borderStyle: "solid" }}
            >
              success
            </Box>
            <Box
              p={3}
              borderColor="warning"
              style={{ borderWidth: "2px", borderStyle: "solid" }}
            >
              warning
            </Box>
            <Box
              p={3}
              borderColor="error"
              style={{ borderWidth: "2px", borderStyle: "solid" }}
            >
              error
            </Box>
            <Box
              p={3}
              borderColor="info"
              style={{ borderWidth: "2px", borderStyle: "solid" }}
            >
              info
            </Box>
          </Box>
        </Box>
      </section>

      {/* Borders */}
      <section>
        <h2>Borders</h2>

        {/* Border Widths */}
        <Box
          mb={3}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <h3 style={{ marginTop: 0 }}>Border Widths</h3>
          <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={3}>
            <Box p={4} border="thin" borderColor="border">
              border="thin"
            </Box>
            <Box p={4} border="medium" borderColor="border">
              border="medium"
            </Box>
            <Box p={4} border="thick" borderColor="border">
              border="thick"
            </Box>
            <Box p={4} borderX="medium" borderColor="primary">
              borderX="medium"
            </Box>
            <Box p={4} borderY="medium" borderColor="accent">
              borderY="medium"
            </Box>
            <Box p={4} borderTop="thick" borderColor="success">
              borderTop="thick"
            </Box>
          </Box>
        </Box>

        {/* Border Styles */}
        <Box
          mb={3}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <h3 style={{ marginTop: 0 }}>Border Styles</h3>
          <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={3}>
            <Box p={4} border="medium" borderStyle="solid" borderColor="border">
              borderStyle="solid"
            </Box>
            <Box
              p={4}
              border="medium"
              borderStyle="dashed"
              borderColor="border"
            >
              borderStyle="dashed"
            </Box>
            <Box
              p={4}
              border="medium"
              borderStyle="dotted"
              borderColor="border"
            >
              borderStyle="dotted"
            </Box>
            <Box p={4} border="medium" borderStyle="none" borderColor="border">
              borderStyle="none"
            </Box>
          </Box>
        </Box>

        {/* Cascading Specificity */}
        <Box
          mb={6}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <h3 style={{ marginTop: 0 }}>Cascading Specificity</h3>
          <Box display="flex" flexDirection="column" gap={3}>
            <Box p={4} border="thin" borderTop="thick" borderColor="primary">
              border="thin" borderTop="thick" (top overrides all)
            </Box>
            <Box p={4} border="thin" borderY="medium" borderColor="accent">
              border="thin" borderY="medium" (Y axis overrides all)
            </Box>
            <Box
              p={4}
              border="thin"
              borderY="medium"
              borderBottom="thick"
              borderColor="success"
            >
              border="thin" borderY="medium" borderBottom="thick" (specific
              overrides axis)
            </Box>
          </Box>
        </Box>
      </section>

      {/* Roundness */}
      <section>
        <h2>Border Radius (Roundness)</h2>

        {/* Basic Roundness */}
        <Box
          mb={3}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <h3 style={{ marginTop: 0 }}>Basic Roundness</h3>
          <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={3}>
            <Box
              p={4}
              rounded="none"
              border="medium"
              borderColor="border"
              bg="primary-subtle"
            >
              rounded="none"
            </Box>
            <Box
              p={4}
              rounded="sm"
              border="medium"
              borderColor="border"
              bg="primary-subtle"
            >
              rounded="sm"
            </Box>
            <Box
              p={4}
              rounded="md"
              border="medium"
              borderColor="border"
              bg="primary-subtle"
            >
              rounded="md"
            </Box>
            <Box
              p={4}
              rounded="lg"
              border="medium"
              borderColor="border"
              bg="primary-subtle"
            >
              rounded="lg"
            </Box>
            <Box
              p={4}
              rounded="full"
              border="medium"
              borderColor="border"
              bg="primary-subtle"
            >
              rounded="full"
            </Box>
          </Box>
        </Box>

        {/* Edge-specific Roundness */}
        <Box
          mb={3}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <h3 style={{ marginTop: 0 }}>Edge-specific Roundness</h3>
          <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={3}>
            <Box
              p={4}
              roundedTop="lg"
              border="medium"
              borderColor="primary"
              bg="accent-subtle"
            >
              roundedTop="lg"
            </Box>
            <Box
              p={4}
              roundedBottom="lg"
              border="medium"
              borderColor="accent"
              bg="accent-subtle"
            >
              roundedBottom="lg"
            </Box>
            <Box
              p={4}
              roundedLeft="lg"
              border="medium"
              borderColor="success"
              bg="success-subtle"
            >
              roundedLeft="lg"
            </Box>
            <Box
              p={4}
              roundedRight="lg"
              border="medium"
              borderColor="warning"
              bg="warning-subtle"
            >
              roundedRight="lg"
            </Box>
          </Box>
        </Box>

        {/* Corner-specific Roundness */}
        <Box
          mb={3}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <h3 style={{ marginTop: 0 }}>Corner-specific Roundness</h3>
          <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={3}>
            <Box
              p={4}
              roundedTopLeft="full"
              border="medium"
              borderColor="border"
              bg="info-subtle"
            >
              roundedTopLeft="full"
            </Box>
            <Box
              p={4}
              roundedTopRight="full"
              border="medium"
              borderColor="border"
              bg="info-subtle"
            >
              roundedTopRight="full"
            </Box>
            <Box
              p={4}
              roundedBottomLeft="full"
              border="medium"
              borderColor="border"
              bg="info-subtle"
            >
              roundedBottomLeft="full"
            </Box>
            <Box
              p={4}
              roundedBottomRight="full"
              border="medium"
              borderColor="border"
              bg="info-subtle"
            >
              roundedBottomRight="full"
            </Box>
          </Box>
        </Box>

        {/* Cascading Specificity */}
        <Box
          mb={6}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <h3 style={{ marginTop: 0 }}>Cascading Specificity</h3>
          <Box display="flex" flexDirection="column" gap={3}>
            <Box
              p={4}
              rounded="sm"
              roundedTop="lg"
              border="medium"
              borderColor="primary"
              bg="primary-subtle"
            >
              rounded="sm" roundedTop="lg" (top edge overrides all)
            </Box>
            <Box
              p={4}
              rounded="sm"
              roundedLeft="md"
              border="medium"
              borderColor="accent"
              bg="accent-subtle"
            >
              rounded="sm" roundedLeft="md" (left edge overrides all)
            </Box>
            <Box
              p={4}
              rounded="sm"
              roundedTop="md"
              roundedTopRight="full"
              border="medium"
              borderColor="success"
              bg="success-subtle"
            >
              rounded="sm" roundedTop="md" roundedTopRight="full" (corner
              overrides edge)
            </Box>
          </Box>
        </Box>
      </section>

      {/* Shadows */}
      <section>
        <h2>Box Shadow</h2>
        <Box
          mb={6}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={4}>
            <Box
              p={6}
              shadow="none"
              bg="surface"
              border="thin"
              borderColor="border"
            >
              shadow="none"
            </Box>
            <Box p={6} shadow="sm" bg="surface">
              shadow="sm"
            </Box>
            <Box p={6} shadow="md" bg="surface">
              shadow="md"
            </Box>
            <Box p={6} shadow="lg" bg="surface">
              shadow="lg"
            </Box>
          </Box>
        </Box>
      </section>

      {/* Interactions */}
      <section>
        <h2>Interactions</h2>

        {/* Cursor */}
        <Box
          mb={3}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <h3 style={{ marginTop: 0 }}>Cursor</h3>
          <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={3}>
            <Box
              p={3}
              cursor="pointer"
              bg="primary-subtle"
              border="thin"
              borderColor="primary"
            >
              cursor="pointer"
            </Box>
            <Box
              p={3}
              cursor="grab"
              bg="accent-subtle"
              border="thin"
              borderColor="accent"
            >
              cursor="grab"
            </Box>
            <Box
              p={3}
              cursor="notAllowed"
              bg="error-subtle"
              border="thin"
              borderColor="error"
            >
              cursor="notAllowed"
            </Box>
            <Box
              p={3}
              cursor="move"
              bg="success-subtle"
              border="thin"
              borderColor="success"
            >
              cursor="move"
            </Box>
            <Box
              p={3}
              cursor="help"
              bg="info-subtle"
              border="thin"
              borderColor="info"
            >
              cursor="help"
            </Box>
            <Box
              p={3}
              cursor="wait"
              bg="warning-subtle"
              border="thin"
              borderColor="warning"
            >
              cursor="wait"
            </Box>
          </Box>
        </Box>

        {/* Pointer Events */}
        <Box
          mb={3}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <h3 style={{ marginTop: 0 }}>Pointer Events</h3>
          <Box display="flex" gap={3}>
            <Box
              p={4}
              pointerEvents="auto"
              bg="surface"
              border="medium"
              borderColor="border"
            >
              pointerEvents="auto" (default)
            </Box>
            <Box
              p={4}
              pointerEvents="none"
              bg="surface"
              border="medium"
              borderColor="border"
              style={{ opacity: 0.5 }}
            >
              pointerEvents="none" (click through)
            </Box>
          </Box>
        </Box>

        {/* User Select */}
        <Box
          mb={6}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <h3 style={{ marginTop: 0 }}>User Select</h3>
          <Box display="flex" flexDirection="column" gap={3}>
            <Box
              p={4}
              userSelect="auto"
              bg="surface"
              border="thin"
              borderColor="border"
            >
              userSelect="auto" - Try selecting this text
            </Box>
            <Box
              p={4}
              userSelect="none"
              bg="surface"
              border="thin"
              borderColor="border"
            >
              userSelect="none" - You cannot select this text
            </Box>
            <Box
              p={4}
              userSelect="text"
              bg="surface"
              border="thin"
              borderColor="border"
            >
              userSelect="text" - This text is selectable
            </Box>
            <Box
              p={4}
              userSelect="all"
              bg="surface"
              border="thin"
              borderColor="border"
            >
              userSelect="all" - Click once to select all
            </Box>
          </Box>
        </Box>
      </section>

      {/* Text */}
      <section>
        <h2>Text</h2>

        {/* Text Align */}
        <Box
          mb={3}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <h3 style={{ marginTop: 0 }}>Text Align</h3>
          <Box display="flex" flexDirection="column" gap={3}>
            <Box
              p={3}
              textAlign="left"
              bg="surface"
              border="thin"
              borderColor="border"
            >
              textAlign="left" - This text is aligned to the left
            </Box>
            <Box
              p={3}
              textAlign="center"
              bg="surface"
              border="thin"
              borderColor="border"
            >
              textAlign="center" - This text is centered
            </Box>
            <Box
              p={3}
              textAlign="right"
              bg="surface"
              border="thin"
              borderColor="border"
            >
              textAlign="right" - This text is aligned to the right
            </Box>
            <Box
              p={3}
              textAlign="justify"
              bg="surface"
              border="thin"
              borderColor="border"
            >
              textAlign="justify" - This text is justified. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </Box>
          </Box>
        </Box>

        {/* White Space */}
        <Box
          mb={6}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <h3 style={{ marginTop: 0 }}>White Space</h3>
          <Box display="flex" flexDirection="column" gap={3}>
            <Box
              p={3}
              whiteSpace="normal"
              bg="surface"
              border="thin"
              borderColor="border"
            >
              whiteSpace="normal" - Text wraps normally and multiple spaces
              collapse
            </Box>
            <Box
              p={3}
              whiteSpace="nowrap"
              bg="surface"
              border="thin"
              borderColor="border"
              overflow="auto"
            >
              whiteSpace="nowrap" - This text will not wrap to a new line even
              if it's very long
            </Box>
            <Box
              p={3}
              whiteSpace="pre"
              bg="surface"
              border="thin"
              borderColor="border"
            >
              whiteSpace="pre" - Preserves spaces and newlines
            </Box>
            <Box
              p={3}
              whiteSpace="preWrap"
              bg="surface"
              border="thin"
              borderColor="border"
            >
              whiteSpace="preWrap" - Preserves spaces but wraps text
            </Box>
            <Box
              p={3}
              whiteSpace="preLine"
              bg="surface"
              border="thin"
              borderColor="border"
            >
              whiteSpace="preLine" - Collapses spaces but preserves newlines
            </Box>
          </Box>
        </Box>
      </section>

      {/* Opacity */}
      <section>
        <h2>Opacity</h2>
        <Box
          mb={6}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={3}>
            <Box
              p={4}
              opacity="full"
              bg="primary-default"
              color="foreground"
              border="thin"
              borderColor="primary"
            >
              opacity="full" (1.0)
            </Box>
            <Box
              p={4}
              opacity="semi"
              bg="primary-default"
              color="foreground"
              border="thin"
              borderColor="primary"
            >
              opacity="semi" (0.6)
            </Box>
            <Box
              p={4}
              opacity="faint"
              bg="primary-default"
              color="foreground"
              border="thin"
              borderColor="primary"
            >
              opacity="faint" (0.4)
            </Box>
            <Box
              p={4}
              opacity="invisible"
              bg="primary-default"
              color="foreground"
              border="thin"
              borderColor="primary"
            >
              opacity="invisible" (0.0) - You can't see this
            </Box>
          </Box>
        </Box>
      </section>

      {/* Typography */}
      <section>
        <h2>Typography</h2>
        <Box
          mb={3}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <Box fontSize="xs" mb={2}>
            Extra Small (fontSize="xs")
          </Box>
          <Box fontSize="sm" mb={2}>
            Small (fontSize="sm")
          </Box>
          <Box fontSize="md" mb={2}>
            Medium (fontSize="md")
          </Box>
          <Box fontSize="lg" mb={2}>
            Large (fontSize="lg")
          </Box>
          <Box fontSize="xl" mb={2}>
            Extra Large (fontSize="xl")
          </Box>
          <Box fontSize="2xl" mb={2}>
            2XL (fontSize="2xl")
          </Box>
          <Box fontSize="3xl" mb={2}>
            3XL (fontSize="3xl")
          </Box>
          <Box fontSize="4xl" mb={2}>
            4XL (fontSize="4xl")
          </Box>
          <Box fontSize="5xl">5XL (fontSize="5xl")</Box>
        </Box>

        <Box
          mb={3}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <Box fontFamily="body" mb={2}>
            Body font (fontFamily="body")
          </Box>
          <Box fontFamily="heading" mb={2}>
            Heading font (fontFamily="heading")
          </Box>
          <Box fontFamily="mono">Monospace font (fontFamily="mono")</Box>
        </Box>

        <Box
          mb={3}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <Box fontWeight="normal" mb={2}>
            Normal weight (fontWeight="normal")
          </Box>
          <Box fontWeight="medium" mb={2}>
            Medium weight (fontWeight="medium")
          </Box>
          <Box fontWeight="semibold" mb={2}>
            Semibold weight (fontWeight="semibold")
          </Box>
          <Box fontWeight="bold">Bold weight (fontWeight="bold")</Box>
        </Box>

        <Box
          mb={6}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <Box
            lineHeight="tight"
            mb={2}
            style={{ border: "1px dashed #cbd5e1" }}
          >
            Tight line height. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </Box>
          <Box
            lineHeight="normal"
            mb={2}
            style={{ border: "1px dashed #cbd5e1" }}
          >
            Normal line height. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </Box>
          <Box lineHeight="relaxed" style={{ border: "1px dashed #cbd5e1" }}>
            Relaxed line height. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </Box>
        </Box>
      </section>

      {/* Polymorphic */}
      <section>
        <h2>Polymorphic Components</h2>
        <Box
          as="button"
          p={4}
          px={6}
          mb={3}
          onClick={() => alert("Button clicked!")}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Box as Button
        </Box>
        <Box
          as="a"
          href="https://example.com"
          target="_blank"
          p={2}
          display="inline-block"
          style={{ color: "#2563eb", textDecoration: "underline" }}
        >
          Box as Link
        </Box>
      </section>

      {/* Text Component */}
      <section>
        <h2>Text Component</h2>

        {/* Text Sizes */}
        <Box
          mb={3}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <h3 style={{ marginTop: 0 }}>Text Sizes (size prop)</h3>
          <Box display="flex" flexDirection="column" gap={2}>
            <Text size="xs">Extra Small (size="xs")</Text>
            <Text size="sm">Small (size="sm")</Text>
            <Text size="md">Medium (size="md")</Text>
            <Text size="lg">Large (size="lg")</Text>
            <Text size="xl">Extra Large (size="xl")</Text>
            <Text size="2xl">2XL (size="2xl")</Text>
            <Text size="3xl">3XL (size="3xl")</Text>
          </Box>
        </Box>

        {/* Text Weights */}
        <Box
          mb={3}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <h3 style={{ marginTop: 0 }}>Text Weights (weight prop)</h3>
          <Box display="flex" flexDirection="column" gap={2}>
            <Text weight="normal">Normal weight (weight="normal")</Text>
            <Text weight="medium">Medium weight (weight="medium")</Text>
            <Text weight="semibold">Semibold weight (weight="semibold")</Text>
            <Text weight="bold">Bold weight (weight="bold")</Text>
          </Box>
        </Box>

        {/* Text Colors */}
        <Box
          mb={3}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <h3 style={{ marginTop: 0 }}>Text Colors (color prop)</h3>
          <Box display="flex" flexDirection="column" gap={2}>
            <Text color="foreground">Foreground (color="foreground")</Text>
            <Text color="foreground-muted">
              Foreground Muted (color="foreground-muted")
            </Text>
            <Text color="foreground-subtle">
              Foreground Subtle (color="foreground-subtle")
            </Text>
            <Text color="primary">Primary (color="primary")</Text>
            <Text color="accent">Accent (color="accent")</Text>
            <Text color="success">Success (color="success")</Text>
            <Text color="error">Error (color="error")</Text>
            <Text color="warning">Warning (color="warning")</Text>
          </Box>
        </Box>

        {/* Text Alignment */}
        <Box
          mb={3}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <h3 style={{ marginTop: 0 }}>Text Alignment (align prop)</h3>
          <Box display="flex" flexDirection="column" gap={2}>
            <Text
              align="left"
              p={2}
              bg="surface"
              border="thin"
              borderColor="border"
            >
              Left aligned (align="left")
            </Text>
            <Text
              align="center"
              p={2}
              bg="surface"
              border="thin"
              borderColor="border"
            >
              Center aligned (align="center")
            </Text>
            <Text
              align="right"
              p={2}
              bg="surface"
              border="thin"
              borderColor="border"
            >
              Right aligned (align="right")
            </Text>
            <Text
              align="justify"
              p={2}
              bg="surface"
              border="thin"
              borderColor="border"
            >
              Justified text (align="justify"). Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua.
            </Text>
          </Box>
        </Box>

        {/* Text Utilities */}
        <Box
          mb={3}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <h3 style={{ marginTop: 0 }}>Text Utilities</h3>
          <Box display="flex" flexDirection="column" gap={2}>
            <Text italic>Italic text (italic={"{true}"})</Text>
            <Box
              w="200px"
              p={2}
              bg="surface"
              border="thin"
              borderColor="border"
            >
              <Text truncate>
                Truncated text with ellipsis (truncate={"{true}"}). This is a
                very long text that will be truncated.
              </Text>
            </Box>
            <Text italic weight="bold" color="primary" size="lg">
              Combined: italic + bold + primary + large
            </Text>
          </Box>
        </Box>

        {/* Polymorphic Text */}
        <Box
          mb={6}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <h3 style={{ marginTop: 0 }}>Polymorphic Text</h3>
          <Box display="flex" flexDirection="column" gap={2}>
            <Text as="span" size="md" color="foreground">
              Default: Text as span (inline)
            </Text>
            <Text as="p" size="md" color="primary">
              Text as paragraph (as="p")
            </Text>
            <Text
              as="div"
              size="md"
              color="accent"
              p={3}
              bg="accent-subtle"
              border="thin"
              borderColor="accent"
            >
              Text as div with Box props (as="div", p, bg, border)
            </Text>
            <Text
              as="label"
              size="sm"
              weight="semibold"
              color="foreground-muted"
            >
              Text as label (as="label")
            </Text>
          </Box>
        </Box>
      </section>

      {/* Heading Component */}
      <section>
        <h2>Heading Component</h2>

        {/* Heading Levels */}
        <Box
          mb={3}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <h3 style={{ marginTop: 0 }}>Heading Levels (level prop)</h3>
          <Box display="flex" flexDirection="column" gap={3}>
            <Heading level={1}>Heading Level 1 (default: 3xl, bold)</Heading>
            <Heading level={2}>Heading Level 2 (default: 2xl, bold)</Heading>
            <Heading level={3}>Heading Level 3 (default: xl, bold)</Heading>
            <Heading level={4}>Heading Level 4 (default: lg, bold)</Heading>
            <Heading level={5}>Heading Level 5 (default: md, bold)</Heading>
            <Heading level={6}>Heading Level 6 (default: sm, bold)</Heading>
          </Box>
        </Box>

        {/* Override Size */}
        <Box
          mb={3}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <h3 style={{ marginTop: 0 }}>Override Size</h3>
          <Box display="flex" flexDirection="column" gap={3}>
            <Heading level={1} size="5xl">
              H1 with size="5xl" override
            </Heading>
            <Heading level={3} size="sm">
              H3 with size="sm" override
            </Heading>
            <Heading level={6} size="2xl">
              H6 with size="2xl" override
            </Heading>
          </Box>
        </Box>

        {/* Override Weight */}
        <Box
          mb={3}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <h3 style={{ marginTop: 0 }}>Override Weight</h3>
          <Box display="flex" flexDirection="column" gap={3}>
            <Heading level={1} weight="normal">
              H1 with normal weight
            </Heading>
            <Heading level={2} weight="medium">
              H2 with medium weight
            </Heading>
            <Heading level={3} weight="semibold">
              H3 with semibold weight
            </Heading>
            <Heading level={4} weight="bold">
              H4 with bold weight (default)
            </Heading>
          </Box>
        </Box>

        {/* Heading Colors */}
        <Box
          mb={3}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <h3 style={{ marginTop: 0 }}>Heading Colors (color prop)</h3>
          <Box display="flex" flexDirection="column" gap={3}>
            <Heading level={2} color="foreground">
              Foreground Heading
            </Heading>
            <Heading level={2} color="primary">
              Primary Heading
            </Heading>
            <Heading level={2} color="accent">
              Accent Heading
            </Heading>
            <Heading level={2} color="success">
              Success Heading
            </Heading>
            <Heading level={2} color="error">
              Error Heading
            </Heading>
            <Heading level={2} color="warning">
              Warning Heading
            </Heading>
          </Box>
        </Box>

        {/* Heading with Text Props */}
        <Box
          mb={3}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <h3 style={{ marginTop: 0 }}>Heading with Text Props</h3>
          <Box display="flex" flexDirection="column" gap={3}>
            <Heading level={2} align="center">
              Centered Heading
            </Heading>
            <Heading level={2} align="right">
              Right Aligned Heading
            </Heading>
            <Heading level={2} italic>
              Italic Heading
            </Heading>
            <Box
              w="300px"
              p={2}
              bg="surface"
              border="thin"
              borderColor="border"
            >
              <Heading level={3} truncate>
                Truncated Heading: This is a very long heading that will be
                truncated with ellipsis
              </Heading>
            </Box>
          </Box>
        </Box>

        {/* Heading with Box Props */}
        <Box
          mb={3}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <h3 style={{ marginTop: 0 }}>Heading with Box Props</h3>
          <Box display="flex" flexDirection="column" gap={3}>
            <Heading
              level={2}
              p={4}
              bg="primary-subtle"
              border="medium"
              borderColor="primary"
              rounded="md"
            >
              Heading with Box styling
            </Heading>
            <Heading
              level={3}
              p={3}
              bg="accent-subtle"
              borderLeft="thick"
              borderColor="accent"
              color="accent-emphasis"
            >
              Heading with left border accent
            </Heading>
          </Box>
        </Box>

        {/* Polymorphic Heading */}
        <Box
          mb={6}
          p={4}
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <h3 style={{ marginTop: 0 }}>Polymorphic Heading</h3>
          <Box display="flex" flexDirection="column" gap={3}>
            <Heading level={2}>Default: renders as h2</Heading>
            <Heading level={3} as="div">
              level={"{3}"} as="div" - h3 styling, div element
            </Heading>
            <Heading level={1} as="p" size="md" weight="medium">
              level={"{1}"} as="p" - custom size and weight
            </Heading>
          </Box>
        </Box>
      </section>
    </Box>
  );
}

export default App;
