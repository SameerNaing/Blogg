import Head from "next/head";

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default Header;
