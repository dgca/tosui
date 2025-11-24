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
