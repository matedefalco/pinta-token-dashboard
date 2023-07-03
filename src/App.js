import React, { useEffect, useState } from 'react';
import { ChakraProvider, Box, Grid, theme, Text } from '@chakra-ui/react';
import Web3 from 'web3';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import contractABI from './contractABI';
import { ethers } from "ethers";

// Dirección del contrato en la red de Polygon
const contractAddress = '0x9Ae69fDfF2FA97e34B680752D8E70dfD529Ea6ca';

// URL del proveedor de Infura para la red de Polygon
const providerURL = `https://polygon-mainnet.g.alchemy.com/v2/OQmRfTFI5vVbN6oYc39XAkvB6FiW8hFa`;

// Crear una instancia de Web3 utilizando el proveedor de Infura
const provider = new ethers.providers.JsonRpcProvider(providerURL);

async function getWallets() {

  // The Contract object
const pntContract = new ethers.Contract(contractAddress, contractABI, provider);


  const balance = await provider.getBalance(contractAddress)

 return balance;
}

function App() {
  const [wallets, setWallets] = useState([]);
  
  useEffect(() => {
    // Al cargar el componente, obtener las wallets llamando a la función getWallets
    getWallets()
    .then((result) => setWallets(result))
    .catch((error) => console.error(error));
  }, []);
  console.log("Suka ~ file: App.js:32 ~ wallets:", wallets)

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
