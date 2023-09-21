import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'

import AppModal from '~/components/AppModal'
import { DownloadMetaMaskModalStyle } from './index.style'
import { PATHS } from '~/utils/constants'

type IDownloadMetaMaskModalProps = {
  open: boolean
  onClose: any
}

const DownloadMetaMaskModal = (props: IDownloadMetaMaskModalProps) => {
  const { open, onClose } = props

  return (
    <AppModal open={open} onClose={onClose}>
      <DownloadMetaMaskModalStyle>
        <Box className="mr-modal">
          <Typography variant="h1" className="mr-modal-header">
            Error
          </Typography>
          <Box className="mr-modal-body">
            <Typography className="content">
              <b>Oops, MetaMask is not available</b>
              <span>Please download MetaMask extension to continue.</span>
              <Link href={PATHS.METAMASK_DOWNLOAD} target="_blank">
                {PATHS.METAMASK_DOWNLOAD}
              </Link>
            </Typography>

            <Button className="mr-btn center" onClick={onClose}>
              <Box className="btn-content">
                <Typography>Cancel</Typography>
              </Box>
            </Button>
          </Box>
        </Box>
      </DownloadMetaMaskModalStyle>
    </AppModal>
  )
}

export default DownloadMetaMaskModal
