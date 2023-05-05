
import React, { useState, useEffect } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Web3Modal from "web3modal";
import { NFTStorage, Blob } from 'nft.storage';
import marketplaceCA_ABI from "./marketplaceCA_ABI.json";
import mohCA_ABI from "./mohCA_ABI.json";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import {uploadToIPFS } from "../UploadNFT/UploadNFT"

import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider);

const apiKey = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY;

const client = new NFTStorage({ token: apiKey });

//not actually using this http client but keeping code and web3 provider  wrapper for now

const ipfs = ipfsHttpClient({
  host: 'ipfs.nft.storage',
  port: 443,
  protocol: 'https',
});


const NFTMarketplaceAddress = marketplaceCA_ABI.address;
const NFTMarketplaceABI = marketplaceCA_ABI.abi;
const MohAddress = mohCA_ABI.address;
const MohABI = mohCA_ABI.abi;

import { useRouter } from "next/router";
import axios from "axios";
import { ethers } from "ethers";
import {
  useSDK,
  useConnect,
  useAddress,
  useConnectionStatus,
} from "@thirdweb-dev/react";

// we use thirdweb for wallets 
const connectingWithSmartContract = async () => {
  try {
    const sdk = new ThirdwebSDK();
    await sdk.connect();
    const signer = sdk.getSigner();
    const contract = fetchMarketplaceContract(signer);
    return contract;
  } catch (error) {
    console.log("Something went wrong while connecting with contract", error);
  }
};


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
  const [nfts, setNfts] = useState([]);


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



useEffect(() => {
  if (router.query.category) {
    setCategory(router.query.category);
  }
}, [router.query.category]);


async function createNFT(name, price, description, category, website, royalties, properties, image ) {
  if (!name || !description || !price || !image)
    return setError("Data Is Missing"), setOpenError(true);
    const data = JSON.stringify({ name, price, description, category, website, royalties, properties, image });

  try {
    const cid = await client.storeBlob(new Blob([data]));
    const url = `https://${cid}.ipfs.nftstorage.link`; // Updated base URL

    // convert the price to gwei before passing it to createSale
    const priceInGwei = ethers.utils.parseUnits(price.toString(), "gwei");

    await createSale(url, priceInGwei, currentAccount); 
    router.push("/searchPage");
  } catch (error) {
    setError("Error while creating NFT");
    setOpenError(true);
  }
}

  //--- createSale FUNCTION
  async function createSale(tokenURI, price) {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];

  const nftMarketplaceContract = new web3.eth.Contract(NFTMarketplaceABI, NFTMarketplaceAddress);
  const transactionParameters = {
    to: NFTMarketplaceAddress,
    from: account,
    data: nftMarketplaceContract.methods.createToken(tokenURI, price).encodeABI(),
    
    //Hardcoded price - needs to be updated to form input price (gas issues below .025)
    value: web3.utils.toHex(web3.utils.toWei('0.025', 'ether')) // Assuming the listing price is 0.025 ETH
  };

  const txHash = await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [transactionParameters],
  });

  return txHash;
}

 //--FETCHNFTS FUNCTION

  const loadNFTs = async () => {
   
    try {
      if (currentAccount) {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://binance-testnet.rpc.thirdweb.com/"
      );
      const contract = connectingWithSmartContract(provider);
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
      
      setError("Error while fetching NFTS");
      setOpenError(true);
      
      console.log(error);
    }
     return [];
  };
  


async function fetchNFTs() {
  try {
    const nftMarketplaceContract = new web3.eth.Contract(NFTMarketplaceABI, NFTMarketplaceAddress);
    const data = await nftMarketplaceContract.methods.fetchMarketItems().call();

    console.log("Data fetched from smart contract:", data);

    const items = await Promise.all(data.map(async ({ tokenId, seller, owner, price }) => {
      const tokenURI = await nftMarketplaceContract.methods.tokenURI(tokenId).call();
      console.log("Token URI:", tokenURI);
      const { data: { name, description, image } } = await axios.get(tokenURI, {});
      console.log("NFT Item:", { tokenId, seller, owner, price, name, description, image, tokenURI });
      return {
        tokenId,
        
        seller,
        owner,
        price: web3.utils.fromWei(price, 'ether'),
        name,
        description,
        image,
        tokenURI,
      }
    }));
    return items;
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return [];
  }
}


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
  
    
  /*
  
  async function fetchNFTs() {
  const fetchedNFTs = await loadNFTs();
  setNfts(fetchedNFTs);
}
  useEffect(() => {
    fetchNFTs();
  }, []);
*/
  
  
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
        nfts,
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
    </NFTMarketplaceContext.Provider>
  );
};