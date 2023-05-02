import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  TextField,
  Checkbox
} from '@material-ui/core'
import { Timer as TimerIcon } from '@material-ui/icons'
import PinInput from 'react-pin-input'

import useStyles from './useStylesHeader'
import { PhoneIphone as PhoneIcon } from '@material-ui/icons'
import { navigationTabSelectedSet } from 'redux/reducers/navigationTab'
import { millisToMinutesAndSeconds } from 'utils/number'
import {
  authLogin,
  authLoginPin,
  authChangePin,
  authFetch,
  authRegister,
  authResetPin
} from 'redux/reducers/auth'
import type { RootState } from 'redux/rootReducer'

const isAuthenticated = localStorage.getItem('auth')

const headerSelector = ({ auth, navigationTab }: RootState) => ({
  data: auth.data,
  isLoading: auth.isLoading,
  isPinChanged: auth.isPinChanged,
  isPinReset: auth.isPinReset,
  error: auth.error,
  selectedTab: navigationTab.selectedTab
})

const Header = () => {
  const dispatch = useDispatch()
  const headerState = useSelector(headerSelector, shallowEqual)
  const classes = useStyles()
  const [isDialogLoginOpen, setIsDialogLoginOpen] = useState(false)
  const [isDialogPinOpen, setIsDialogPinOpen] = useState(false)
  const [isDialogChangePinOpen, setIsDialogChangePinOpen] = useState(false)
  const [isMsisdnSubmitted, setIsMsisdnSubmitted] = useState(false)
  const [isPinSubmitted, setIsPinSubmitted] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [isTermChecked, setIsTermChecked] = useState(false)
  const [msisdn, setMsisdn] = useState('')
  const [pin, setPin] = useState('')
  const [newPin, setNewPin] = useState('')

  let pinInputRef: PinInput | null

  const { error, data, isPinReset } = headerState
  const isFirstTimePin = data.is_first_time_pin && +data.is_first_time_pin === 1

  const handleClickLogin = () => {
    setIsDialogLoginOpen(true)
  }

  const handleCloseDialogLogin = () => {
    setIsDialogLoginOpen(false)
  }

  const handleSubmitLogin = () => {
    dispatch(authLogin(msisdn))
    setIsMsisdnSubmitted(true)
  }

  const handleSubmitRegister = () => {
    dispatch(authRegister(msisdn))
    setIsMsisdnSubmitted(true)
    setIsRegister(true)
  }

  const handleCloseDialogPin = () => {
    setIsDialogPinOpen(false)
  }

  const handleSubmitPin = () => {
    dispatch(authLoginPin(msisdn, pin))
    setIsPinSubmitted(true)
  }

  const handleResetPin = () => {
    dispatch(authResetPin())
    pinInputRef?.clear()
  }

  const handleSubmitChangePin = () => {
    dispatch(authChangePin(pin, newPin))
  }

  const handleToProfile = () => {
    dispatch(navigationTabSelectedSet(4))
  }

  const handleCheckTerm = () => {
    setIsTermChecked((prevState) => !prevState)
  }

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(authFetch())
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (headerState.data.id && isMsisdnSubmitted) {
      setIsDialogLoginOpen(false)
      setIsDialogPinOpen(true)
    }
  }, [headerState.data, isMsisdnSubmitted])

  useEffect(() => {
    if (headerState.data.token && isPinSubmitted && isFirstTimePin && !isPinReset) {
      setIsDialogPinOpen(false)
      setIsDialogChangePinOpen(true)
      localStorage.setItem('token', headerState.data.token)
    }
    if (headerState.data.token && isPinSubmitted && !isFirstTimePin) {
      setIsDialogPinOpen(false)
      localStorage.setItem('auth', '1')
      localStorage.setItem('token', headerState.data.token)
      location.href = '/'
    }
  }, [headerState.data, isPinSubmitted, isFirstTimePin, isPinReset])

  useEffect(() => {
    if (headerState.data.token && headerState.isPinChanged && headerState.selectedTab === 0) {
      setIsDialogChangePinOpen(false)
      localStorage.setItem('auth', '1')
      localStorage.setItem('token', headerState.data.token)
      location.href = '/'
    }
  }, [headerState.isPinChanged, headerState.data, headerState.selectedTab])

  return (
    <>
      <div className={classes.header}>
        <div className={classes.headerContent}>
          {isAuthenticated && (
            <div className={classes.user}>
              <div onClick={handleToProfile} className={classes.buttonProfile}>
                <PhoneIcon />
                <div className={classes.buttonProfileLabel}>
                  <Typography className={classes.profileName}>{data.name || '-'}</Typography>
                  <Typography className={classes.profileMsisdn}>{data.msisdn}</Typography>
                </div>
              </div>
            </div>
          )}

          {isAuthenticated ? (
            <div className={classes.timer}></div>
          ) : (
            <div className={classes.logout}>
              <Button onClick={handleClickLogin} size="small" variant="outlined" color="primary">
                Masuk
              </Button>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isDialogLoginOpen} onClose={handleCloseDialogLogin} fullWidth maxWidth="xs">
        <DialogContent>
          <Typography>Silakan masukan nomor handphone kamu</Typography>
          <TextField
            variant="outlined"
            margin="dense"
            placeholder="081234567890"
            onChange={(e) => setMsisdn(e.target.value)}
            value={msisdn}
            error={!!error.message}
            helperText={error.message}
            fullWidth
            type="tel"
          />
          <div className={classes.checkboxWrapper}>
            <Checkbox
              color="primary"
              checked={isTermChecked}
              onClick={handleCheckTerm}
              size="small"
              className={classes.checkbox}
            />
            <Typography variant="caption">
              Saya menyetujui syarat dan ketentuan yang berlaku, serta bersedia menerima promosi
              dari PT. Koneksi Global
            </Typography>
          </div>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={handleSubmitRegister}
            disabled={headerState.isLoading || msisdn.length < 8 || !isTermChecked}
          >
            Daftar
          </Button>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={handleSubmitLogin}
            disabled={headerState.isLoading || msisdn.length < 8 || !isTermChecked}
          >
            Masuk
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDialogPinOpen} fullWidth maxWidth="xs">
        <DialogContent>
          {isPinReset ? (
            <Typography>PIN baru telah terkirim ke nomor handphone mu. Cek inbox SMS.</Typography>
          ) : (
            <Typography>Masukan nomor PIN kamu. {isFirstTimePin && 'Cek inbox SMS'}</Typography>
          )}
          <div className={classes.inputPin}>
            <PinInput
              length={6}
              onChange={(value, index) => setPin(value)}
              type="numeric"
              inputMode="number"
              focus
              inputFocusStyle={{ borderColor: '#30cfa2' }}
              ref={(n) => (pinInputRef = n)}
            />
            {error.message && (
              <small style={{ color: 'red', marginTop: '8px' }}>{error.message}</small>
            )}
          </div>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between' }}>
          {!isPinReset && !isRegister ? (
            <Button
              variant="text"
              size="small"
              color="primary"
              onClick={handleResetPin}
              disabled={headerState.isLoading}
            >
              Reset PIN
            </Button>
          ) : (
            <div />
          )}
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={handleSubmitPin}
            disabled={headerState.isLoading || pin.length < 6}
          >
            Konfirmasi
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDialogChangePinOpen} fullWidth maxWidth="xs">
        <DialogContent>
          <Typography>Masukan nomor pin baru kamu.</Typography>
          <div className={classes.inputPin}>
            <PinInput
              length={6}
              onChange={(value, index) => setNewPin(value)}
              type="numeric"
              inputMode="number"
              focus
              inputFocusStyle={{ borderColor: '#30cfa2' }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={handleSubmitChangePin}
            disabled={headerState.isLoading || newPin.length < 6}
          >
            Ubah PIN
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Header
