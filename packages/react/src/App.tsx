import { Box } from "@/components/Box/Box";
import { Text } from "@/components/Text/Text";
import { Heading } from "@/components/Heading/Heading";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <Heading level={1} mb={6}>
        TOSUI Component Playground
      </Heading>

      <section>
        <Heading level={2} mb={4}>
          Text & Heading Components
        </Heading>
        <Box mb={4}>
          <Text size="lg" weight="semibold" mb={2}>
            Large semibold text
          </Text>
          <br />
          <Text mb={2}>Default text (span, size md)</Text>
          <br />
          <Text size="sm" color="foreground-subtle" mb={2}>
            Small muted text
          </Text>
          <br />
          <Text size="md" truncate style={{ maxWidth: "300px" }} mb={2}>
            This is a very long text that will be truncated with an ellipsis
            when it exceeds the container width
          </Text>
          <br />
          <Text italic>Italic text</Text>
        </Box>

        <Box mb={4}>
          <Heading level={1} mb={2}>
            Heading Level 1 (h1)
          </Heading>
          <Heading level={2} mb={2}>
            Heading Level 2 (h2)
          </Heading>
          <Heading level={3} mb={2}>
            Heading Level 3 (h3)
          </Heading>
          <Heading level={4} mb={2}>
            Heading Level 4 (h4)
          </Heading>
          <Heading level={5} mb={2}>
            Heading Level 5 (h5)
          </Heading>
          <Heading level={6} mb={2}>
            Heading Level 6 (h6)
          </Heading>
          <Heading level={2} size="md" weight="medium" color="primary" mb={2}>
            Custom h2 (size md, medium weight, primary color)
          </Heading>
          <Heading as="div" level={3} mb={2}>
            Heading as div (polymorphic)
          </Heading>
        </Box>
      </section>

      <section>
        <Heading level={2} mb={4}>
          Box Typography
        </Heading>
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
        <Heading level={2} mb={4}>
          Border Radius & Shadows
        </Heading>
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
        <Heading level={2} mb={4}>
          Spacing
        </Heading>
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
        <Heading level={2} mb={4}>
          Borders
        </Heading>
        <Box p={4} mb={3} border="thin" borderColor="border" rounded="md">
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
        <Heading level={2} mb={4}>
          Layout - Flexbox
        </Heading>
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
        <Heading level={2} mb={4}>
          Layout - Grid
        </Heading>
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
        <Heading level={2} mb={4}>
          Positioning & Inset
        </Heading>
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
        <Heading level={2} mb={4}>
          Sizing
        </Heading>
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
        <Heading level={2} mb={4}>
          Combined
        </Heading>
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
