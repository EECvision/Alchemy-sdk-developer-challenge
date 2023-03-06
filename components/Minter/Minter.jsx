import { useContext, useEffect, useRef, useState } from "react";
import { StateContext } from "../../globalState/state.context";
import { writeContract } from "../../utils";
import supportedChains from "../../utils/supportedChains";
import { uploadToIpfs } from "./Minter-Script";
import classes from "./Minter.module.css";
import AttributeInput from "./Attribute/AttributeInput";
import ChainInput from "./ChainInput/ChainInput";
import DescriptionInput from "./DescriptionInput/DescriptionInput";
import ImageInput from "./ImageInput/ImageInput";
import NameInput from "./NameInput/NameInput";
import Button from "../Button/Button";
import Preview from "./Preview/Preview";
import LoaderWithState from "../LoaderWithState/LoaderWithState";
import MintSuccessModal from "../Modals/MintSuccessModal/MintSuccessModal";
import MintErrorModal from "../Modals/MintErrorModal/MintErrorModal";
// import RoyaltyInput from "./RoyaltyInput/RoyaltyInput";

const Minter = ({ abi, contractAddress }) => {
  const { isMainnet, account, walletProvider } = useContext(StateContext);

  const imageRef = useRef(null);
  const [loadingState, setLoadingState] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mintSuccess, setMintSuccess] = useState(false);
  const [mintError, setMintError] = useState(false);
  const [metadata, setMetadata] = useState({
    image: null,
    name: "",
    description: "",
    attributes: [],
  });

  const handleAddAttribute = () => {
    const attributes = [...metadata.attributes];
    const newAttributes = { id: Date.now(), trait_type: "", value: "" };
    setMetadata({ ...metadata, attributes: [...attributes, newAttributes] });
  };

  const handleRemoveAttribute = (id) => {
    const attributes = [...metadata.attributes];
    const newAttributes = attributes.filter((attribute) => attribute.id !== id);
    setMetadata({ ...metadata, attributes: newAttributes });
  };

  const handleNameChange = (event) => {
    const _metadata = { ...metadata };
    setMetadata({ ..._metadata, name: event.target.value });
  };

  const handleDescriptionChange = (event) => {
    const _metadata = { ...metadata };
    setMetadata({ ..._metadata, description: event.target.value });
  };

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    if (!image) return;
    const fullName = image.name.replace(/\.+\s*\./, ".").split(".");
    const imageName = fullName.slice(0, fullName.length - 1).join(".");
    setMetadata({ ...metadata, image, name: imageName });
  };

  const handleAttributeChange = (event) => {
    const { name, value, id } = event.target;
    const attributes = [...metadata.attributes];
    const newAttributes = attributes.map((attribute) => {
      if (attribute.id === Number(id)) {
        return { ...attribute, [name]: value };
      } else {
        return attribute;
      }
    });
    setMetadata({ ...metadata, attributes: newAttributes });
  };

  const handleMint = async () => {
    if (!abi || !contractAddress)
      return console.log("invalid abi or contract address");
    if (!metadata.image || !metadata.name)
      return console.log("invalid metadata");
    setLoadingState("Uploading asset");
    const ipfsUrl = await uploadToIpfs(metadata);
    if (!ipfsUrl) {
      console.log("invalid ipfs url");
      setError("invalid ipfs url");
      return;
    }
    console.log({ ipfsUrl });
    setLoadingState("Please confirm transaction");
    const mintOptions = {
      abi,
      contractAddress,
      functionName: "safeMint",
      params: {
        uri: ipfsUrl,
      },
    };
    const txResponse = await writeContract({
      params: mintOptions,
      walletProvider,
      onError: (error) => {
        console.log(error);
        setError(error.message);
      },
      onSuccess: (tx) => setLoadingState("Waiting for transaction"),
    });

    if (txResponse) {
      await txResponse.wait();
      setSuccess(true);
      setMetadata({
        image: null,
        name: "",
        description: "",
        attributes: [],
      });
    }
  };

  const handleLoaderClose = () => {
    setLoadingState("");
    setError("");
    setSuccess("");
  };

  const handleLoaderError = (msg) => {
    setMintError(true);
    handleLoaderClose();
  };

  const handleLoaderSuccess = (hash) => {
    setMintSuccess(true);
    handleLoaderClose();
  };

  useEffect(() => {
    if (!loadingState) {
      setError("");
      setSuccess(false);
    }
  }, [loadingState]);

  // const handleMintSuccess = async (tx) => {
  //   setLoadingState("Mining...");
  //   await tx.wait();
  //   // setNotification({
  //   //   type: "success",
  //   //   message: "Mint successful",
  //   //   title: "NFT minted successfully",
  //   //   position: "topR",
  //   // });
  //   setLoadingState("");
  //   console.log("Nft mined successfully mined!");
  //   setMetadata({ image: null, name: "", description: "", attributes: [] });
  // };

  const handleNetwork = async (chain) => {
    // console.log({ chain });
    // try {
    //   await chain.switch();
    // setNetwork(chain.label);
    // } catch (error) {
    //   if (res.message.includes("Unrecognized")) {
    //     await chain.add();
    //     setNetwork(chain.label);
    //   }
    // }
  };

  const minterProps = {
    imageRef,
    metadata,
    account,
    supportedChains,
    isMainnet,
    loadingState,
    handleMint,
    handleImageChange,
    handleNameChange,
    handleDescriptionChange,
    handleAttributeChange,
    handleRemoveAttribute,
    handleAddAttribute,
    handleNetwork,
  };

  return (
    <div className={classes.container}>
      {mintSuccess ? (
        <MintSuccessModal setMint={setMintSuccess} />
      ) : mintError ? (
        <MintErrorModal onClose={setMintError} handleMint={handleMint} />
      ) : (
        <>
          <div className={classes.wrapper}>
            <div className={classes.innerWrapper}>
              <ImageInput minterProps={minterProps} />
              <NameInput minterProps={minterProps} />
              <DescriptionInput minterProps={minterProps} />
              <AttributeInput minterProps={minterProps} />
              <ChainInput minterProps={minterProps} />
              {/* <RoyaltyInput minterProps={minterProps} /> */}
            </div>
            <button
              disabled={!account}
              onClick={!loadingState ? handleMint : () => {}}
              className={classes.mintButton}
            >
              <Button color={"accent"} size="md" disabled={!account}>
                Create NFT
              </Button>
            </button>
          </div>
          <Preview minterProps={minterProps} />
        </>
      )}
      {loadingState ? (
        <LoaderWithState
          success={success}
          error={error}
          onError={handleLoaderError}
          onSuccess={handleLoaderSuccess}
          title={"Create item"}
          loadingState={loadingState}
        />
      ) : null}
    </div>
  );
};

export default Minter;
