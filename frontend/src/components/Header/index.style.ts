import styled from '@emotion/styled'
import { rgba } from 'emotion-rgba'

export const HeaderStyle = styled('header')(({ theme }: any) => {
  return {
    '.header': {
      position: 'fixed',
      width: '100vw',
      alignItems: 'flex-start',
      backgroundColor: rgba(theme.bg.primary, 0.8),
      borderBottom: `1px solid ${theme.border}`,
      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.04)',
      display: 'flex',
      height: '4rem',
      top: 0,
      left: 0,
      right: 0,
      padding: 0,
      margin: 0,
      backdropFilter: 'blur(8px)',
      transition: 'box-shadow .2s ease-in-out,top .4s cubic-bezier(.25,.8,.25,1)',
      zIndex: 30,

      '.header-container': {
        width: '100%',
        height: '100%',
        margin: '0 auto',
        padding: '0 0.75rem',

        [theme.breakpoints.up('md')]: {
          padding: '0 2.5rem'
        },

        '.header-upper': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%'
        }
      },

      '.header-brand-site': {
        marginRight: '1rem',

        [theme.breakpoints.up('md')]: {
          marginRight: '2.5rem'
        }
      },

      '.header-main': {
        display: 'flex',
        backgroundColor: 'transparent',
        height: '100%',
        flex: 'auto',
        justifyContent: 'flex-end',
        alignItems: 'center',

        '& > div': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        },

        '.header-menu': {
          display: 'none',
          height: '100%',

          [theme.breakpoints.up('md')]: {
            display: 'flex'
          }
        },

        '.socials': {
          display: 'none',

          [theme.breakpoints.up('md')]: {
            display: 'flex'
          }
        },

        '.connect-btn': {
          borderRadius: '0.375rem',
          padding: '0 0.5rem',
          height: '2.25rem',
          fontSize: '0.75rem',
          fontWeight: 600,
          textTransform: 'initial',
          overflow: 'hidden',
          marginLeft: '1rem',
          backgroundColor: 'transparent',
          color: theme.primary,
          border: `1px solid ${rgba(theme.primary, 0.18)}`,
          transition: 'all 0.15s ease-in-out 0s',
          transformOrigin: 'center center',

          [theme.breakpoints.up('md')]: {
            padding: '0.25rem 0.875rem',
            fontSize: '0.813rem'
          },

          '&:hover': {
            borderColor: rgba(theme.primary, 0.2)
          },

          '&:active': {
            transform: 'scale(0.95)'
          }
        },

        '.mobile-icon': {
          display: 'inline-flex',

          [theme.breakpoints.up('md')]: {
            display: 'none'
          }
        }
      },

      '.icon-button': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '2.25rem',
        width: '2.25rem',
        borderRadius: '0.5rem',
        marginLeft: '0.5rem',

        '&:hover': {
          backgroundColor: rgba(theme.primary, 0.04),

          '&.twitter svg': { fill: '#7CCCFF' },
          '&.medium svg': { fill: '#000000' },
          '&.open-sea svg': { fill: '#2081E2' },          
          '&.discord svg': { fill: '#7288DA' }
        },

        svg: {
          fill: rgba(theme.primary, 0.5)
        }
      }
    },

    '.header-safe': {
      height: '4rem'
    }
  }
})

export const MobileModalStyle = styled('div')(({ theme }: any) => {
  return {
    '.mobile-modal': {
      padding: '2rem 0',
      maxHeight: '100%',
      background: theme.contrast,
      boxShadow: 'rgba(27, 32, 50, 0.1) 0px 6px 16px',
      border: `1px solid rgba(22, 22, 26, 0.08)`,
      color: theme.primary,

      [theme.breakpoints.up('sm')]: {
        height: 'auto'
      },

      '.mobile-modal-header': {
        padding: '0 2rem',
        marginBottom: '1.5rem',
        fontSize: '1.375rem',
        lineHeight: '1.75rem',
        fontWeight: 600,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        maxWidth: '100%'
      },

      '.mobile-modal-body': {
        display: 'flex',
        flexDirection: 'column',
        padding: '0 2rem'
      },

      '.menu-item': {
        margin: '0 0 1rem',

        a: {
          padding: 0,
          minWidth: 'unset'
        }
      },

      '.socials': {
        display: 'flex',
        alignItems: 'center',
        borderTop: `1px solid ${rgba(theme.primary, 0.1)}`,
        paddingTop: '1rem',

        '.icon-button': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '2.25rem',
          width: '2.25rem',
          borderRadius: '0.5rem',
          marginLeft: '0.5rem',

          '&:first-of-type': {
            marginLeft: 0
          },

          svg: {
            fill: rgba(theme.primary, 0.5)
          }
        }
      }
    }
  }
})
