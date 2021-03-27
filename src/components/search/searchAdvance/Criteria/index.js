import React from 'react'

export default function Criteria({ criteria, listCriteriaId, setListCriteriaId }) {

  const handleCriteriaClick = (e) => {
    let myListCriteria = new Set()
    myListCriteria = listCriteriaId
    if (myListCriteria.has(e.target.value)) {
      myListCriteria.delete(e.target.value)
    } else {
      myListCriteria.add(e.target.value)
    }
    setListCriteriaId(myListCriteria)
  }

  const renderCriteria = () => {
    var elements = criteria?.map((value, index) => {
      return (<div key={index} className="form-group col-sm-12 col-md-6">
        <label className="my-checkbox-container"> {'Có ' + value.criteriaName}
          {listCriteriaId.has(value.criteriaId.toString()) === true ? (
            <input onClick={handleCriteriaClick} defaultChecked id={value.criteriaId} defaultValue={value.criteriaId} type="checkbox" name={value.criteriaId} />
          ) : (
            <input onClick={handleCriteriaClick} id={value.criteriaId} defaultValue={value.criteriaId} type="checkbox" name={value.criteriaId} />
          )}
          <span className="checkmark" />
        </label>
      </div>)
    })
    return elements
  }

  return <>
    {renderCriteria()}
  </>
}