import "./styles/styles.css";
// Must be imported dynamically to split CSS into multiple files
import("./styles/fonts.css");

export { Box, type BoxOwnProps, type BoxProps } from "./components/Box/Box";
export { Text } from "./components/Text";
export { Heading } from "./components/Heading";
export {
  Button,
  type ButtonColorScheme,
  type ButtonVariant,
  type ButtonSize,
  type ButtonProps,
} from "./components/Button";
export { Spinner } from "./components/Spinner";
