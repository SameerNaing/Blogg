import React from "react";
import Link from "next/link";
import { Box } from "@chakra-ui/layout";

/** Login Continer design to show instead of Profile Pic Avatar when user is not login */
const LoginContainer: React.FC = () => {
  return (
    <Link href="/auth">
      <a>
        <Box
          data-cy="navbar-login-container"
          borderColor="orange"
          border="1px solid"
          padding="8px"
          borderRadius="8"
          color="orange"
          fontSize="13px"
          fontWeight="bold"
          variant="outline"
        >
          Login
        </Box>
      </a>
    </Link>
  );
};

export default LoginContainer;
