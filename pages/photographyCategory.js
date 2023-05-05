const photographyCollection = () => {
    const { fetchNFTs, setError, currentAccount } = useContext(
      NFTMarketplaceContext
    );
    const [nfts, setNfts] = useState([]);
    const [nftsCopy, setNftsCopy] = useState([]);
    const [sortType, setSortType] = useState('price'); // default sort type is price
    
    useEffect(() => {
      try {
        if (currentAccount) {
          fetchNFTs().then((items) => {
            setNfts(items);
            setNftsCopy(items);
          });
        }
      } catch (error) {
        setError("Please reload the browser", error);
      }
    }, []);
  
    // sort the NFTs when sortType or nfts changes
    useEffect(() => {
      const sortedNfts = [...nfts].sort((a, b) => {
        if (sortType === 'name') {
          return a.metadata.name.localeCompare(b.metadata.name);
        } else if (sortType === 'price') {
          return a.price - b.price;
        }
      });
      setNfts(sortedNfts);
    }, [nfts, sortType]);
    
    const handleSortChange = (e) => {
      setSortType(e.target.value);
    };
  
    return (
      <div className={Style.searchPage}>
        <SearchBar onSortChange={handleSortChange} />
        <Banner/>
        {nfts.length === 0 ? (
          <Loader />
        ) : (
          <NFTCardTwo NFTData={nfts} />
        )}
        <Brand />
      </div>
    );
  };
  