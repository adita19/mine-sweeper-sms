import { makeStyles } from '@material-ui/core'

const useStyles = ({ spinDuration, diameter, rotation }: any) =>
  makeStyles(() => {
    return {
      wheelWrapper: {
        position: 'relative',
        transform: 'rotate(-90deg)'
      },
      wheelBoard: {
        height: `${diameter - 2}px`,
        width: `${diameter - 2}px`,
        position: 'relative',
        borderRadius: '100%',
        overflow: 'hidden',
        zIndex: 1,
        border: '2px solid #00000038'
      },
      wheelBackground: {
        borderRadius: '100%',
        height: `${diameter + 32}px`,
        width: `${diameter + 32}px`,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background:
          'linear-gradient(90deg, rgba(171,180,58,1) 0%, rgba(253,119,29,1) 50%, rgba(208,252,69,1) 100%)',
        '-webkit-box-shadow': '0px 0px 60px 0px rgba(255,255,46,0.82)',
        '-moz-box-shadow': '0px 0px 60px 0px rgba(255,255,46,0.82)',
        boxShadow: '0px 0px 60px 0px rgba(255,255,46,0.82)',
        zIndex: 1
      },
      wheel: {
        height: '100%',
        transition: 'all 5s ease-out',
        animationFillMode: 'forwards',
        animationTimingFunction: 'linear',
        '&.spin': {
          animationDuration: `${spinDuration}s`,
          animationTimingFunction: 'cubic-bezier(0.440, -0.080, 0.000, 1.030)',
          animationName: '$spinning'
        },
        '&:after': {
          boxShadow: 'inset 0px 0px 6px 6px rgba(0,0,0,0.42)',
          content: '""',
          textAlign: 'center',
          display: 'block',
          lineHeight: 60,
          position: 'absolute',
          height: '100%',
          width: '100%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '100%',
          zIndex: 200
        },
        '&:before': {
          content: '""',
          textAlign: 'center',
          display: 'block',
          lineHeight: 60,
          position: 'absolute',
          height: 40,
          width: 40,
          background: 'gold',
          boxShadow: '0 0 5px 5px rgba(0, 0, 0, .22)',
          top: '50%',
          left: '50%',
          marginTop: '-20px',
          marginLeft: '-20px',
          borderRadius: '100%',
          zIndex: 200
        }
      },
      markerIcon: {
        color: '#7d0000',
        top: '50%',
        right: 0,
        width: '40px',
        height: '60px',
        zIndex: 2,
        position: 'absolute',
        clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
        transform: 'translate(50%, -50%) rotate(90deg)'
      },
      starIcon: {
        top: '50%',
        left: '50%',
        color: '#7d0000',
        right: 0,
        width: 40,
        height: 60,
        zIndex: 2,
        position: 'absolute',
        transform: 'translate(-50%, -50%) rotate(90deg)'
      },
      button: {
        width: 100,
        border: '8px solid #730000',
        cursor: 'pointer',
        height: 100,
        zIndex: 1,
        position: 'relative',
        fontSize: 24,
        background: '#c80000',
        fontFamily: 'Play, sans-serif',
        fontWeight: 600,
        borderRadius: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
          boxShadow: '0px 0px 60px 0px rgba(255,46,46,0.82)'
        },
        '&.disabled': {
          background: '#980000',
          color: '#8e8e8e',
          cursor: 'auto',
          '&:hover': {
            boxShadow: 'none'
          }
        }
      },
      wheelLeg: {
        clipPath: 'polygon(50% 0%, 100% 38%, 100% 100%, 0 100%, 0% 38%)',
        width: `${diameter}px`,
        height: `${diameter}px`,
        background: 'linear-gradient(45deg, rgba(231, 125, 39, 1) 45%, rgba(255,205,35,1) 50%)',
        position: 'absolute',
        top: '50%',
        left: '-12%',
        transform: 'rotate(90deg)',
        transformOrigin: 'top center'
      },
      '@keyframes spinning': {
        from: {
          transform: 'rotate(0)'
        },
        to: {
          transform: `rotate(${rotation}deg)`
        }
      }
    }
  })

export default useStyles
