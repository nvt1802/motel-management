import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
// @material-ui/icons
import Clear from "@material-ui/icons/Clear"
import Check from "@material-ui/icons/Check"
// core components
import styles from "assets/jss/material-dashboard-react/components/customInputStyle.js"
import { TextField } from "@material-ui/core"
import { Autocomplete } from '@material-ui/lab'

const useStyles = makeStyles(styles)

export default function CustomInput(props) {
  const classes = useStyles()
  const {
    formControlProps,
    labelText,
    id,
    inputProps,
    error,
    success,
    options,
    defaultValue
  } = props

  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined
  })
  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      <Autocomplete
        classes={{
          root: marginTop
        }}
        id={id}
        {...inputProps}
        options={options}
        defaultValue={defaultValue}
        getOptionLabel={(option) => option?.label}
        renderInput={(params) => <TextField {...params} label={labelText} variant="standard" />}
      />
      {error ? (
        <Clear className={classes.feedback + " " + classes.labelRootError} />
      ) : success ? (
        <Check className={classes.feedback + " " + classes.labelRootSuccess} />
      ) : null}
    </FormControl>
  )
}

CustomInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool
}
