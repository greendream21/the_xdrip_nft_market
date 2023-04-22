
import { NFTStorage, File } from 'nft.storage'
import mime from 'mime'
import fs from 'fs'
import path from 'path'


const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDYwZWQ4NTM5NDVmOGZDZGZjYTY5QzYxQzZBNDQ5NTBGZjhmMjRFNzgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4MjEyODUwNjg1MiwibmFtZSI6IlhNYXJrZXQifQ.C7Axph36rDSHa06J886ND2nS9zng3K7UcB-7YqrQ1Kg'

/**
  * Reads an image file from `imagePath` and stores an NFT with the given name and description.
  * @param {string} imagePath the path to an image file
  * @param {string} name a name for the NFT
  * @param {string} description a text description for the NFT
  */
async function storeNFT(imagePath, name, description) {
    const image = await fileFromPath(imagePath)
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

    
    return nftstorage.store({
        image,
        name,
        description,
    })
}

/**
  * A helper to read a file from a location on disk and return a File object.
  * Note that this reads the entire file into memory and should not be used for
  * very large files. 
  * @param {string} filePath the path to a file to store
  * @returns {File} a File object containing the file content
  */
async function fileFromPath(filePath) {
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)
    return new File([content], path.basename(filePath), { type })
}



async function main() {
    const args = process.argv.slice(2)
    if (args.length !== 3) {
        console.error(`usage: ${process.argv[0]} ${process.argv[1]} <image-path> <name> <description>`)
        process.exit(1)
    }

    const [imagePath, name, description] = args
    const result = await storeNFT(imagePath, name, description)
    console.log(result)
}

main()
  .catch(err => {
      console.error(err)
      process.exit(1)
  })