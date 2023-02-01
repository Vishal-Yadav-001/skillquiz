import { CircularProgress } from '@mui/material'
import React, { Fragment } from 'react'
/**
 * Shows Progress bar to denote time spent
 * @param {string} variant - type of progress bar determinate or indeterminate
 * @param {number} value - value of the progress bar
 * @param {Object} sx - user custom styles for mui progress
 * @param {string | number} size - size of the progress bar
 * @param {string} color  - color of the progress bar
 * 
 */
const Loader = ({variant,value,sx,size,color}) => {
  return (
    <Fragment>
       <CircularProgress size={size}  variant={variant} value={value} sx={sx} color={color}/>
    </Fragment>
  )
}

export default Loader