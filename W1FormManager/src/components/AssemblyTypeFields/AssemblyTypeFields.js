import React from 'react';
import PropTypes from 'prop-types';
import { Field, ErrorMessage } from 'formik';

const renderInput = (name, label, placeholder, key) => (
  <div className="col-6" key={key}>
    <div className="form-group">
      <div className="row">
        <div className="col-5 mt-4 text-right align-self-center">
          <div>{label}</div>
        </div>
        <div className="col">
          <label>{placeholder}</label>
          <Field name={name} type="text" className="form-control" />
          <ErrorMessage className="form-text text-danger" name={name} component="div" />
        </div>
      </div>
    </div>
  </div>
);

const renderFields = (assemblyType) => {
  const fields = [];
  switch (assemblyType) {
    case 'BF-RPA':
    case 'BF-RPDA':
      fields.push(renderInput('MainCheckValve1Psid', 'Check Valve 1', 'PSID', fields.length));
      fields.push(renderInput('MainCheckValve2Psid', 'Check Valve 2', 'PSID', fields.length));
      fields.push(renderInput('MainReliefValvePsid', 'Relief Valve', 'PSID', fields.length));
      break;
    case 'BF-DCA':
    case 'BF-DCDA':
      fields.push(renderInput('MainCheckValve1Psid', 'Check Valve 1', 'PSID', fields.length));
      fields.push(renderInput('MainCheckValve2Psid', 'Check Valve 2', 'PSID', fields.length));
      break;
    case 'BF-PVB':
    case 'BF-SPVB':
      fields.push(renderInput('VBAirInletPsid', 'Air Inlet', 'Opened At', fields.length));
      fields.push(renderInput('VBChkVlvPsid', 'Check Valve', 'Held At', fields.length));
      break;
    default:
      fields.push((<div />));
      break;
  }

  return fields;
};


const AssemblyTypeFields = ({ assemblyType }) => (
  <React.Fragment>
    <div className="row mb-4">
      <div className="col">
        <h2>Passing Backflow Assembly Test</h2>
        <p>Double Check / Detector Assembly</p>
      </div>
    </div>

    <div className="row">
      {renderFields(assemblyType)}
    </div>
  </React.Fragment>
);

AssemblyTypeFields.defaultProps = {
  assemblyType: '',
};

AssemblyTypeFields.propTypes = {
  assemblyType: PropTypes.string,
};

export default AssemblyTypeFields;
