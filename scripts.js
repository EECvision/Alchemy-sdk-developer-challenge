export const getTokenDetails = async (uri) => {
  try {
    const requestURL = uri.replace("ipfs://", "https://ipfs.io/ipfs/");
    const URIResponse = await (await fetch(requestURL)).json();
    const imageURI = URIResponse.image;
    const imageURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/");
    return {
      imageURL,
      name: URIResponse.name,
      description: URIResponse.description,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getImageUrl = (uri) => {
  return uri.replace("ipfs://", "https://ipfs.io/ipfs/");
};
