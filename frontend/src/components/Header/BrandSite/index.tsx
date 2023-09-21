import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

import { PATHS } from '~/utils/constants'
import { BrandSiteStyle } from './index.style'

type IBrandSiteProps = {
  width?: number
  height?: number
}

const BrandSite = (props: IBrandSiteProps) => {
  const { width = 150, height = 50 } = props

  return (
    <BrandSiteStyle>
      <Link className="brand-site" href={PATHS.HOME} aria-label="GroundUp Logo">
        <Box className="brand-site-wrapper">
          <Typography variant="h1">GroundUp Logo</Typography>
          <Image src="logo.png" width={width} height={height} priority alt="GroundUp Logo" />
        </Box>
      </Link>
    </BrandSiteStyle>
  )
}

export default BrandSite
