/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"
// core components
import GridItem from "components/Grid/GridItem.js"
import GridContainer from "components/Grid/GridContainer.js"
import CustomInput from "components/CustomInput/CustomInput.js"
import Button from "components/CustomButtons/Button.js"
import Card from "components/Card/Card.js"
import CardHeader from "components/Card/CardHeader.js"
import CardAvatar from "components/Card/CardAvatar.js"
import CardBody from "components/Card/CardBody.js"
import CardFooter from "components/Card/CardFooter.js"
import CustomSelect from "components/CustomSelects"
import Combobox from "components/Combobox"

import avatar from "assets/img/faces/marc.jpg"
import { connect } from "react-redux"
import { provinceAction } from '../../../redux/actions'
import services from '../../../services'

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
}

const useStyles = makeStyles(styles)

function UserProfile({ account, province, fetchProvince }) {
  const classes = useStyles()
  const [provinceOption, setProvinceOption] = useState([])
  const [provinceDefault, setProvinceDefault] = useState({})
  const [districtOption, setDistrictOption] = useState([])
  const [districtDefault, setDistrictDefault] = useState({})

  useEffect(() => {
    if (!province) {
      fetchProvince()
    }
  }, [fetchProvince, province])

  const renderProvince = (list) => {
    const rows = list?.map((v) => {
      if (Number(v.province_id) === account.provinceId) {
        setProvinceDefault({
          label: v.province_name,
          value: Number(v.province_id)
        })
      }
      return {
        label: v.province_name,
        value: Number(v.province_id)
      }
    })
    setProvinceOption(rows)
  }

  const renderDistrict = (list) => {
    const rows = list?.map((v) => {
      if (Number(v.district_id) === account.districtId) {
        setDistrictDefault({
          label: v.district_name,
          value: Number(v.district_id)
        })
      }
      return {
        label: v.district_name,
        value: Number(v.district_id)
      }
    })
    setDistrictOption(rows)
  }

  useEffect(() => {
    if (province && provinceOption?.length === 0) {
      renderProvince(province)
    }
  }, [province, provinceOption, renderProvince])

  useEffect(() => {
    if (districtOption?.length === 0) {
      services.district.findDistrictByProvinceId(account?.provinceId).then(res => {
        renderDistrict(res.data?.results)
      }).catch(err => { })
    }
  }, [account?.provinceId, districtOption, renderDistrict])

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      readOnly: true,
                      defaultValue: account.userName
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email"
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      defaultValue: account.email
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Phone"
                    id="phone"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      defaultValue: account.phone
                    }}
                  />
                </GridItem>
              </GridContainer>
              {/* <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: 'password'
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Confirm Password"
                    id="confirm-password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: 'password'
                    }}
                  />
                </GridItem>
              </GridContainer> */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Name"
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      defaultValue: account.name
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="BirthDay"
                    id="birthday"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      defaultValue: account.birthday
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomSelect
                    labelText="Gender"
                    id="gender"
                    formControlProps={{
                      fullWidth: true
                    }}
                    defaultValue={account.gender || 0}
                    option={[
                      { label: 'N/A', value: 0 },
                      { label: 'Nam', value: 1 },
                      { label: 'Nữ', value: 2 }
                    ]}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  {provinceOption?.length > 0 &&
                    <Combobox
                      labelText="Province"
                      id="province"
                      formControlProps={{
                        fullWidth: true
                      }}
                      defaultValue={provinceDefault}
                      options={provinceOption}
                      onChange={(event, value) => console.log(value)}
                    />
                  }
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  {districtOption?.length > 0 &&
                    <Combobox
                      labelText="Dictrict"
                      id="dictrict"
                      formControlProps={{
                        fullWidth: true
                      }}
                      defaultValue={districtDefault}
                      options={districtOption}
                    />
                  }
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button color="primary" round>
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  )
}

const mapStateToProps = (state) => ({
  account: state?.authenticate?.data,
  province: state?.province?.data
})

const mapDispatchToProps = (dispatch) => ({
  fetchProvince: () => { dispatch(provinceAction.initProvince()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)