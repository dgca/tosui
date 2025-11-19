import { El } from "./components/El";
import { Box } from "./components/Box/Box";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>TOSUI Component Playground</h1>

      <section>
        <h2>El (Element) - Foundation Primitive</h2>
        <El
          style={{
            padding: "1rem",
            border: "1px solid #ccc",
            marginBottom: "1rem",
          }}
        >
          Default El (div)
        </El>
        <El as="button" onClick={() => alert("Clicked!")}>
          El as button
        </El>
        <El as="a" href="#" style={{ display: "block", marginTop: "0.5rem" }}>
          El as link
        </El>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Box - Layout Primitive with Spacing Props</h2>

        <Box p={4} mb={4} style={{ backgroundColor: "#f0f0f0" }}>
          Box with p=4 (16px padding all sides)
        </Box>

        <Box px={6} py={2} mb={4} style={{ backgroundColor: "#e0e0e0" }}>
          Box with px=6 (24px horizontal) py=2 (8px vertical)
        </Box>

        <Box p={4} pt={8} mb={4} style={{ backgroundColor: "#d0d0d0" }}>
          Box with p=4 but pt=8 (directional overrides all)
        </Box>

        <Box m={4} style={{ backgroundColor: "#c0c0c0" }}>
          Box with m=4 (16px margin all sides)
        </Box>
      </section>
    </div>
  );
}

export default App;
