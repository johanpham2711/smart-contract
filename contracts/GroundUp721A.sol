// SPDX-License-Identifier: MIT

pragma solidity 0.8.18;

import "./ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract GroundUp721A is ERC721A, Ownable {
    enum Status {
        TeamMint, // 0 -> the minting status is locked, Only admin can mint nfts through mintForAddress function
        AllowListMint, // 1 -> allow list sale is open
        WhitelistMint, // 2 -> white list sale is open
        Finished // 4 -> the minting status is finished, Only admin can mint nfts through mintForAddress function
    }

    Status public status; // on sale minting status
    bytes32 public whitelistMerkleRoot; // merkle root for whitelisted addresses
    mapping(address => uint256) public allowListMinted; // number of nfts minted per address in allowlist
    mapping(address => uint256) public whitelistMinted; // number of nfts minted per address in whitelist
    string private baseURI; // the contract metadata uri

    uint256 constant public nftPrice = 0.05 ether; // price per nft
    uint256 constant public maxSupply = 2500; // the maximum number of nfts existed
    uint256 constant public allowListMintAmountPerAddr = 2; // the maximum amount of nfts each address can mint in allowlist
    uint256 constant public whitelistMintAmountPerAddr = 1; // the maximum amount of nfts each address can mint in whitelist

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _uri,
        bytes32 _whitelistMerkleRoot
    ) ERC721A(_name, _symbol) {
        baseURI = _uri;
        whitelistMerkleRoot = _whitelistMerkleRoot;
        setStatus(Status.TeamMint);
    }

    /**
     * @dev Allow users to mint nfts
     * @param _mintAmount Quantity of nfts to mint
     * @param _merkleProof MerkleProof for the address in whitelist, empty array if on allowlist
     */
    function mint(
        uint256 _mintAmount,
        bytes32[] calldata _merkleProof
    ) public payable {
        require(
            status != Status.Finished && status != Status.TeamMint,
            "The whitelist sale is not enabled!"
        );
        require(msg.value >= nftPrice * _mintAmount, "Insufficient funds!");
        require(_mintAmount > 0, "Invalid mint amount!");
        require(
            totalSupply() + _mintAmount <= maxSupply,
            "Max supply exceeded!"
        );

        if (status == Status.AllowListMint) {
            require(
                allowListMinted[msg.sender] + _mintAmount <=
                    allowListMintAmountPerAddr,
                "Exceed maximum allowlist mint amount for each address!"
            );

            allowListMinted[msg.sender] += _mintAmount;
        } else {
            require(
                whitelistMinted[msg.sender] + _mintAmount <=
                    whitelistMintAmountPerAddr,
                "Exceed maximum whitelist mint amount for each address!"
            );

            bytes32 leaf = keccak256(
                bytes.concat(keccak256(abi.encode(_msgSender())))
            );
            require(
                MerkleProof.verify(_merkleProof, whitelistMerkleRoot, leaf),
                "Address is not in whitelist!"
            );

            whitelistMinted[msg.sender] += _mintAmount;
        }
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
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
    }

    /**
     * @dev Return the total funds collected
     */
    function getBalance() public view returns (uint) {
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

    /**
     * @dev Allow admin to set the minting status
     * @param _status the new minting status to be set
     */
    function setStatus(Status _status) public onlyOwner {
        status = _status;
    }
}
