import React, {useEffect, useState} from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Text,
} from '@chakra-ui/react';
import Web3 from 'web3';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import contractABI from './contractABI';

async function getWallets(contractAddress) {
  const web3 = new Web3('https://mainnet.infura.io/v3/b383710d86db413d8e6909a08b807754');

  // Obtén la instancia del contrato
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  // Obtén la lista de wallets que interactúan con el contrato
  const walletList = await contract.getPastEvents('allEvents', {
    fromBlock: 0,
    toBlock: 'latest',
  });

  return walletList.map((event) => event.returnValues.from);
}


function App() {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    const contractAddress = '0x...'; // Aquí debes proporcionar la dirección de tu contrato
    getWallets(contractAddress)
      .then((result) => setWallets(result))
      .catch((error) => console.error(error));
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Grid>
        <Text>
          {wallets.length > 0 ? (
              <ul>
                {wallets.map((wallet) => (
                  <li key={wallet}>{wallet}</li>
                ))}
              </ul>
            ) : (
              <p>No se encontraron wallets.</p>
            )}
        </Text>
      </Box>
    </ChakraProvider>
  );
}

export default App;
