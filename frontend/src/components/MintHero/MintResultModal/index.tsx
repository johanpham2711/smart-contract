import { Box, Button, Typography } from '@mui/material'

import AppModal from '~/components/AppModal'
import { MintResultModalStyle } from './index.style'

export enum EStatus {
  SUCCESS,
  ERROR
}

type IMintResultModalProps = {
  open: boolean
  onClose: any
  status?: EStatus
  errorContent?: string
}

const MintResultModal = (props: IMintResultModalProps) => {
  const { open, onClose, status = EStatus.SUCCESS, errorContent } = props

  return (
    <AppModal open={open} onClose={onClose}>
      <MintResultModalStyle>
        <Box className="mr-modal">
          <Typography variant="h1" className="mr-modal-header">
            GroundUp Genesis Pass
          </Typography>
          <Box className="mr-modal-body">
            <Box className="mr-modal-info">
              {
                {
                  [EStatus.SUCCESS]: (
                    <>
                      <svg
                        className="checkmark"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 52 52">
                        <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                        <path
                          className="checkmark-check"
                          fill="none"
                          d="M14.1 27.2l7.1 7.2 16.7-16.8"
                        />
                      </svg>
                      <Typography className="content">
                        <b>Minting completed</b>
                        <span>You can now view your new token on the blockchain explorer.</span>
                      </Typography>
                    </>
                  ),
                  [EStatus.ERROR]: (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" width="36" height="36">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.2597 5.26315C13.2597 4.56553 12.6942 4 11.9966 4C11.2989 4 10.7334 4.56553 10.7334 5.26315V12C10.7334 12.6976 11.2989 13.2631 11.9966 13.2631C12.6942 13.2631 13.2597 12.6976 13.2597 12V5.26315ZM11.9966 17.4736C11.2989 17.4736 10.7334 18.0391 10.7334 18.7368C10.7334 19.4344 11.2989 19.9999 11.9966 19.9999H12.012C12.7096 19.9999 13.2751 19.4344 13.2751 18.7368C13.2751 18.0391 12.7096 17.4736 12.012 17.4736H11.9966Z"
                          fill="rgb(233, 73, 73)"></path>
                      </svg>
                      <Typography className="content">
                        <b>Oops, error occured</b>
                        <span>{errorContent}</span>
                      </Typography>
                    </>
                  )
                }[status]
              }
            </Box>

            <Button className="mr-btn center" onClick={onClose}>
              <Box className="btn-content">
                <Typography>
                  {{ [EStatus.SUCCESS]: 'Confirm', [EStatus.ERROR]: 'Cancel' }[status]}
                </Typography>
              </Box>
            </Button>
          </Box>
        </Box>
      </MintResultModalStyle>
    </AppModal>
  )
}

export default MintResultModal
