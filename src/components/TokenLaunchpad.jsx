import { createInitializeMint2Instruction, createMint, getMinimumBalanceForRentExemptAccount, MINT_SIZE, TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
export function TokenLaunchpad() {

    const {connection} = useConnection();
    const wallet = useWallet();

    async function createToken() {
        const lamports = await getMinimumBalanceForRentExemptAccount(connection);
        const mintKeyPair = Keypair.generate();
        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey,
                newAccountPubkey: mintKeyPair.publicKey,
                space: MINT_SIZE,
                lamports,
                programId: TOKEN_PROGRAM_ID,
            }),
            createInitializeMint2Instruction(mintKeyPair.publicKey, 9, wallet.publicKey, wallet.publicKey, TOKEN_PROGRAM_ID),
        );
        transaction.feePayer = wallet.publicKey;
        transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
        transaction.partialSign(mintKeyPair);
        await wallet.sendTransaction(transaction);
        console.log(`Token mint created at ${mintKeyPair.publicKey.toBase58()}`);

    }

    return  <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }}>
        <h1>Solana Token Launchpad</h1>
        <input className='inputText' type='text' placeholder='Name'></input> <br />
        <input className='inputText' type='text' placeholder='Symbol'></input> <br />
        <input className='inputText' type='text' placeholder='Image URL'></input> <br />
        <input className='inputText' type='text' placeholder='Initial Supply'></input> <br />
        <button className='btn' onClick={createToken}>Create a token</button>
    </div>
}