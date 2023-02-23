import React, { useEffect, useState, useMemo, memo } from 'react'

import { Room as MarkerIcon } from '@material-ui/icons'
import { isMobile } from 'react-device-detect'

import WheelSlice from 'components/WheelSlice'

import useStyles from './useStylesWheel'

const rewards = [
  {
    name: 'Reward 1'
  },
  {
    name: 'Reward 2'
  },
  {
    name: 'Reward 3'
  },
  {
    name: 'Reward 4'
  },
  {
    name: 'Reward 5'
  },
  {
    name: 'Reward 6'
  },
  {
    name: 'Reward 7'
  },
  {
    name: 'Reward 8'
  }
  // {
  //   name: 'Reward 9'
  // },
  // {
  //   name: 'Reward 10'
  // },
  // {
  //   name: 'Reward 11'
  // },
  // {
  //   name: 'Reward 12'
  // }
]

const rearangedRewards = [...rewards].reverse()
rearangedRewards.unshift(rewards[0])
rearangedRewards.pop()
const mappedRewards = rearangedRewards.map((reward, index) => ({
  ...reward,
  moreThan: index === 0 ? rewards.length - 0.5 : index - 0.5,
  lessThan: index === 0 ? 0.5 : index + 0.5
}))

const spinDuration = 5
const diameter = isMobile ? 280 : 340
const numberOfSlices = rewards.length
const rotateRadius = 360 / numberOfSlices
const radius = diameter / 2
const circumfrance = 6.283185307 * radius
const sliceHeight = circumfrance / numberOfSlices
const sliceOffeset = sliceHeight / 2
const colors = ['#F15D21', '#54CD05', '#D9C502']

const generateRandomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

const randomNumber = generateRandomNumber(10, 10 + rewards.length)

const Wheel = () => {
  const rotation = useMemo(() => randomNumber * 360, [randomNumber])

  const calculatedRotation = (rotation / rotateRadius) % rewards.length
  const selectedReward = mappedRewards.find(
    (item) => item.lessThan > calculatedRotation && item.moreThan < calculatedRotation
  )

  const classes = useStyles({
    spinDuration,
    diameter,
    rotation
  })()
  const [isSpinning, setIsSpinning] = useState(false)

  const handleSetSpinning = () => {
    setIsSpinning(true)
  }

  useEffect(() => {
    if (isSpinning) {
      setTimeout(() => {
        alert(`Hadiah terpilih ${selectedReward?.name}`)
      }, spinDuration * 1000 + 500)
    }
  }, [isSpinning])

  return (
    <>
      <div className={classes.wheelWrapper}>
        {/* <div className={classes.triangle}></div> */}
        <MarkerIcon className={classes.marker}></MarkerIcon>
        <div className={classes.wheelBackground}></div>
        <div className={classes.wheelBoard}>
          <div className={`${classes.wheel} ${isSpinning ? 'spin' : ''}`}>
            {rewards.map((item, index) => (
              <WheelSlice
                key={item.name}
                radius={radius}
                rotate={rotateRadius * index}
                sliceHeight={sliceHeight}
                sliceOffeset={sliceOffeset}
                name={item.name}
                backgroundColor={colors[index % colors.length]}
              />
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSetSpinning}
        className={classes.button}
        disabled={isSpinning}
      >
        Putar
      </button>
    </>
  )
}

export default memo(Wheel)
