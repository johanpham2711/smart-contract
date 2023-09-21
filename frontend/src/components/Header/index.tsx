import { useTheme } from '@emotion/react'
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded'
import { Box, Button, IconButton, Typography, useMediaQuery } from '@mui/material'
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import { useWeb3React } from '@web3-react/core'
import Link from 'next/link'
import { useDispatch } from 'react-redux'

import Twitter from '~/assets/social-icons/twitter.svg'
import Medium from '~/assets/social-icons/medium.svg'
import OpenSea from '~/assets/social-icons/opensea.svg'
import Discord from '~/assets/social-icons/discord.svg'
import { openConnectWalletModal, openDownloadMetaMaskModal } from '~/store/slices/local.slice'
import { PATHS } from '~/utils/constants'

import BrandSite from './BrandSite'
import MenuItem from './MenuItem'
import UserIndicator from './UserIndicator'
import { HeaderStyle, MobileModalStyle } from './index.style'
import AppModal from '../AppModal'
import { useState } from 'react'

const TooltipStyle = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }: any) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.primary
  }
}))

const Header = () => {
  const dispatch = useDispatch()
  const theme = useTheme() as any
  const sm = useMediaQuery(theme.breakpoints.up('sm'))

  const { connector, hooks } = useWeb3React()
  const { useSelectedAccount } = hooks
  const account = useSelectedAccount(connector)
  const [isMobileModalOpened, setMobileModalOpened] = useState(false)

  const onOpenConnectWalletModal = () => {
    dispatch(openConnectWalletModal())
  }

  const onOpenMobileModal = () => {
    setMobileModalOpened(true)
  }

  const onCloseMobileModal = () => {
    setMobileModalOpened(false)
  }

  return (
    <HeaderStyle>
      <Box className="header">
        <Box className="header-container">
          <Box className="header-upper">
            <Box className="header-brand-site">
              <BrandSite width={sm ? 150 : 120} height={sm ? 50 : 40} />
            </Box>

            <Box className="header-main">
              <Box className="header-menu">
                <MenuItem href={PATHS.GENESIS_NFT} target="_blank">
                  GroundUp Studios
                </MenuItem>
              </Box>

              <Box>
                <Box className="socials">
                  <TooltipStyle title="OpenSea">
                    <Link
                      href={PATHS.OPEN_SEA}
                      target="_blank"
                      className="icon-button open-sea"
                      aria-label="OpenSea">
                      <OpenSea height="1.625rem" />
                    </Link>
                  </TooltipStyle>

                  <TooltipStyle title="Twitter">
                    <Link
                      href={PATHS.TWITTER}
                      target="_blank"
                      className="icon-button twitter"
                      aria-label="Twitter">
                      <Twitter height="0.875rem" />
                    </Link>
                  </TooltipStyle>

                  <TooltipStyle title="Medium">
                    <Link
                      href={PATHS.MEDIUM}
                      target="_blank"
                      className="icon-button medium"
                      aria-label="Medium">
                      <Medium height="1.525rem" />
                    </Link>
                  </TooltipStyle>

                  <TooltipStyle title="Discord">
                    <Link
                      href={PATHS.DISCORD}
                      target="_blank"
                      className="icon-button discord"
                      aria-label="Discord">
                      <Discord height="1rem" />
                    </Link>
                  </TooltipStyle>
                </Box>

                {account ? (
                  <>
                    <UserIndicator account={account} />
                  </>
                ) : (
                  <Button onClick={onOpenConnectWalletModal} className="connect-btn">
                    Connect Wallet
                  </Button>
                )}

                <IconButton className="mobile-icon" onClick={onOpenMobileModal}>
                  <MenuOpenRoundedIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>

          <AppModal open={isMobileModalOpened} onClose={onCloseMobileModal}>
            <MobileModalStyle>
              <Box className="mobile-modal">
                <Typography variant="h1" className="mobile-modal-header">
                  GroundUp Genesis Pass
                </Typography>

                <Box className="mobile-modal-body">
                  <MenuItem href={PATHS.GENESIS_NFT} target="_blank">
                    Genesis NFT
                  </MenuItem>
                  <Box className="socials">
                    <Link
                      href={PATHS.OPEN_SEA}
                      target="_blank"
                      className="icon-button open-sea"
                      aria-label="OpenSea">
                      <OpenSea height="1.625rem" />
                    </Link>

                    <Link
                      href={PATHS.TWITTER}
                      target="_blank"
                      className="icon-button twitter"
                      aria-label="Twitter">
                      <Twitter height="0.875rem" />
                    </Link>

                    <Link
                      href={PATHS.MEDIUM}
                      target="_blank"
                      className="icon-button medium"
                      aria-label="Medium">
                      <Medium height="1.525rem" />
                    </Link>

                    <Link
                      href={PATHS.DISCORD}
                      target="_blank"
                      className="icon-button discord"
                      aria-label="Discord">
                      <Discord height="1rem" />
                    </Link>
                  </Box>
                </Box>
              </Box>
            </MobileModalStyle>
          </AppModal>
        </Box>
      </Box>
      {/* <Box className="header-safe"></Box> */}
    </HeaderStyle>
  )
}

export default Header
