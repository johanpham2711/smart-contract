import { Box, Typography } from '@mui/material'

import AppModal from '~/components/AppModal'
import { LoadingModalStyle } from './index.style'

type ILoadingModalProps = {
  open: boolean
  onClose: any
}

const LoadingModal = (props: ILoadingModalProps) => {
  const { open, onClose } = props

  return (
    <AppModal open={open} onClose={onClose}>
      <LoadingModalStyle>
        <Box className="ld-modal">
          <Box className="ld-modal-spinner">
            <Box></Box>
          </Box>
          <Typography variant="h1" className="ld-modal-header">
            Minting
          </Typography>
          <Box className="ld-modal-body">
            <Typography className="content">
              Minting is in progress. Please chill and wait for a while.
            </Typography>
          </Box>
        </Box>
      </LoadingModalStyle>
    </AppModal>
  )
}

export default LoadingModal
