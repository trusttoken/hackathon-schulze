import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Config, DAppProvider, Goerli, Mainnet } from '@usedapp/core'
import { providers } from 'ethers'

const useDappConfig: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Goerli.chainId]: new providers.InfuraProvider(
      'goerli',
      process.env.NEXT_PUBLIC_INFURA_API_KEY!,
    ),
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
