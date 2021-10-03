import type { GetServerSideProps } from "next";
import { signIn, getSession } from "next-auth/client";
import type { NextPage } from "next";
import { Center, Image, Heading, Button } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/layout";

import GoogleSvgIcon from "@/common/components/SvgIcons/GoogleSvgIcon";
import Header from "@/common/components/Header";

/** Login Page */
const Auth: NextPage = () => {
  return (
    <>
      <Header title="Blogg" />
      <Center height="100vh">
        <VStack w="75%" spacing="10">
          <Image src="/appLogo.png" alt="appLogo" boxSize="60px" />

          <VStack width="100%" spacing="6">
            <Heading fontSize="xl" fontWeight="bold" color="grey">
              Hi, Welcome to Blogg
            </Heading>
            <Button
              data-cy="login-button"
              onClick={() => signIn("google")}
              leftIcon={<GoogleSvgIcon />}
              width="250px"
              colorScheme="red"
              fontSize="sm"
              color="whiteDim"
              fontWeight="300"
            >
              Continue with Google
            </Button>
          </VStack>
        </VStack>
      </Center>
    </>
  );
};

export default Auth;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
