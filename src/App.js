import React, { useEffect, useState } from 'react';
import { ChakraProvider, Box, Grid, theme, Text, Tag, Heading, Input, Button, Stack, Flex, Alert, AlertIcon } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import contractABI from './contractABI';
import { ethers } from 'ethers';

const providerURL = 'https://polygon-mainnet.g.alchemy.com/v2/OQmRfTFI5vVbN6oYc39XAkvB6FiW8hFa';
const provider = new ethers.JsonRpcProvider(providerURL);

function App() {
  const [wallet, setWallet] = useState('');
  const [contract, setContract] = useState('');
  const [balance, setBalance] = useState(null);
  const [symbol, setSymbol] = useState('');
  const [error, setError] = useState('');

  async function getBalance() {
    if (contract === '' || wallet === '') {
      setError('Please fill in both the wallet and contract fields.');
      return;
    }

    try {
      const tokenContract = new ethers.Contract(contract, contractABI, provider);
      const walletBalance = Number(await tokenContract.balanceOf(wallet));
      const contractTicker = await tokenContract.symbol();
      setBalance(walletBalance);
      setSymbol(contractTicker);
      setError('');
    } catch (error) {
      setError('Invalid contract or wallet address.');
      console.error(error);
    }
  }

  function handleButtonClick() {
    getBalance();
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Grid>
        <Heading as="h1" noOfLines={1}>
          Wallet balance
        </Heading>
        <Text>
          Type in the address and the contract, and it will retrieve the wallet's token balance (Only Polygon)
        </Text>
        <Stack spacing={2} p={8}>
          <Input placeholder="Wallet" onChange={(e) => setWallet(e.target.value)} />
          <Input placeholder="Token Contract" onChange={(e) => setContract(e.target.value)} />
          <Button onClick={handleButtonClick}>Confirm</Button>
        </Stack>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        {balance !== null && !error && (
          <Tag mt={4}>{balance} {symbol}</Tag>
        )}
      </Box>
    </ChakraProvider>
  );
}

export default App;
