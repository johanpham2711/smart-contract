import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AboutHero from '~/components/AboutHero'
import ConnectWalletModal from '~/components/ConnectWalletModal'
import CountdownHero from '~/components/CountdownHero'
import DownloadMetaMaskModal from '~/components/DownloadMetaMaskModal'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import MintHero from '~/components/MintHero'
import { connectors } from '~/connectors'
import { closeConnectWalletModal, closeDownloadMetaMaskModal } from '~/store/slices/local.slice'
import { RootState } from '~/store/store'
import { COOKIES, PHASE } from '~/utils/constants'

import { LandingPageStyle } from '~/styles/pages/index.style'
import { useCountdown } from '~/hooks/useCountdown'

const eventAllowlistTimestamp = process.env.NEXT_PUBLIC_ALLOWLIST_TIMESTAMP || '1691668800000' //1691114400000
const eventWhitelistTimestamp = process.env.NEXT_PUBLIC_WHITELIST_TIMESTAMP || '1691676000000'
const eventOverTimestamp = process.env.NEXT_PUBLIC_OVER_TIMESTAMP || '1691719200000'

const LandingPage = () => {
  const dispatch = useDispatch()
  const cookies = parseCookies()

  const [metaMask, useMetaMask] = connectors[0]
  const [walletConnectV2, useWalletConnectV2] = connectors[1]

  const { isDownloadMetaMaskModalOpened, isConnectWalletModalOpened } = useSelector(
    (state: RootState) => state.local
  )

  const [phase, setPhase] = useState<PHASE>(PHASE.WAITING)
  const waitingCountdown = useCountdown(Number(eventAllowlistTimestamp))
  const allowlistCountdown = useCountdown(Number(eventWhitelistTimestamp))
  const whitelistCountdown = useCountdown(Number(eventOverTimestamp))

  const onCloseDownloadMetaMaskModal = () => {
    dispatch(closeDownloadMetaMaskModal())
  }

  const onCloseConnectWalletModal = () => {
    dispatch(closeConnectWalletModal())
  }

  const getPhase = () => {
    if (waitingCountdown > 0) {
      setPhase(PHASE.WAITING)
    } else if (allowlistCountdown > 0) {
      setPhase(PHASE.ALLOWLIST)
    } else if (whitelistCountdown > 0) {
      setPhase(PHASE.WHITELIST)
    } else {
      setPhase(PHASE.OVER)
    }
  }

  useEffect(() => {
    if (phase === PHASE.WAITING && waitingCountdown <= 0) getPhase()
  }, [waitingCountdown])

  useEffect(() => {
    if (phase === PHASE.ALLOWLIST && allowlistCountdown <= 0) getPhase()
  }, [allowlistCountdown])

  useEffect(() => {
    if (phase === PHASE.WHITELIST && whitelistCountdown <= 0) getPhase()
  }, [whitelistCountdown])

  useEffect(() => {
    getPhase()
  }, [])

  useEffect(() => {
    const chainId = process.env.NEXT_PUBLIC_SUPPORT_CHAIN_ID || '1'

    if (cookies[COOKIES.SIGNATURE]) {
      switch (cookies[COOKIES.CONNECTOR]) {
        case 'metaMask':
          if (chainId && window.ethereum && window.ethereum.networkVersion === chainId)
            metaMask?.connectEagerly()
          break
        case 'walletConnect':
          walletConnectV2?.connectEagerly()
          break
      }
    }
  }, [])

  return (
    <>
      <Header />

      <LandingPageStyle>
        <CountdownHero phase={phase} waitingCountdown={waitingCountdown} />
        <MintHero
          phase={phase}
          waitingCountdown={waitingCountdown}
          allowlistCountdown={allowlistCountdown}
          whitelistCountdown={whitelistCountdown}
        />
        <AboutHero />
        <Footer />

        <ConnectWalletModal open={isConnectWalletModalOpened} onClose={onCloseConnectWalletModal} />
        <DownloadMetaMaskModal
          open={isDownloadMetaMaskModalOpened}
          onClose={onCloseDownloadMetaMaskModal}
        />
      </LandingPageStyle>
    </>
  )
}

export default LandingPage
