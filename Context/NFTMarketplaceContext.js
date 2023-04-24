import React, { useState, useEffect, useContext } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Web3Modal from "web3modal";
import { NFTStorage, Blob } from 'nft.storage';

const apiKey = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY;
const client = new NFTStorage({ token: apiKey });

const ipfs = ipfsHttpClient({
  host: 'ipfs.nft.storage',
  port: 443,
  protocol: 'https',
});


import mohABI from "./mohABI.json";
import marketplaceABI from "./marketplaceABI.json";

const NFTMarketplaceAddress = marketplaceABI.address;
const NFTMarketplaceABI = marketplaceABI.abi;
const MohAddress = mohABI.address;
const MohABI = mohABI.abi;

import { useRouter } from "next/router";
import axios from "axios";
import { ethers } from "ethers";
import {
  useSDK,
  useConnect,
  useAddress,
  useConnectionStatus,
} from "@thirdweb-dev/react";
//import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const subdomain = process.env.NEXT_PUBLIC_SUBDOMAIN;

const fetchMarketplaceContract = (signerOrProvider) =>
  new ethers.Contract(
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvider
  );

const fetchMohContract = (signerOrProvider) =>
  new ethers.Contract(MohAddress, MohABI, signerOrProvider);

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
  const titleData = "Discover, collect, and sell NFTs";
  const sdk = useSDK();
  const connect = useConnect();
  const address = useAddress();
  const connectionStatus = useConnectionStatus();
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const router = useRouter();

  const disconnectWallet = () => {
    setCurrentAccount(null);
  };

  useEffect(() => {
    if (address) {
      setCurrentAccount(address);
      updateBalance();
    }
  }, [address]);

  const updateBalance = async () => {
    if (sdk.provider && currentAccount) {
      const ethProvider = new ethers.providers.Web3Provider(sdk.provider);
      const getBalance = await ethProvider.getBalance(currentAccount);
      const bal = ethers.utils.formatEther(getBalance);
      setAccountBalance(bal);
    }
  };

  const checkIfWalletConnected = async () => {
    if (address) {
      setCurrentAccount(address);
      updateBalance();
    } else {
      console.log("No account");
    }
  };

  useEffect(() => {
    if (connectionStatus === "connected") {
      checkIfWalletConnected();
    }
  }, [connectionStatus]);

  const handleConnect = async () => {
    await connect();
  };


  
  //---UPLOAD TO NFT.STORAGE FUNCTION
  const uploadToIPFS = async (file) => {
    try {
      const blob = new Blob([file]);
      const added = await client.storeBlob(blob);
      const url = `https://ipfs.io/ipfs/${added.cid}`;
      return url;
    } catch (error) {
      setError("Error Uploading to IPFS");
      setOpenError(true);
    }
  };





 //---CREATE NFT FUNCTION
 const createNFT = async (name, price, image, description, router) => {
  if (!name || !description || !price || !image)
    return setError("Data Is Missing"), setOpenError(true);

  const data = JSON.stringify({ name, description, image });

  try {
    const cid = await client.storeBlob(new Blob([data]));
    const url = `https://ipfs.io/ipfs/${cid}`;

    await createSale(url, price);
    router.push("/searchPage");
  } catch (error) {
    setError("Error while creating NFT");
    setOpenError(true);
  }
};


  //--- createSale FUNCTION
  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      console.log(url, formInputPrice, isReselling, id);
      const price = ethers.utils.parseUnits(formInputPrice, "ether");

      const contract = await connectingWithSmartContract();

      const listingPrice = await contract.getListingPrice();

      const transaction = !isReselling
        ? await contract.createToken(url, price, {
            value: listingPrice.toString(),
          })
        : await contract.resellToken(id, price, {
            value: listingPrice.toString(),
          });

      await transaction.wait();
      console.log(transaction);
    } catch (error) {
      setError("error while creating sale");
      setOpenError(true);
      console.log(error);
    }
  };

  //--FETCHNFTS FUNCTION

  const fetchNFTs = async () => {
    try {
      if (currentAccount) {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://data-seed-prebsc-1-s1.binance.org:8545/"
      );

      const contract = NFTMarketplaceAddress(provider);

      const data = await contract.fetchMarketItems();

      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);

            const {
              data: { image, name, description },
            } = await axios.get(tokenURI, {});
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "bnb"
            );

            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }        
        )
      );
      return items;

      }
    } catch (error) {
      // setError("Error while fetching NFTS");
      // setOpenError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  //--FETCHING MY NFT OR LISTED NFTs
  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      if (currentAccount) {
        const contract = await connectingWithSmartContract();

        const data =
          type == "fetchItemsListed"
            ? await contract.fetchItemsListed()
            : await contract.fetchMyNFTs();

        const items = await Promise.all(
          data.map(
            async ({ tokenId, seller, owner, price: unformattedPrice }) => {
              const tokenURI = await contract.tokenURI(tokenId);
              const {
                data: { image, name, description },
              } = await axios.get(tokenURI);
              const price = ethers.utils.formatUnits(
                unformattedPrice.toString(),
                "ether"
              );

              return {
                price,
                tokenId: tokenId.toNumber(),
                seller,
                owner,
                image,
                name,
                description,
                tokenURI,
              };
            }
          )
        );
        return items;
      }
    } catch (error) {
      setError("Error while fetching listed NFTs");
      setOpenError(true);
    }
  };

  useEffect(() => {
    fetchMyNFTsOrListedNFTs();
  }, []);

  //---BUY NFTs FUNCTION
  const buyNFT = async (nft) => {
    try {
      const contract = await connectingWithSmartContract();
      const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });

      await transaction.wait();
      router.push("/author");
    } catch (error) {
      setError("Error While buying NFT");
      setOpenError(true);
    }
  };

  //------------------------------------------------------------------

  //----TRANSFER FUNDS

  const fetchTransferFundsContract = (signerOrProvider) =>
    new ethers.Contract(
      transferFundsAddress,
      transferFundsABI,
      signerOrProvider
    );

  const connectToTransferFunds = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchTransferFundsContract(signer);
      return contract;
    } catch (error) {
      console.log(error);
    }
  };
  //---TRANSFER FUNDS
  const [transactionCount, setTransactionCount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const transferEther = async (address, ether, message) => {
    try {
      if (currentAccount) {
        const contract = await connectToTransferFunds();
        console.log(address, ether, message);

        const unFormatedPrice = ethers.utils.parseEther(ether);
        // //FIRST METHOD TO TRANSFER FUND
        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: address,
              gas: "0x5208",
              value: unFormatedPrice._hex,
            },
          ],
        });

        const transaction = await contract.addDataToBlockchain(
          address,
          unFormatedPrice,
          message
        );

        console.log(transaction);

        setLoading(true);
        transaction.wait();
        setLoading(false);

        const transactionCount = await contract.getTransactionCount();
        setTransactionCount(transactionCount.toNumber());
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //FETCH ALL TRANSACTION
  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const contract = await connectToTransferFunds();

        const avaliableTransaction = await contract.getAllTransactions();

        const readTransaction = avaliableTransaction.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.message,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        }));

        setTransactions(readTransaction);
        console.log(transactions);
      } else {
        console.log("On Ethereum");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <NFTMarketplaceContext.Provider
      value={{
        handleConnect,
        checkIfWalletConnected,
        uploadToIPFS,
        createNFT,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
        createSale,
        currentAccount,
        titleData,
        setOpenError,
        openError,
        error,
        transferEther,
        getAllTransactions,
        loading,
        accountBalance,
        transactionCount,
        transactions,
        disconnectWallet,
      }}
    >
      
      {children}
      <button onClick={handleConnect}>Connect wallet</button>
    </NFTMarketplaceContext.Provider>
  );
};