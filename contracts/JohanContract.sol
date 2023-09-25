// SPDX-License-Identifier: MIT

pragma solidity 0.8.18;

import "./ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

// import "@openzeppelin/contracts/utils/Counters.sol";

contract JohanContract is ERC721A, Ownable {
    // ===== 1. Property Variables ===== //

    // using Counters for Counters.Counter;

    // Counters.Counter private _tokenIdCounter;

    bytes32 public whitelistMerkleRoot; // merkle root for whitelisted addresses
    mapping(address => uint256) public whitelistMinted; // number of nfts minted per address in whitelist
    string private baseURI; // the contract metadata uri

    uint256 public constant nftPrice = 0.0001 ether; // price per nft
    uint256 public constant maxSupply = 2500; // the maximum number of nfts existed
    uint256 public constant whitelistMintAmountPerAddr = 5; // the maximum amount of nfts each address can mint in whitelist

    // ===== 2. Lifecycle Methods ===== //

    constructor(bytes32 _whitelistMerkleRoot) ERC721A("JohanContract", "JC") {
        whitelistMerkleRoot = _whitelistMerkleRoot;
        // Start token ID at 1. By default is starts at 0.
        // _tokenIdCounter.increment();
    }

    // ===== 3. Minting Functions ===== //

    /**
     * @dev Allow users to mint nfts
     * @param _mintAmount Quantity of nfts to mint
     * @param _merkleProof MerkleProof for the address in whitelist, empty array if on allowlist
     */
    function mint(
        uint256 _mintAmount,
        bytes32[] calldata _merkleProof
    ) public payable {
        require(msg.value >= nftPrice * _mintAmount, "Insufficient funds!");
        require(_mintAmount > 0, "Invalid mint amount!");
        require(
            totalSupply() + _mintAmount <= maxSupply,
            "Max supply exceeded!"
        );

        require(
            whitelistMinted[msg.sender] + _mintAmount <=
                whitelistMintAmountPerAddr,
            "Exceed maximum whitelist mint amount for each address!"
        );

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(
            MerkleProof.verify(_merkleProof, whitelistMerkleRoot, leaf),
            "Wallet address not in the whitelist."
        );
        // bytes32 leaf = keccak256(
        //     bytes.concat(keccak256(abi.encode(_msgSender())))
        // );
        // require(
        //     MerkleProof.verify(_merkleProof, whitelistMerkleRoot, leaf),
        //     "Address is not in whitelist!"
        // );

        // uint256 tokenId = _tokenIdCounter.current();
        // _tokenIdCounter.increment();

        whitelistMinted[msg.sender] += _mintAmount;
        _safeMint(_msgSender(), _mintAmount);
    }

    /**
     * @dev Allow admin mint nfts for a wallet address
     * @param _receiver the address will receive minted nfts
     * @param _mintAmount the amount of nfts will be minted
     */
    function mintForAddress(
        address _receiver,
        uint256 _mintAmount
    ) public onlyOwner {
        require(
            totalSupply() + _mintAmount <= maxSupply,
            "Max supply exceeded!"
        );
        _safeMint(_receiver, _mintAmount);
    }

    /**
     * @dev Return the start token id to be minted  from
     */
    function _startTokenId() internal view virtual override returns (uint256) {
        return 1;
    }

    /**
     * @dev Allow admin to set the new whitelist merkle root if the whitelist changed
     * @param _whitelistMerkleRoot The new whitelist merle root to be set
     */
    function setWhitelistMerkleRoot(
        bytes32 _whitelistMerkleRoot
    ) public onlyOwner {
        whitelistMerkleRoot = _whitelistMerkleRoot;
    }

    /**
     * @dev Allow admin to withdraw funds from the contract
     */
    function withdraw() public onlyOwner {
        // require(address(this).balance > 0, "Balance is zero!");
        // payable(owner()).transfer(address(this).balance);

        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
    }

    /**
     * @dev Return the total funds collected
     */
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @dev Return the base uri of nfts
     */
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    /**
     * @dev Allow admin to set the new base metadata uri for the nfts
     * @param _newBaseURI the new base uri to be set
     */
    function setBaseURI(string calldata _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }
}

/* Notes for Remix:

    Contract address: 0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B
        - Mint price: 100000000000000 wei == 0.0001 ether
        - Max supply: 2500
        - Max mint per address: 5

    Merkle root: 0x39a01635c6a38f8beb0adde454f205fffbb2157797bf1980f8f93a5f70c9f8e6

    Owner: 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
        - Deployed the contract
        - Can only call the 'onlyOwner' modifier functions

    Whitelist address: 
        - 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2:
            - Proof: ["0x04a10bfd00977f54cc3450c9b25c9b3a502a089eba0097ba35fc33c4ea5fcb54"]
            - Total mint: 0
        - 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db:
            - Proof: ["0x999bf57501565dbd2fdcea36efa2b9aef8340a8901e3459f4a4c926275d36cdb"]
            - Total mint: 0

    Non whitelist address: 
        - 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB

*/

/* Notes for deploy testnet:

    Contract address: 0x4bBF3F7568A6b52eCDaC62651E1e1Fa6BFE36e0E
        - Mint price: 100000000000000 wei == 0.0001 ether
        - Max supply: 2500
        - Max mint per address: 5

    Merkle root: 0x4557a9c86894907b2ddcc1f3a216c6b3512fc603fc1ff1e210fda8452e4d5c29

    Owner: 0x10a340Aa34e6a5cbe2FC2355D047B2F6d22C2871
        - Deployed the contract
        - Can only call the 'onlyOwner' modifier functions
        - Private key: 8e9dfc7b1e8632ee7d5c769d5091813798d214e6dc4459a3d0e785e8714cb447

    Whitelist address: 
        - 0x83549d6123D43F44E816585bd01fecB1856f1956:
            - Proof: ["0x17c17c2dbdba414be8a46f136fa221488204264b0f7ddf75c97c77a27a074d0c"]
            - Total mint: 0
        - 0xedE4A27Bc064fb075EaAc4Ec6AAef1ac63642752:
            - Proof: ["0x5400275625ff65d71dc0191c97b290a9f24ecd4567d32d8708c8efaeba311980"]
            - Total mint: 0

    Non whitelist address: 
        - 0x3f294E36B99C5A3Ca235Cd7cE9C36b6cAe62E868

*/
