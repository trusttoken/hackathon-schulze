import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Config, DAppProvider, Goerli, Mainnet } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'

const useDappConfig: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider('mainnet'),
    [Goerli.chainId]: getDefaultProvider('goerli'),
  },
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={useDappConfig}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </DAppProvider>
  )
}
