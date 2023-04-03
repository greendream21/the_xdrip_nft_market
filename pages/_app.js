import "../styles/globals.css";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import Head from "next/head";
import { NavBar, Footer } from "../components/componentsindex";
import { NFTMarketplaceProvider } from "../Context/NFTMarketplaceContext";

const activeChainId = 97;

const MyApp = ({ Component, pageProps }) => (
  <ThirdwebProvider desiredChainId={activeChainId}>
    <Head>
      <title>XMARKET</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content=""
      />
    </Head>
    <NFTMarketplaceProvider>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </NFTMarketplaceProvider>
  </ThirdwebProvider>
);

export default MyApp;

