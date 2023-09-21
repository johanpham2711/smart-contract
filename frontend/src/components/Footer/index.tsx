import { Box, Typography } from '@mui/material'

import { FooterStyle } from './index.style'

const Footer = () => {
  return (
    <FooterStyle>
      <Box className="footer-container">
        <Typography>Copyright © 2023 GroundUp Studios | All Rights Reserved</Typography>
      </Box>
    </FooterStyle>
  )
}

export default Footer
