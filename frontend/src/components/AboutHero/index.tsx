import { Box, Typography } from '@mui/material'
import Image from 'next/image'

import { AboutHeroStyle } from './index.style'

const NFT_PRICE = process.env.NEXT_PUBLIC_NFT_PRICE || '0.02'
const TEAM_AMOUNT = process.env.NEXT_PUBLIC_TEAM_AMOUNT || '400'
const ALLOWLIST_AMOUNT = process.env.NEXT_PUBLIC_ALLOWLIST_AMOUNT || '1750'
const WHITELIST_AMOUNT = process.env.NEXT_PUBLIC_WHITELIST_AMOUNT || '350'
const TOTAL_AMOUNT = Number(TEAM_AMOUNT) + Number(ALLOWLIST_AMOUNT) + Number(WHITELIST_AMOUNT)

const AboutHero = () => {
  return (
    <AboutHeroStyle>
      <Box className="about-hero-bg"></Box>
      <Box className="about-hero-noise"></Box>
      <Box className="about-hero-header"></Box>

      <Box className="about-hero-contents-container">
        <Box style={{ paddingBottom: '3.5rem', overflow: 'hidden' }}>
          <Typography variant="h1" className="about-hero-title">
            About GroundUp Genesis Pass
          </Typography>

          <Box className="check-status">
            <Typography className="about-hero-intro-text">
              <b>GroundUp Genesis Pass</b> is the studio’s inaugural collection of 2,500 digital
              collectible NFTs living on the Ethereum chain. It’s a brand new way of recruiting and
              discovering great musical talent, and leverages the web3 ecosystem for creativity,
              commerce and experience immersion.
            </Typography>
            <Typography className="about-hero-intro-text">
              <b>Genesis collection</b> will serve as the digital membership passport of the
              GroundUP music ecosystem, enjoying exclusive rights and interests of members such as
              dividends and voting, and ultimately having the right to participate in the operation
              and governance of the platform. Meanwhile, the unique mechanism of the platform allows
              holders and artists to grow together.
            </Typography>

            <Typography className="about-hero-intro-text">
              Supply: <b>{TOTAL_AMOUNT}</b>
            </Typography>
            <Typography className="about-hero-intro-text">
              Mint Price: <b>{NFT_PRICE}eth</b>
            </Typography>
          </Box>
        </Box>

        <Box className="about-hero-gal">
          <Image
            src="/bg/saxo-gal.png"
            alt="Guitar Gal"
            width={0}
            height={0}
            sizes="100vw"
            priority
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>
      </Box>
    </AboutHeroStyle>
  )
}

export default AboutHero
