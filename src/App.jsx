import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider , WalletDisconnectButton, WalletMultiButton} from '@solana/wallet-adapter-react-ui'
import '@solana/wallet-adapter-react-ui/styles.css'
import './App.css'
import { TokenLaunchpad } from './components/TokenLaunchpad'

function App() {
  return (
    <div>
      <ConnectionProvider endpoint="https://solana-devnet.g.alchemy.com/v2/rj9Bnrakca5_vIU3oePi9WILoZc40Q3s">
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: 20}}>
            <WalletMultiButton />
            <WalletDisconnectButton />
          </div>
          <TokenLaunchpad />
        </WalletModalProvider>
      </WalletProvider>
      </ConnectionProvider>
    </div>
  )
}

export default App
