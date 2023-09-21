import { useTheme } from '@emotion/react'
import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import Grow from '@mui/material/Grow'
import Fade from '@mui/material/Fade'
import { useWeb3React } from '@web3-react/core'
import Link from 'next/link'
import { parseCookies, destroyCookie } from 'nookies'
import Jazzicon from 'react-jazzicon'
import { useState } from 'react'

import { UserIndicatorDropdownMenuStyle, UserIndicatorStyle } from './index.style'
import { COOKIES, PATHS } from '~/utils/constants'
import { formatAccountAddress } from '~/utils/wallet'
import Image from 'next/image'

interface IUserIndicatorProps {
  account: string
}

const METAMASK_ICON =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjAuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zOmV2PSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL3htbC1ldmVudHMiCgkgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAzMTguNiAzMTguNiIKCSBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMTguNiAzMTguNjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNFMjc2MUI7c3Ryb2tlOiNFMjc2MUI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30KCS5zdDF7ZmlsbDojRTQ3NjFCO3N0cm9rZTojRTQ3NjFCO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9Cgkuc3Qye2ZpbGw6I0Q3QzFCMztzdHJva2U6I0Q3QzFCMztzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7fQoJLnN0M3tmaWxsOiMyMzM0NDc7c3Ryb2tlOiMyMzM0NDc7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30KCS5zdDR7ZmlsbDojQ0Q2MTE2O3N0cm9rZTojQ0Q2MTE2O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9Cgkuc3Q1e2ZpbGw6I0U0NzUxRjtzdHJva2U6I0U0NzUxRjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7fQoJLnN0NntmaWxsOiNGNjg1MUI7c3Ryb2tlOiNGNjg1MUI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30KCS5zdDd7ZmlsbDojQzBBRDlFO3N0cm9rZTojQzBBRDlFO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9Cgkuc3Q4e2ZpbGw6IzE2MTYxNjtzdHJva2U6IzE2MTYxNjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7fQoJLnN0OXtmaWxsOiM3NjNEMTY7c3Ryb2tlOiM3NjNEMTY7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30KPC9zdHlsZT4KPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIyNzQuMSwzNS41IDE3NC42LDEwOS40IDE5Myw2NS44ICIvPgo8Zz4KCTxwb2x5Z29uIGNsYXNzPSJzdDEiIHBvaW50cz0iNDQuNCwzNS41IDE0My4xLDExMC4xIDEyNS42LDY1LjggCSIvPgoJPHBvbHlnb24gY2xhc3M9InN0MSIgcG9pbnRzPSIyMzguMywyMDYuOCAyMTEuOCwyNDcuNCAyNjguNSwyNjMgMjg0LjgsMjA3LjcgCSIvPgoJPHBvbHlnb24gY2xhc3M9InN0MSIgcG9pbnRzPSIzMy45LDIwNy43IDUwLjEsMjYzIDEwNi44LDI0Ny40IDgwLjMsMjA2LjggCSIvPgoJPHBvbHlnb24gY2xhc3M9InN0MSIgcG9pbnRzPSIxMDMuNiwxMzguMiA4Ny44LDE2Mi4xIDE0NC4xLDE2NC42IDE0Mi4xLDEwNC4xIAkiLz4KCTxwb2x5Z29uIGNsYXNzPSJzdDEiIHBvaW50cz0iMjE0LjksMTM4LjIgMTc1LjksMTAzLjQgMTc0LjYsMTY0LjYgMjMwLjgsMTYyLjEgCSIvPgoJPHBvbHlnb24gY2xhc3M9InN0MSIgcG9pbnRzPSIxMDYuOCwyNDcuNCAxNDAuNiwyMzAuOSAxMTEuNCwyMDguMSAJIi8+Cgk8cG9seWdvbiBjbGFzcz0ic3QxIiBwb2ludHM9IjE3Ny45LDIzMC45IDIxMS44LDI0Ny40IDIwNy4xLDIwOC4xIAkiLz4KPC9nPgo8Zz4KCTxwb2x5Z29uIGNsYXNzPSJzdDIiIHBvaW50cz0iMjExLjgsMjQ3LjQgMTc3LjksMjMwLjkgMTgwLjYsMjUzIDE4MC4zLDI2Mi4zIAkiLz4KCTxwb2x5Z29uIGNsYXNzPSJzdDIiIHBvaW50cz0iMTA2LjgsMjQ3LjQgMTM4LjMsMjYyLjMgMTM4LjEsMjUzIDE0MC42LDIzMC45IAkiLz4KPC9nPgo8cG9seWdvbiBjbGFzcz0ic3QzIiBwb2ludHM9IjEzOC44LDE5My41IDExMC42LDE4NS4yIDEzMC41LDE3Ni4xICIvPgo8cG9seWdvbiBjbGFzcz0ic3QzIiBwb2ludHM9IjE3OS43LDE5My41IDE4OCwxNzYuMSAyMDgsMTg1LjIgIi8+CjxnPgoJPHBvbHlnb24gY2xhc3M9InN0NCIgcG9pbnRzPSIxMDYuOCwyNDcuNCAxMTEuNiwyMDYuOCA4MC4zLDIwNy43IAkiLz4KCTxwb2x5Z29uIGNsYXNzPSJzdDQiIHBvaW50cz0iMjA3LDIwNi44IDIxMS44LDI0Ny40IDIzOC4zLDIwNy43IAkiLz4KCTxwb2x5Z29uIGNsYXNzPSJzdDQiIHBvaW50cz0iMjMwLjgsMTYyLjEgMTc0LjYsMTY0LjYgMTc5LjgsMTkzLjUgMTg4LjEsMTc2LjEgMjA4LjEsMTg1LjIgCSIvPgoJPHBvbHlnb24gY2xhc3M9InN0NCIgcG9pbnRzPSIxMTAuNiwxODUuMiAxMzAuNiwxNzYuMSAxMzguOCwxOTMuNSAxNDQuMSwxNjQuNiA4Ny44LDE2Mi4xIAkiLz4KPC9nPgo8Zz4KCTxwb2x5Z29uIGNsYXNzPSJzdDUiIHBvaW50cz0iODcuOCwxNjIuMSAxMTEuNCwyMDguMSAxMTAuNiwxODUuMiAJIi8+Cgk8cG9seWdvbiBjbGFzcz0ic3Q1IiBwb2ludHM9IjIwOC4xLDE4NS4yIDIwNy4xLDIwOC4xIDIzMC44LDE2Mi4xIAkiLz4KCTxwb2x5Z29uIGNsYXNzPSJzdDUiIHBvaW50cz0iMTQ0LjEsMTY0LjYgMTM4LjgsMTkzLjUgMTQ1LjQsMjI3LjYgMTQ2LjksMTgyLjcgCSIvPgoJPHBvbHlnb24gY2xhc3M9InN0NSIgcG9pbnRzPSIxNzQuNiwxNjQuNiAxNzEuOSwxODIuNiAxNzMuMSwyMjcuNiAxNzkuOCwxOTMuNSAJIi8+CjwvZz4KPHBvbHlnb24gY2xhc3M9InN0NiIgcG9pbnRzPSIxNzkuOCwxOTMuNSAxNzMuMSwyMjcuNiAxNzcuOSwyMzAuOSAyMDcuMSwyMDguMSAyMDguMSwxODUuMiAiLz4KPHBvbHlnb24gY2xhc3M9InN0NiIgcG9pbnRzPSIxMTAuNiwxODUuMiAxMTEuNCwyMDguMSAxNDAuNiwyMzAuOSAxNDUuNCwyMjcuNiAxMzguOCwxOTMuNSAiLz4KPHBvbHlnb24gY2xhc3M9InN0NyIgcG9pbnRzPSIxODAuMywyNjIuMyAxODAuNiwyNTMgMTc4LjEsMjUwLjggMTQwLjQsMjUwLjggMTM4LjEsMjUzIDEzOC4zLDI2Mi4zIDEwNi44LDI0Ny40IDExNy44LDI1Ni40IAoJMTQwLjEsMjcxLjkgMTc4LjQsMjcxLjkgMjAwLjgsMjU2LjQgMjExLjgsMjQ3LjQgIi8+Cjxwb2x5Z29uIGNsYXNzPSJzdDgiIHBvaW50cz0iMTc3LjksMjMwLjkgMTczLjEsMjI3LjYgMTQ1LjQsMjI3LjYgMTQwLjYsMjMwLjkgMTM4LjEsMjUzIDE0MC40LDI1MC44IDE3OC4xLDI1MC44IDE4MC42LDI1MyAiLz4KPGc+Cgk8cG9seWdvbiBjbGFzcz0ic3Q5IiBwb2ludHM9IjI3OC4zLDExNC4yIDI4Ni44LDczLjQgMjc0LjEsMzUuNSAxNzcuOSwxMDYuOSAyMTQuOSwxMzguMiAyNjcuMiwxNTMuNSAyNzguOCwxNDAgMjczLjgsMTM2LjQgCgkJMjgxLjgsMTI5LjEgMjc1LjYsMTI0LjMgMjgzLjYsMTE4LjIgCSIvPgoJPHBvbHlnb24gY2xhc3M9InN0OSIgcG9pbnRzPSIzMS44LDczLjQgNDAuMywxMTQuMiAzNC45LDExOC4yIDQyLjksMTI0LjMgMzYuOCwxMjkuMSA0NC44LDEzNi40IDM5LjgsMTQwIDUxLjMsMTUzLjUgMTAzLjYsMTM4LjIgCgkJMTQwLjYsMTA2LjkgNDQuNCwzNS41IAkiLz4KPC9nPgo8cG9seWdvbiBjbGFzcz0ic3Q2IiBwb2ludHM9IjI2Ny4yLDE1My41IDIxNC45LDEzOC4yIDIzMC44LDE2Mi4xIDIwNy4xLDIwOC4xIDIzOC4zLDIwNy43IDI4NC44LDIwNy43ICIvPgo8cG9seWdvbiBjbGFzcz0ic3Q2IiBwb2ludHM9IjEwMy42LDEzOC4yIDUxLjMsMTUzLjUgMzMuOSwyMDcuNyA4MC4zLDIwNy43IDExMS40LDIwOC4xIDg3LjgsMTYyLjEgIi8+Cjxwb2x5Z29uIGNsYXNzPSJzdDYiIHBvaW50cz0iMTc0LjYsMTY0LjYgMTc3LjksMTA2LjkgMTkzLjEsNjUuOCAxMjUuNiw2NS44IDE0MC42LDEwNi45IDE0NC4xLDE2NC42IDE0NS4zLDE4Mi44IDE0NS40LDIyNy42IAoJMTczLjEsMjI3LjYgMTczLjMsMTgyLjggIi8+Cjwvc3ZnPgo='
const WALLETCONNECT_ICON =
  'data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjMyIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtNS45NDY4NSA4LjQwMzE1YzMuMzQzMzItMy4yMDQyIDguNzYzOTUtMy4yMDQyIDEyLjEwNzI1IDBsLjU1MzIuNTMwMTdjLjA4MzcuMDgwMTguMDgzOS4yMTAzLjAwMDQuMjkwNjMtLjAwMDEuMDAwMTUtLjAwMDIuMDAwMy0uMDAwNC4wMDA0NWwtMS41Mjc2IDEuNDYzOWMtLjA4MzQuMDgtLjIxODYuMDgtLjMwMjEgMGwtLjU1MzktLjUzMDljLTIuMzMyNC0yLjIzNTMtNi4xMTQtMi4yMzUzLTguNDQ2MzUgMGwtLjU5MzMuNTY4NmMtLjA4MzQ5LjA4LS4yMTg2Mi4wOC0uMzAyMTEgMGwtMS41Mjc1Ni0xLjQ2NDAzYy0uMDgzNjUtLjA4MDE3LS4wODM4Mi0uMjEwMy0uMDAwNC0uMjkwNjIuMDAwMTMtLjAwMDE1LjAwMDI2LS4wMDAzLjAwMDQtLjAwMDM4em0xNC44MDIyNSAyLjU4Mjc1IDEuMzc1NyAxLjMxODRjLjE2NzMuMTYwNC4xNjc2LjQyMDYuMDAwOC41ODE0LS4wMDAzLjAwMDMtLjAwMDUuMDAwNS0uMDAwOC4wMDA4bC01LjUyMzMgNS4yOTM1Yy0uMTY3MS4xNi0uNDM3My4xNi0uNjA0MyAwbC0zLjkyMTItMy43NThjLS4wNDE3LS4wNC0uMTA5Mi0uMDQtLjE1MSAwbC0zLjkyMTA4IDMuNzU4Yy0uMTY3MDIuMTYtLjQzNzI1LjE2LS42MDQyNCAwbC01LjUyMzQ5LTUuMjkzNmMtLjE2NzI5LS4xNjAzLS4xNjc2NS0uNDIwNy0uMDAwNzktLjU4MTQuMDAwMjYtLjAwMDIuMDAwNTItLjAwMDUuMDAwNzktLjAwMDdsMS4zNzU2NC0xLjMxODRjLjA4MzQ5LS4wOC4yMTg2My0uMDguMzAyMTIgMGw0LjA3MjI3IDMuOTAyN2MuMDQxNzguMDQwMS4xMDkzNS4wNDAxLjE1MTA1IDBsMy45MjEwMy0zLjc1NzljLjE2Ny0uMTYwMS40MzcyLS4xNjAxLjYwNDIgMGwzLjkyMTMgMy43NTc5Yy4wNDE3LjA0MDEuMTA5Mi4wNDAxLjE1MSAwbDQuMDcyMi0zLjkwMjdjLjA4MzUtLjA3OTkuMjE4Ni0uMDc5OS4zMDIxIDB6IiBmaWxsPSIjM2I5OWZjIi8+PC9zdmc+'

const UserIndicator = (props: IUserIndicatorProps) => {
  const { account } = props
  const cookies = parseCookies()
  const theme = useTheme() as any
  const sm = useMediaQuery(theme.breakpoints.up('sm'))
  const { connector } = useWeb3React()

  const address = account.slice(2, 10)
  const seed = parseInt(address, 16)

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(menuAnchor)

  const onMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget)
  }

  const onMenuClose = () => {
    setMenuAnchor(null)
  }

  const onDisconnectMetaMask = async () => {
    if (connector?.deactivate) {
      await connector.deactivate()
    } else {
      await connector.resetState()
    }
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('wc@2:core:0.3//messages'))
        localStorage.setItem('wc@2:core:0.3//messages', '{}')
      if (localStorage.getItem('wc@2:core:0.3//subscription'))
        localStorage.setItem('wc@2:core:0.3//subscription', '[]')
      if (localStorage.getItem('wc@2:client:0.3//proposal'))
        localStorage.setItem('wc@2:client:0.3//proposal', '[]')
      if (localStorage.getItem('wc@2:core:0.3//session'))
        localStorage.setItem('wc@2:client:0.3//session', '[]')
      if (localStorage.getItem('wc@2:core:0.3//expirer'))
        localStorage.setItem('wc@2:core:0.3//expirer', '[]')
      if (localStorage.getItem('wc@2:core:0.3//pairing'))
        localStorage.setItem('wc@2:core:0.3//pairing', '[]')
    }
    destroyCookie(null, COOKIES.SIGNATURE, { path: '/' })
    destroyCookie(null, COOKIES.CONNECTOR, { path: '/' })
  }

  const isWalletConnect = cookies[COOKIES.CONNECTOR] === 'walletConnect'

  return (
    <UserIndicatorStyle>
      <Button className="user-indicator" onClick={onMenuOpen}>
        <Jazzicon diameter={26} seed={seed} />
        <Typography className="wallet-address">{formatAccountAddress(account)}</Typography>
      </Button>

      <UserIndicatorDropdownMenuStyle
        id={'fade-menu'}
        anchorEl={menuAnchor}
        open={menuOpen}
        onClose={onMenuClose}
        disableScrollLock
        transformOrigin={{ horizontal: sm ? 'right' : 'center', vertical: 'top' }}
        anchorOrigin={{ horizontal: sm ? 'right' : 'center', vertical: 'bottom' }}
        TransitionComponent={sm ? Grow : Fade}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}>
        <Box className="user-indicator-wrapper">
          <Link href={PATHS.HOME} className="profile-header" onClick={onMenuClose}>
            <Jazzicon diameter={40} seed={seed} />
            <Box className="labels">
              <Typography variant="h1" className="wallet-address">
                {formatAccountAddress(account)}
              </Typography>
              <Typography variant="h2">Profile</Typography>
            </Box>
          </Link>

          <Box className="wallet-info-container">
            <Typography>Connected wallet</Typography>

            <Box className="wallet-info">
              <Box className="wallet-info-header">
                <Box className="wallet-info-account">
                  <Image
                    src={isWalletConnect ? WALLETCONNECT_ICON : METAMASK_ICON}
                    alt={isWalletConnect ? 'WalletConnect' : 'MetaMask'}
                    width={40}
                    height={40}
                    priority
                  />
                  <Box className="wallet-info-address">
                    <Typography>Ethereum</Typography>
                    <Typography variant="h6" className="wallet-address">
                      {formatAccountAddress(account)}
                    </Typography>
                  </Box>
                </Box>

                <Box className="wallet-info-actions">
                  <Button onClick={onDisconnectMetaMask}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      width={24}
                      height={24}
                      className="sc-beqWaB sc-iAEyYk chgwVh">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.75 6C12.75 5.58579 12.4142 5.25 12 5.25C11.5858 5.25 11.25 5.58579 11.25 6V11C11.25 11.4142 11.5858 11.75 12 11.75C12.4142 11.75 12.75 11.4142 12.75 11V6ZM8.3182 9.54302C8.6181 9.2573 8.6296 8.78257 8.34389 8.48267C8.05817 8.18277 7.58344 8.17127 7.28354 8.45698C6.03229 9.64905 5.25 11.3176 5.25 13.1667C5.25 16.8223 8.29213 19.75 12 19.75C15.7079 19.75 18.75 16.8223 18.75 13.1667C18.75 11.3176 17.9677 9.64905 16.7165 8.45698C16.4166 8.17127 15.9418 8.18277 15.6561 8.48267C15.3704 8.78257 15.3819 9.2573 15.6818 9.54302C16.6532 10.4685 17.25 11.7513 17.25 13.1667C17.25 15.9543 14.9196 18.25 12 18.25C9.08045 18.25 6.75 15.9543 6.75 13.1667C6.75 11.7513 7.3468 10.4685 8.3182 9.54302Z"
                        fill="currentColor"
                      />
                    </svg>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box className="terms-footer"></Box>
        </Box>
      </UserIndicatorDropdownMenuStyle>
    </UserIndicatorStyle>
  )
}

export default UserIndicator
