import { yupResolver } from '@hookform/resolvers/yup'
import EastRoundedIcon from '@mui/icons-material/EastRounded'
import { Box, FormControl, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { DateTime, Duration, DurationObjectUnits } from 'luxon'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { isAddress } from 'web3-validator'

import { checkWallet, resetCheckWalletResult } from '~/store/slices/wallet.slice'
import { RootState } from '~/store/store'
import { PHASE } from '~/utils/constants'
import ResultModal from './ResultModal'
import { CountdownHeroStyle } from './index.style'

type ICountdownHeroProps = {
  phase: PHASE
  waitingCountdown: number
}

const statusSchema = yup.object().shape({
  address: yup
    .string()
    .required('"Wallet address" is not allowed to be empty')
    .test('valid', 'Invalid wallet address', (value) => isAddress(value + ''))
})

const Countdown = (props: ICountdownHeroProps) => {
  const { phase, waitingCountdown } = props
  const [duration, setDuration] = useState<DurationObjectUnits>({ days: 0, hours: 0, minutes: 0 })

  useEffect(() => {
    if (waitingCountdown)
      setDuration(
        Duration.fromMillis(waitingCountdown).shiftTo('days', 'hours', 'minutes').toObject()
      )
  }, [waitingCountdown])

  return (
    <Box className="countdown">
      {
        {
          [PHASE.WAITING]: (
            <>
              <Typography variant="h1">{duration.days}</Typography>
              <Typography>days :</Typography>
              <Typography variant="h1">{duration.hours}</Typography>
              <Typography>h :</Typography>
              <Typography variant="h1">{Math.trunc(duration.minutes || 0)}</Typography>
              <Typography>mins</Typography>
            </>
          ),
          [PHASE.ALLOWLIST]: <Typography variant="h1">Minting now!</Typography>,
          [PHASE.WHITELIST]: <Typography variant="h1">Minting now!</Typography>,
          [PHASE.OVER]: <Typography variant="h1">Mint ended!</Typography>
        }[phase]
      }
    </Box>
  )
}

const CountdownHero = (props: ICountdownHeroProps) => {
  const { phase, waitingCountdown } = props

  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({ resolver: yupResolver(statusSchema) })
  const dispatch = useDispatch()
  const { checkWalletResult } = useSelector((state: RootState) => state.wallet)

  const [isResultModalOpened, setResultModalOpened] = useState(false)
  const [address, setAddress] = useState('')
  const [result, setResult] = useState('')

  const onOpenResultModal = () => {
    setResultModalOpened(true)
    dispatch(resetCheckWalletResult())
  }

  const onCloseResultModal = () => {
    setResultModalOpened(false)
  }

  const onCheckStatus = (data: { [x: string]: string }) => {
    setAddress(data.address)
    dispatch(checkWallet({ walletAddress: data.address }))
  }

  useEffect(() => {
    if (checkWalletResult) {
      setResult(checkWalletResult)
      onOpenResultModal()
    }
  }, [checkWalletResult])

  return (
    <CountdownHeroStyle>
      <Box className="countdown-hero-bg"></Box>
      <Box className="countdown-hero-noise"></Box>
      <Box className="countdown-hero-header"></Box>

      <Box className="countdown-hero-contents-container">
        <Box style={{ paddingBottom: '3.5rem', overflow: 'hidden' }}>
          <Typography variant="h1" className="countdown-hero-title">
            GroundUp Genesis Pass
          </Typography>
          <Typography variant="h3" className="countdown-hero-subtext">
            Countdown to Mint:
          </Typography>

          <Countdown phase={phase} waitingCountdown={waitingCountdown} />

          <Box className="check-status">
            <Typography variant="h3" className="countdown-hero-subtext">
              Check Status:
            </Typography>

            <form onSubmit={handleSubmit(onCheckStatus)}>
              <FormControl className="wallet-address-input">
                <Controller
                  control={control}
                  name="address"
                  render={({ field }) => (
                    <TextField
                      id="form-wallet-address"
                      placeholder="Wallet address"
                      value={field.value || ''}
                      onChange={field.onChange}
                      error={!!errors.address}
                      autoCapitalize="off"
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck="false"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleSubmit(onCheckStatus)}
                              onMouseDown={() => {}}
                              edge="end">
                              <EastRoundedIcon />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                <Box
                  className={`wallet-address-error ${
                    errors.address && errors.address.message ? 'visible' : ''
                  }`}>
                  {errors.address && errors.address.message && (
                    <Typography>{errors.address.message as string}</Typography>
                  )}
                </Box>
              </FormControl>
            </form>

            <ResultModal
              open={isResultModalOpened}
              onClose={onCloseResultModal}
              address={address}
              result={result}
            />

            <Typography className="countdown-hero-intro-text">
              Check your whitelist status by wallet address.
            </Typography>
            <Typography className="countdown-hero-intro-text">
              It may take a few minutes if you have just submitted your wallet.
            </Typography>
            <Typography className="countdown-hero-intro-text">No ENS please.</Typography>
          </Box>
        </Box>

        <Box className="countdown-hero-gal">
          <Image
            src="/bg/guitar-gal.png"
            alt="Guitar Gal"
            width={0}
            height={0}
            sizes="100vw"
            priority
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>
      </Box>
    </CountdownHeroStyle>
  )
}

export default CountdownHero
