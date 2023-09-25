import styled from '@emotion/styled'
import { rgba } from 'emotion-rgba'

export const AboutHeroStyle = styled('section')(({ theme }: any) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    color: theme.contrast,
    backgroundColor: '#3c2edd',
    backgroundImage: 'linear-gradient(200deg, #2927bd 41%, #347fe3)',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '1220px',
    zIndex: 1,

    [theme.breakpoints.up('sm')]: {
      display: 'grid',
      placeItems: 'center',
      minHeight: 'unset'
    },

    '.about-hero-bg': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: '100vw',
      opacity: 1,
      backgroundColor: 'transparent',
      backgroundImage: 'url(/bg/purple-bg-mobile.jpg)',
      backgroundPosition: 'center bottom',
      backgroundSize: 'cover',
      zIndex: 0,

      [theme.breakpoints.up('sm')]: {
        backgroundImage: 'url(/bg/purple-bg.jpg)',
        backgroundPosition: '0 0'
      }
    },

    '.about-hero-noise': {
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

    '.about-hero-header': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      position: 'relative',
      width: '100%',
      height: '2rem',
      opacity: 0.05,
      backgroundImage: `linear-gradient(${rgba('#2927bd', 0.8)}, ${rgba('#347fe3', 0)})`,
      paddingTop: '1.5rem',
      zIndex: 1,

      [theme.breakpoints.up('sm')]: {
        height: '5.45rem'
      }
    },

    '.about-hero-contents-container': {
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
        gridTemplateColumns: '46% 54%'
      },

      '.about-hero-title': {
        fontSize: '1.75rem',
        fontWeight: 700,
        lineHeight: '1.375',
        color: theme.contrast,

        [theme.breakpoints.up('sm')]: {
          fontSize: '2.125rem'
        }
      },

      '.check-status': {
        marginTop: '2.75rem'
      },

      '.about-hero-intro-text': {
        fontSize: '1.125rem',
        fontWeight: 400,
        lineHeight: '2rem',
        marginBottom: '1.5rem',

        [theme.breakpoints.up('sm')]: {
          fontSize: '1.25rem',

          'b, strong': {
            fontSize: '1.5rem'
          }
        }
      },

      '.mint-section': {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        borderRadius: '1rem',
        padding: '1.25rem',
        marginTop: '1.875rem',
        backgroundColor: 'rgba(255, 255, 255, .4)',
        boxShadow:
          'inset 0 0 1px rgba(255, 255, 255, .54), inset 0 1px 1px rgba(214, 211, 255, .56), 0 10px 10px -8px rgba(21, 20, 46, .25)',
        // backgroundImage: 'linear-gradient(rgba(21, 20, 46, .34), rgba(21, 20, 46, .11))',
        // boxShadow: '0 1px 1px rgba(255, 255, 255, .15), inset 0 2px 4px rgba(21, 20, 46, .23)',

        '.mint-box': {
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: '0.75rem',

          p: {
            marginBottom: 0
          },

          '.mint-hero-intro-text': {
            fontSize: '100px'
          },

          '.withdraw-text': {
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: '1.5rem',
            marginBottom: '1.5rem',

            [theme.breakpoints.up('sm')]: {
              fontSize: '1.125rem',

              'b, strong': {
                fontSize: '1.5rem'
              }
            }
          }
        },

        '.mint-btn': {
          borderRadius: '0.375rem',
          padding: '0.25rem 0.5rem',
          height: '2.5rem',
          width: '100%',
          fontSize: '1rem',
          fontWeight: 500,
          textTransform: 'initial',
          overflow: 'hidden',
          margin: '1rem auto 0.25rem',
          backgroundColor: theme.primary,
          color: theme.contrast,
          transition: 'all 0.15s ease-in-out 0s',
          transformOrigin: 'center center',

          [theme.breakpoints.up('md')]: {
            padding: '0.75rem 0.875rem',
            fontSize: '1.125rem'
          },

          '&:hover': {
            borderColor: rgba(theme.primary, 0.2)
          },

          '&:active': {
            transform: 'scale(0.95)'
          }
        }
      }
    },

    '.about-hero-gal': {
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
