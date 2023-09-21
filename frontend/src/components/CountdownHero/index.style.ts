import styled from '@emotion/styled'
import { rgba } from 'emotion-rgba'

export const CountdownHeroStyle = styled('section')(({ theme }: any) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    color: theme.contrast,
    backgroundColor: '#3c2edd',
    backgroundImage: 'linear-gradient(200deg, #2927bd 41%, #347fe3)',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '925px',
    zIndex: 1,

    [theme.breakpoints.up('sm')]: {
      display: 'grid',
      placeItems: 'center',
      minHeight: 'unset'
    },

    '.countdown-hero-bg': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: '100vw',
      opacity: 1,
      backgroundColor: 'transparent',
      backgroundImage: 'url(/bg/blue-bg-mobile.jpg)',
      backgroundPosition: 'center bottom',
      backgroundSize: 'cover',
      zIndex: 0,

      [theme.breakpoints.up('sm')]: {
        backgroundImage: 'url(/bg/blue-bg.jpg)',
        backgroundPosition: '0 0'
      }
    },

    '.countdown-hero-noise': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      opacity: 0.05,
      mixBlendMode: 'overlay',
      backgroundColor: 'transparent',
      backgroundImage: 'url(/bg/noise-light.webp)',
      backgroundPosition: '0 0',
      backgroundSize: '10.5rem',
      zIndex: 0
    },

    '.countdown-hero-header': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      position: 'relative',
      width: '100%',
      height: '6rem',
      opacity: 0.05,
      backgroundImage: `linear-gradient(${rgba('#2927bd', 0.8)}, ${rgba('#347fe3', 0)})`,
      paddingTop: '1.5rem',
      zIndex: 1,

      [theme.breakpoints.up('sm')]: {
        height: '9.45rem'
      }
    },

    '.countdown-hero-contents-container': {
      display: 'grid',
      gridTemplateColumns: '1fr',
      position: 'relative',
      flex: 1,
      flexDirection: 'column',
      alignSelf: 'flex-start',
      alignItems: 'flex-start',
      maxWidth: '1440px',
      width: '100%',
      minHeight: '6.25rem',
      gridColumnGap: '1.5rem',
      gridRowGap: '1.5rem',
      zIndex: 1,
      padding: '0 1rem',
      paddingBottom: 0,

      [theme.breakpoints.up('md')]: {
        padding: '2rem 2.5rem',
        paddingBottom: 0,
        gridTemplateColumns: '60% 56%'
      },

      [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: '44% 56%'
      },

      '.countdown-hero-title': {
        fontSize: '1.75rem',
        fontWeight: 700,
        lineHeight: '1.375',
        color: theme.contrast,

        [theme.breakpoints.up('sm')]: {
          fontSize: '2.5rem'
        }
      },

      '.countdown-hero-subtext': {
        fontSize: '1.5rem',
        fontWeight: 700,
        lineHeight: '1.75',
        color: theme.contrast,

        [theme.breakpoints.up('sm')]: {
          fontSize: '1.75rem'
        }
      },

      '.countdown': {
        display: 'flex',
        alignItems: 'baseline',
        gap: '0.5rem',
        marginTop: '2rem',

        [theme.breakpoints.up('sm')]: {
          marginTop: '2.75rem'
        },

        h1: {
          fontSize: '2rem',
          fontWeight: 600,

          [theme.breakpoints.up('sm')]: {
            fontSize: '4rem'
          }
        },

        p: {
          fontSize: '1.5rem',
          fontWeight: 600,

          [theme.breakpoints.up('sm')]: {
            fontSize: '2.25rem'
          }
        }
      },

      '.check-status': {
        marginTop: '2.75rem',

        '.wallet-address-input': {
          display: 'flex',
          marginTop: '1rem',
          marginBottom: '0.5rem',

          [theme.breakpoints.up('sm')]: {
            marginTop: '1.5rem'
          },

          '.MuiInputBase-root': {
            borderRadius: '0.5rem',
            backgroundColor: rgba(theme.contrast, 0.2),
            maxWidth: '27rem',
            overflow: 'hidden'
          },

          input: {
            color: theme.contrast,
            fontWeight: 600,
            backdropFilter: 'blur(2px)',
            width: '100%',
            height: '1rem',

            '&::placeholder': {
              color: rgba(theme.contrast, 1)
            }
          },

          '.MuiInputAdornment-root': {
            marginRight: '0.25rem',

            svg: {
              color: theme.primary
            }
          },

          fieldset: {
            borderWidth: 2,
            borderColor: rgba(theme.contrast, 0.6)
          },

          '.Mui-error': {
            fieldset: {
              borderColor: rgba(theme.error, 0.6)
            }
          }
        },

        '.wallet-address-error': {
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          marginTop: '0.5rem',
          color: theme.error,
          fontWeight: 500,
          opacity: 0,
          visibility: 'hidden',
          minHeight: '20px',

          '&.visible': {
            opacity: 1,
            visibility: 'visible'
          },

          svg: {
            fontSize: '1.25rem'
          },

          p: {
            fontSize: '0.825rem'
          }
        }
      },

      '.countdown-hero-intro-text': {
        fontSize: '1.125rem',
        fontWeight: 400,
        lineHeight: '2rem'
      }
    },

    '.countdown-hero-gal': {
      position: 'relative',
      flex: 1,
      height: '100%',
      zIndex: -1,

      [theme.breakpoints.up('sm')]: {
        opacity: 0.2
      },

      [theme.breakpoints.up('md')]: {
        display: 'flex',
        opacity: 1
      },

      img: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0
      }
    }
  }
})
