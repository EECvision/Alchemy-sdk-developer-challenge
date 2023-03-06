// const pinataSDK = require("@pinata/sdk");
import pinataSDK from "@pinata/sdk";
require("dotenv").config();

const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const PINATA_API_SECRET = process.env.NEXT_PUBLIC_PINATA_API_SECRET;
const PINATA_API_JWT = process.env.NEXT_PUBLIC_JWT;
const pinata = new pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);

const transformAttribute = (attributes) => {
  return attributes.map((attr) => ({
    trait_type: attr.trait_type,
    value: attr.value,
  }));
};

const uploadImageToIpfs = async (image) => {
  try {
    await pinata.testAuthentication();
    const data = new FormData();
    data.append("file", image);
    data.append("pinataOptions", '{"cidVersion": 0}');
    const response = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "post",
        headers: {
          Authorization: `Bearer ${PINATA_API_JWT}`,
        },
        body: data,
      }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

async function uploadMetadataToIpfs({ image, name, description, attributes }) {
  // create metadata
  const tokenUriMetadata = {};
  tokenUriMetadata.name = name;
  tokenUriMetadata.image = `ipfs://${image}`;
  tokenUriMetadata.description = description;
  tokenUriMetadata.attributes = attributes;
  try {
    const response = await pinata.pinJSONToIPFS(tokenUriMetadata, {
      cidVersion: 1,
    });
    return `ipfs://${response.IpfsHash}`;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const uploadToIpfs = async (metadata) => {
  const { image, attributes } = metadata;
  const imageUrl = await uploadImageToIpfs(image);
  if (imageUrl) {
    const transformedAttribute = transformAttribute(attributes);
    const res = await uploadMetadataToIpfs({
      ...metadata,
      image: imageUrl.IpfsHash,
      attributes: transformedAttribute,
    });
    return res;
  }
};
