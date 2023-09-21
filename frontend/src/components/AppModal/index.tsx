import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Box, IconButton } from '@mui/material'
import { PropsWithChildren } from 'react'

import { AppModalStyle } from './index.style'

type IAppModalProps = {
  open: boolean
  onClose: any
}

const AppModal = (props: IAppModalProps & PropsWithChildren) => {
  const { open, onClose, children } = props

  return (
    <AppModalStyle open={open} onClose={onClose}>
      <>
        <IconButton className="close-icon" onClick={onClose}>
          <CloseRoundedIcon />
        </IconButton>

        <Box className="app-modal">
          <Box className="app-modal-container">
            <Box className="app-modal-scroll">{children}</Box>
          </Box>
        </Box>
      </>
    </AppModalStyle>
  )
}

export default AppModal
