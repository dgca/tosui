import { Box } from "@/components/Box/Box";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>TOSUI Component Playground</h1>

      <section>
        <h2>Typography</h2>
        <Box fontSize="xs" mb={2}>
          Extra small text (12px)
        </Box>
        <Box fontSize="md" fontWeight="bold" mb={2}>
          Medium bold text (16px)
        </Box>
        <Box fontSize="2xl" fontFamily="heading" mb={2}>
          2XL heading font (24px)
        </Box>
        <Box fontSize="sm" fontFamily="mono" mb={2}>
          Small monospace text (14px)
        </Box>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Border Radius & Shadows</h2>
        <Box
          p={4}
          mb={3}
          rounded="lg"
          shadow="md"
          style={{ backgroundColor: "#f9fafb" }}
        >
          Card with large rounded corners and medium shadow
        </Box>
        <Box
          p={4}
          mb={3}
          rounded="lg"
          roundedTopLeft="none"
          shadow="sm"
          style={{ backgroundColor: "#f9fafb" }}
        >
          Sharp top-left corner with subtle shadow
        </Box>
        <Box
          p={4}
          mb={3}
          roundedTop="lg"
          style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          Only top corners rounded
        </Box>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Spacing</h2>
        <Box p={4} mb={3} style={{ backgroundColor: "#dbeafe" }}>
          Padding on all sides (p=4)
        </Box>
        <Box px={6} py={2} mb={3} style={{ backgroundColor: "#fef3c7" }}>
          Horizontal & vertical padding (px=6, py=2)
        </Box>
        <Box p={4} pt={8} style={{ backgroundColor: "#dcfce7" }}>
          Override top padding (p=4, pt=8)
        </Box>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Borders</h2>
        <Box
          p={4}
          mb={3}
          border="thin"
          borderColor="border"
          rounded="md"
        >
          Thin border on all sides
        </Box>
        <Box
          p={4}
          mb={3}
          borderY="medium"
          borderColor="primary"
          borderStyle="dashed"
        >
          Medium dashed border on top and bottom
        </Box>
        <Box
          p={4}
          mb={3}
          borderLeft="thick"
          borderColor="accent"
          rounded="sm"
          style={{ backgroundColor: "#f9fafb" }}
        >
          Thick left border accent
        </Box>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Layout - Flexbox</h2>
        <Box
          display="flex"
          gap={4}
          alignItems="center"
          p={4}
          mb={3}
          rounded="md"
          border="thin"
          borderColor="border"
        >
          <Box p={3} rounded="sm" style={{ backgroundColor: "#dbeafe" }}>
            Item 1
          </Box>
          <Box p={3} rounded="sm" style={{ backgroundColor: "#fef3c7" }}>
            Item 2
          </Box>
          <Box p={3} rounded="sm" style={{ backgroundColor: "#dcfce7" }}>
            Item 3
          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          p={4}
          rounded="md"
          style={{ backgroundColor: "#f9fafb" }}
        >
          <Box fontSize="sm" fontWeight="semibold">
            Flex Column Layout
          </Box>
          <Box fontSize="xs">First item</Box>
          <Box fontSize="xs">Second item</Box>
          <Box fontSize="xs">Third item</Box>
        </Box>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Layout - Grid</h2>
        <Box
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          gap={4}
          p={4}
          rounded="md"
          border="thin"
          borderColor="border"
          mb={3}
        >
          <Box p={4} rounded="sm" style={{ backgroundColor: "#dbeafe" }}>
            Grid 1
          </Box>
          <Box p={4} rounded="sm" style={{ backgroundColor: "#fef3c7" }}>
            Grid 2
          </Box>
          <Box p={4} rounded="sm" style={{ backgroundColor: "#dcfce7" }}>
            Grid 3
          </Box>
          <Box p={4} rounded="sm" style={{ backgroundColor: "#fce7f3" }}>
            Grid 4
          </Box>
          <Box p={4} rounded="sm" style={{ backgroundColor: "#e0e7ff" }}>
            Grid 5
          </Box>
          <Box p={4} rounded="sm" style={{ backgroundColor: "#fef9c3" }}>
            Grid 6
          </Box>
        </Box>

        <Box
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)"
          gapRow={6}
          gapColumn={2}
          p={4}
          rounded="md"
          style={{ backgroundColor: "#f9fafb" }}
        >
          <Box p={3} rounded="sm" style={{ backgroundColor: "#dbeafe" }}>
            Custom gap: Large row gap (6)
          </Box>
          <Box p={3} rounded="sm" style={{ backgroundColor: "#fef3c7" }}>
            Small column gap (2)
          </Box>
          <Box p={3} rounded="sm" style={{ backgroundColor: "#dcfce7" }}>
            Notice the vertical spacing
          </Box>
          <Box p={3} rounded="sm" style={{ backgroundColor: "#fce7f3" }}>
            Is larger than horizontal
          </Box>
        </Box>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Positioning & Inset</h2>
        <Box
          position="relative"
          p={8}
          rounded="md"
          border="thin"
          borderColor="border"
          mb={3}
          style={{ backgroundColor: "#f9fafb", minHeight: "200px" }}
        >
          <Box fontSize="sm" mb={4}>
            Relative container with absolutely positioned children
          </Box>
          <Box
            position="absolute"
            top={2}
            right={2}
            p={2}
            rounded="sm"
            fontSize="xs"
            style={{ backgroundColor: "#dbeafe" }}
          >
            Top Right (top={2}, right={2})
          </Box>
          <Box
            position="absolute"
            bottom={2}
            left={2}
            p={2}
            rounded="sm"
            fontSize="xs"
            style={{ backgroundColor: "#fef3c7" }}
          >
            Bottom Left (bottom={2}, left={2})
          </Box>
          <Box
            position="absolute"
            insetY={0}
            right={2}
            p={2}
            rounded="sm"
            fontSize="xs"
            display="flex"
            alignItems="center"
            style={{ backgroundColor: "#dcfce7" }}
          >
            Right Edge (insetY={0})
          </Box>
        </Box>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Sizing</h2>
        <Box mb={3}>
          <Box
            w="100%"
            h="100px"
            p={4}
            rounded="md"
            style={{ backgroundColor: "#dbeafe" }}
            mb={2}
          >
            Full width (w="100%"), fixed height (h="100px")
          </Box>
          <Box
            w="50%"
            h="80px"
            p={4}
            rounded="md"
            style={{ backgroundColor: "#fef3c7" }}
            mb={2}
          >
            Half width (w="50%")
          </Box>
          <Box
            w={20}
            h={20}
            p={4}
            rounded="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            style={{ backgroundColor: "#dcfce7" }}
            mb={2}
          >
            Square using spacing scale (w={"{20}"}, h={"{20}"})
          </Box>
          <Box
            minW="200px"
            maxW="400px"
            w="100%"
            p={4}
            rounded="md"
            style={{ backgroundColor: "#fce7f3" }}
          >
            Responsive width with constraints (minW="200px", maxW="400px")
          </Box>
        </Box>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Combined</h2>
        <Box
          as="button"
          p={4}
          px={6}
          rounded="md"
          shadow="sm"
          fontSize="md"
          fontWeight="semibold"
          onClick={() => alert("Button clicked!")}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Primary Button
        </Box>
      </section>
    </div>
  );
}

export default App;
