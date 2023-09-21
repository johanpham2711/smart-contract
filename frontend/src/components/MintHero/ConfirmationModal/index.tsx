import { Box, Button, Typography } from '@mui/material'

import AppModal from '~/components/AppModal'
import { ConfirmationModalStyle } from './index.style'

type IConfirmationModalProps = {
  open: boolean
  onClose: any
  onConfirm: any
  quantity: number
  price: number
}

const ConfirmationModal = (props: IConfirmationModalProps) => {
  const { open, onClose, onConfirm, quantity, price } = props

  return (
    <AppModal open={open} onClose={onClose}>
      <ConfirmationModalStyle>
        <Box className="cf-modal">
          <Typography variant="h1" className="cf-modal-header">
            GroundUp Genesis Pass
          </Typography>
          <Box className="cf-modal-body">
            <Typography className="content">
              <span>Minting quantity: </span>
              <b>{quantity} NFT</b>
            </Typography>
            <Typography className="content">
              <span>Total:</span>
              <b>{price * quantity}eth</b>
            </Typography>

            <Button className="cf-btn center bg" onClick={onConfirm}>
              <Box className="btn-content">
                <Typography>Confirm</Typography>
              </Box>
            </Button>
          </Box>
        </Box>
      </ConfirmationModalStyle>
    </AppModal>
  )
}

export default ConfirmationModal
