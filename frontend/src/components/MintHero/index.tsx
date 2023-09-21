import { Box, Button, Typography } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import { Duration, DurationObjectUnits } from 'luxon'
import Image from 'next/image'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RevertedMessages } from '~/contracts'
import { openConnectWalletModal, openDownloadMetaMaskModal } from '~/store/slices/local.slice'
import { getMintedStats, getProof, resetProof } from '~/store/slices/wallet.slice'
import { RootState } from '~/store/store'
import { getStatusBlockchain, mintBlockchain } from '~/utils/blockchain'
import { COOKIES, EWalletListType, PHASE } from '~/utils/constants'

import QuantityPicker from '../QuantityPicker'
import ConfirmationModal from './ConfirmationModal'
import LoadingModal from './LoadingModal'
import MintResultModal, { EStatus } from './MintResultModal'
import { MintHeroStyle } from './index.style'

type IMintHeroProps = {
  phase: PHASE
  waitingCountdown: number
  allowlistCountdown: number
  whitelistCountdown: number
}

const NFT_PRICE = process.env.NEXT_PUBLIC_NFT_PRICE || '0.02'
const TEAM_AMOUNT = process.env.NEXT_PUBLIC_TEAM_AMOUNT || '400'
const ALLOWLIST_AMOUNT = process.env.NEXT_PUBLIC_ALLOWLIST_AMOUNT || '1750'
const WHITELIST_AMOUNT = process.env.NEXT_PUBLIC_WHITELIST_AMOUNT || '350'
const TOTAL_AMOUNT = Number(TEAM_AMOUNT) + Number(ALLOWLIST_AMOUNT) + Number(WHITELIST_AMOUNT)

const MintHero = (props: IMintHeroProps) => {
  const { phase, waitingCountdown, allowlistCountdown, whitelistCountdown } = props

  const dispatch = useDispatch()
  const cookies = parseCookies()
  const { gotProof, proof, getProofError, mintedStats } = useSelector(
    (state: RootState) => state.wallet
  )
  const { connector, hooks } = useWeb3React()
  const { useSelectedAccount } = hooks
  const account = useSelectedAccount(connector)

  const [quantity, setQuantity] = useState(1)
  const [isMintBtnClicked, setMintBtnClicked] = useState(false)
  const [isConfirmationModalOpened, setConfirmationModalOpened] = useState(false)
  const [isLoadingModalOpened, setLoadingModalOpened] = useState(false)
  const [isMintResultModalOpened, setMintResultModalOpened] = useState(false)
  const [mintStatus, setMintStatus] = useState(EStatus.SUCCESS)
  const [mintError, setMintError] = useState('Something went wrong.')

  const [waitingDuration, setWaitingDuration] = useState<DurationObjectUnits>({
    days: 0,
    hours: 0,
    minutes: 0
  })
  const [allowlistDuration, setAllowlistDuration] = useState<DurationObjectUnits>({
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [whitelistDuration, setWhitelistDuration] = useState<DurationObjectUnits>({
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const onQuantityChange = (qty: number) => {
    setQuantity(qty)
  }

  const onOpenConfirmationModal = () => {
    setMintBtnClicked(true)
    if (!account) {
      if (typeof window.ethereum !== 'undefined') {
        dispatch(openConnectWalletModal())
      } else {
        dispatch(openDownloadMetaMaskModal())
      }
    } else {
      setConfirmationModalOpened(true)
    }
  }

  const onCloseConfirmationModal = () => {
    setMintBtnClicked(false)
    setConfirmationModalOpened(false)
    onCloseLoadingModal()
  }

  const onOpenLoadingModal = () => {
    setLoadingModalOpened(true)
    handleMintNFTs()
  }

  const onCloseLoadingModal = () => {
    setMintBtnClicked(false)
    setLoadingModalOpened(false)
  }

  const onOpenMintResultModal = () => {
    setMintResultModalOpened(true)
    onCloseConfirmationModal()
    onCloseLoadingModal()
  }

  const onCloseMintResultModal = () => {
    setMintResultModalOpened(false)
  }

  const handleMintNFTs = async () => {
    if (account) {
      getStatusBlockchain()
        .then((status: number) => {
          console.log('SmartContract status: ', status)
          switch (status) {
            case 1:
              dispatch(getProof({ walletAddress: account, type: EWalletListType.ALLOW_LIST }))
              break
            case 2:
              dispatch(getProof({ walletAddress: account, type: EWalletListType.WHITE_LIST }))
              break
            case 3:
              setMintStatus(EStatus.ERROR)
              setMintError('Event is over!')
              onOpenMintResultModal()
          }
        })
        .catch((err) => {
          setMintStatus(EStatus.ERROR)
          setMintError('Something went wrong.')
          onOpenMintResultModal()
        })
    }
  }

  useEffect(() => {
    dispatch(getMintedStats())
  }, [])

  useEffect(() => {
    if (waitingCountdown) {
      setWaitingDuration(
        Duration.fromMillis(waitingCountdown)
          .shiftTo('days', 'hours', 'minutes', 'seconds')
          .toObject()
      )
    }
  }, [waitingCountdown])

  useEffect(() => {
    if (allowlistCountdown) {
      setAllowlistDuration(
        Duration.fromMillis(allowlistCountdown)
          .shiftTo('hours', 'minutes', 'seconds', 'milliseconds')
          .toObject()
      )
    }
  }, [allowlistCountdown])

  useEffect(() => {
    if (whitelistCountdown) {
      setWhitelistDuration(
        Duration.fromMillis(whitelistCountdown)
          .shiftTo('hours', 'minutes', 'seconds', 'milliseconds')
          .toObject()
      )
    }
  }, [whitelistCountdown])

  useEffect(() => {
    if (account && cookies[COOKIES.SIGNATURE] && isMintBtnClicked && !isConfirmationModalOpened) {
      setTimeout(() => {
        setConfirmationModalOpened(true)
      }, 500)
    }
  }, [account, cookies])

  useEffect(() => {
    if (getProofError) {
      setMintStatus(EStatus.ERROR)
      if (
        getProofError.response &&
        getProofError.response.data &&
        getProofError.response.data.message
      )
        setMintError(getProofError.response.data.message)
      onOpenMintResultModal()
    }
  }, [getProofError])

  useEffect(() => {
    if (gotProof && !!proof.length) {
      mintBlockchain({
        amount: quantity,
        merkleProof: proof,
        value: NFT_PRICE.toString()
      })
        .then(() => {
          console.log('Mint done!')
          dispatch(resetProof())
          setMintStatus(EStatus.SUCCESS)
          setMintError('')
          onOpenMintResultModal()
        })
        .catch((err) => {
          console.log('Mint Error: ', err)
          dispatch(resetProof())
          if ((err as Error).message.includes('insufficient funds')) {
            setMintError('Insufficient funds for gas.')
          }
          RevertedMessages.Messages.forEach((message) => {
            if ((err as Error).message.indexOf(message.errorMessage) > -1) {
              setMintError(message.userMessage)
            }
          })
          setMintStatus(EStatus.ERROR)
          onOpenMintResultModal()
        })
    }
  }, [gotProof, proof])

  return (
    <MintHeroStyle className={`phase-${phase}`}>
      <Box className="mint-hero-bg"></Box>
      <Box className="mint-hero-noise"></Box>
      <Box className="mint-hero-header"></Box>

      <Box className="mint-hero-contents-container">
        <Box className="mint-hero-lad">
          <Image
            src="/bg/guitar-lad.png"
            alt="Guitar Lad"
            width={0}
            height={0}
            sizes="100vw"
            priority
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>

        <Box className="mint-hero-content">
          <Typography variant="h1" className="mint-hero-title">
            Mint GroundUp Genesis Pass
          </Typography>

          <Box className="mint-hero-account">
            <Typography variant="h1" className="mint-hero-subtext">
              MINT INFO:
            </Typography>
            <Typography className="mint-hero-intro-text">Phase 1: Team {TEAM_AMOUNT}</Typography>
            <Typography className="mint-hero-intro-text">
              Phase 2: Allowlist {ALLOWLIST_AMOUNT}
            </Typography>
            <Typography className="mint-hero-text">
              Date: August 10th, from 20:00 to 22:00 HKT
              <br />
              Eligible wallets may mint up to 2 during the phase. Minting is NOT guaranteed.
            </Typography>
            <Typography className="mint-hero-intro-text">
              Phase 3: Whitelist {WHITELIST_AMOUNT}
            </Typography>
            <Typography className="mint-hero-text">
              Date: August 10, 2023, 22:00 to August 11, 2023, 10:00 HKT
              <br />
              Eligible wallets may mint 1 during the phase. Minting is guaranteed.
            </Typography>
            <Typography className="mint-hero-intro-text note">
              *No public phase. The remaining NFTs will be allocated to the treasury for community
              rewards.
            </Typography>
          </Box>

          {
            {
              [PHASE.WAITING]: (
                <Box className="mint-hero-info">
                  <Typography className="mint-hero-intro-text">
                    Countdown to Mint:{' '}
                    <strong>
                      {waitingDuration.days} days : {waitingDuration.hours} h :{' '}
                      {waitingDuration.minutes} mins
                    </strong>
                  </Typography>
                </Box>
              ),
              [PHASE.ALLOWLIST]: (
                <>
                  <Box className="mint-hero-info">
                    <Typography className="mint-hero-intro-text">
                      Current phase: <strong>Allowlist Mint</strong>
                    </Typography>
                    <Typography className="mint-hero-intro-text">
                      Current phase ends in:{' '}
                      <strong>
                        {allowlistDuration.hours}h : {allowlistDuration.minutes}m :{' '}
                        {allowlistDuration.seconds}s
                      </strong>
                    </Typography>
                    <Typography className="mint-hero-intro-text">
                      Current phase minted:{' '}
                      <strong>
                        {mintedStats ? mintedStats.allowlistMinted : '??'}/{ALLOWLIST_AMOUNT}
                      </strong>
                    </Typography>
                    <Typography className="mint-hero-intro-text">
                      Total minted:{' '}
                      <strong>
                        {mintedStats ? mintedStats.totalMinted : '??'}/{TOTAL_AMOUNT}
                      </strong>
                    </Typography>
                  </Box>

                  <Box className="mint-section">
                    <Box style={{ display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
                      <Box className="mint-box">
                        <Typography className="mint-hero-intro-text">Mint</Typography>
                        <QuantityPicker onChange={onQuantityChange} />
                        <Typography className="mint-hero-intro-text">
                          {Number(NFT_PRICE) * quantity}eth
                        </Typography>
                      </Box>
                      <Button className="mint-btn" onClick={onOpenConfirmationModal}>
                        Mint
                      </Button>
                    </Box>
                  </Box>
                </>
              ),
              [PHASE.WHITELIST]: (
                <>
                  <Box className="mint-hero-info">
                    <Typography className="mint-hero-intro-text">
                      Current phase: <strong>Whitelist Mint</strong>
                    </Typography>
                    <Typography className="mint-hero-intro-text">
                      Current phase ends in:{' '}
                      <strong>
                        {whitelistDuration.hours}h : {whitelistDuration.minutes}m :{' '}
                        {whitelistDuration.seconds
                          ? parseInt(whitelistDuration.seconds.toString())
                          : 0}
                        s
                      </strong>
                    </Typography>
                    <Typography className="mint-hero-intro-text">
                      Current phase minted:{' '}
                      <strong>
                        {mintedStats ? mintedStats.whitelistMinted : '??'}/{WHITELIST_AMOUNT}
                      </strong>
                    </Typography>
                    <Typography className="mint-hero-intro-text">
                      Total minted:{' '}
                      <strong>
                        {mintedStats ? mintedStats.totalMinted : '??'}/{TOTAL_AMOUNT}
                      </strong>
                    </Typography>
                  </Box>

                  <Box className="mint-section">
                    <Box style={{ display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
                      <Box className="mint-box">
                        <Typography className="mint-hero-intro-text">Mint</Typography>
                        <QuantityPicker onChange={onQuantityChange} />
                        <Typography className="mint-hero-intro-text">
                          {Number(NFT_PRICE) * quantity}eth
                        </Typography>
                      </Box>
                      <Button className="mint-btn" onClick={onOpenConfirmationModal}>
                        Mint
                      </Button>
                    </Box>
                  </Box>
                </>
              ),
              [PHASE.OVER]: (
                <Box className="mint-hero-info">
                  <Typography className="mint-hero-intro-text">Minted: {TOTAL_AMOUNT}/{TOTAL_AMOUNT}</Typography>
                  <Typography className="mint-hero-intro-text">Mint ended!</Typography>
                </Box>
              )
            }[phase]
          }
        </Box>
      </Box>

      <ConfirmationModal
        open={isConfirmationModalOpened}
        onClose={onCloseConfirmationModal}
        onConfirm={onOpenLoadingModal}
        quantity={quantity}
        price={Number(NFT_PRICE)}
      />

      <LoadingModal open={isLoadingModalOpened} onClose={onCloseLoadingModal} />

      <MintResultModal
        open={isMintResultModalOpened}
        onClose={onCloseMintResultModal}
        status={mintStatus}
        errorContent={mintError}
      />
    </MintHeroStyle>
  )
}

export default MintHero
