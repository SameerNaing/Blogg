import { extendTheme } from "@chakra-ui/react";

import colors from "./themes/colors";
import fonts from "./themes/fontFamily";

const customThemes = extendTheme({
  colors,
  fonts,
});

export default customThemes;
