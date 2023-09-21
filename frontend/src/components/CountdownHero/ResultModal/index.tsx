import { Box, Button, Typography } from '@mui/material'

import AppModal from '~/components/AppModal'
import { AccountType } from '~/utils/constants'
import { ResultModalStyle } from './index.style'
import { formatAccountAddress } from '~/utils/wallet'

type IResultModalProps = {
  open: boolean
  onClose: any
  address?: string
  result?: string
}

const ResultModal = (props: IResultModalProps) => {
  const { open, onClose, address, result } = props

  return (
    <AppModal open={open} onClose={onClose}>
      <ResultModalStyle>
        <Box className="rs-modal">
          <Typography variant="h1" className="rs-modal-header">
            Status
          </Typography>
          <Box className="rs-modal-body">
            {address && (
              <Typography className="content">
                <span>Wallet address: </span>
                <em className="wallet-address">{formatAccountAddress(address)}</em>
              </Typography>
            )}
            {result && (
              <Typography className="content">
                <span>Result:</span>
                <br />
                <b>{AccountType.find((type) => type.status === result)?.msg}</b>
              </Typography>
            )}

            <Button className="rs-btn center bg" onClick={onClose}>
              <Box className="btn-content">
                <Typography>Close</Typography>
              </Box>
            </Button>
          </Box>
        </Box>
      </ResultModalStyle>
    </AppModal>
  )
}

export default ResultModal
