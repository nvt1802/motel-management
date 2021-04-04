import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
// @material-ui/icons
import Clear from "@material-ui/icons/Clear"
import Check from "@material-ui/icons/Check"
// core components
import styles from "assets/jss/material-dashboard-react/components/customInputStyle.js"
import { MenuItem, Select } from "@material-ui/core"

const useStyles = makeStyles(styles)

export default function CustomInput(props) {
  const classes = useStyles()
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success,
    option,
    defaultValue
  } = props

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  })
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined
  })
  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Select
        classes={{
          root: marginTop,
          disabled: classes.disabled
        }}
        id={id}
        defaultValue={defaultValue}
        {...inputProps}
      >
        {option?.map((item, index) => {
          return (
            <MenuItem key={index} value={item?.value}>
              <em>{item.label}</em>
            </MenuItem>
          )
        })}
      </Select>
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
