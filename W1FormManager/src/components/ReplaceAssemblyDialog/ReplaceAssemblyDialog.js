/* eslint-disable react/prop-types */
import React from 'react';
import {
  Form,
  Field,
  ErrorMessage,
  withFormik,
} from 'formik';
import * as Yup from 'yup';

import ModalDialog from '../ModalDialog/ModalDialog';
import TypeAhead from '../TypeAhead/TypeAhead';
import DropDown from '../DropDown/DropDown';

import { assemblyTypes, assemblySizes } from '../../constants/assemblyTypes';
import { manufacturersService } from '../../services/manufacturers-service';

import './ReplaceAssemblyDialog.css';

class ReplaceAssemblyDialog extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
      manufacturers: [],
      models: [],
    };

    this.onClick = this.onClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.getManufacturers = this.getManufacturers.bind(this);
    this.getModels = this.getModels.bind(this);
  }

  componentDidMount() {
    this.getManufacturers();
    this.getModels();
  }

  onClick() {
    this.setState({ isOpen: true });
  }

  onCloseClick() {
    this.setState({ isOpen: false });
  }

  getManufacturers() {
    manufacturersService.getAll()
      .then((response) => {
        // filter out empty values
        const manufacturers = response.data.d.results.filter(m => m.Name !== '');
        this.setState({
          manufacturers: manufacturers.map(m => ({ value: m.Name, label: m.Name })),
        });
      });
  }

  getModels() {
    manufacturersService.getModels()
      .then((response) => {
        // filter out empty values
        const models = response.data.d.results.filter(m => m.ModelNo !== '');
        this.setState({
          models: models.map(m => ({ ModelNo: m.ModelNo, Manufacturer: m.Manufacturer })),
        });
      });
  }

  render() {
    const {
      values,
      isSubmitting,
      status,
    } = this.props;

    const { isOpen, models, manufacturers } = this.state;
    const { onClick, onCloseClick } = this;

    let manufacturerModels = models.filter(m => m.Manufacturer === values.manufacturer);
    manufacturerModels = manufacturerModels.map(m => m.ModelNo);

    // close dialog if status says so.
    let dialogOpen = isOpen;
    if (status && status.closeDialog) {
      dialogOpen = false;
    }

    return (
      <div id="ReplaceAssemblyDialog">
        <button type="button" className="btn btn-outline-primary" onClick={onClick}>
          Replace Assembly
        </button>
        <ModalDialog isOpen={dialogOpen} onCloseClick={onCloseClick}>
          <h4>Replace Assembly</h4>
          <Form>
            <div className="form-group">
              <label>Type of Assembly</label>
              <DropDown
                name="assemblyType"
                options={assemblyTypes.map(at => ({ value: at, label: at }))}
              />
              <ErrorMessage className="form-text text-danger" name="assemblyType" component="div" />
            </div>
            <div className="form-group">
              <label>Manufacturer</label>
              <DropDown
                name="manufacturer"
                options={manufacturers}
              />
              <ErrorMessage className="form-text text-danger" name="manufacturer" component="div" />
            </div>
            <div className="form-group">
              <label htmlFor="model">Model</label>
              <TypeAhead
                name="model"
                suggestions={manufacturerModels}
              />
              <ErrorMessage className="form-text text-danger" name="model" component="div" />
            </div>
            <div className="form-group">
              <label>Serial #</label>
              <Field name="serialNumber" type="text" className="form-control" />
              <ErrorMessage className="form-text text-danger" name="serialNumber" component="div" />
            </div>
            <div className="form-group">
              <label>Location</label>
              <Field name="location" type="text" className="form-control" />
              <ErrorMessage className="form-text text-danger" name="location" component="div" />
            </div>
            <div className="form-group">
              <label>Size</label>
              <DropDown
                name="size"
                options={assemblySizes.map(s => ({ value: s, label: s }))}
              />
              <ErrorMessage className="form-text text-danger" name="size" component="div" />
            </div>
            <div className="form-group">
              <label>Hazard</label>
              <Field name="hazard" component="textarea" className="form-control" />
              <ErrorMessage className="form-text text-danger" name="hazard" component="div" />
            </div>

            <div className="actions">
              <div className="row">
                <div className="col">
                  {
                    status
                    && status.replaceAssemblyError
                    && (
                    <div className="form-text text-danger text-center">
                      <p>There was an error replacing assembly:</p>
                      <p>{`${status.replaceAssemblyError}`}</p>
                    </div>
                    )
                  }
                </div>
              </div>

              <div className="row">
                <div className="col text-center">
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </Form>

        </ModalDialog>
      </div>
    );
  }
}

export default withFormik({
  mapPropsToValues: () => ({
    assemblyType: '',
    manufacturer: '',
    model: '',
    serialNumber: '',
    location: '',
    size: '',
    hazard: '',
  }),

  validationSchema: Yup.object().shape({
    assemblyType: Yup.string().required('Required'),
    manufacturer: Yup.string().required('Required'),
    model: Yup.string().required('Required'),
    serialNumber: Yup.string().required('Required'),
    location: Yup.string().required('Required'),
    size: Yup.string().required('Required'),
    hazard: Yup.string().required('Required'),
  }),

  handleSubmit: (values, { setSubmitting, setStatus, props }) => {
    const comments = `Old Assembly:
      AssemblyType: ${props.notification.AssemblyType}
      Manufacturer: ${props.notification.Manufacturer}
      ModelNo: ${props.notification.ModelNo}
      SerialNo: ${props.notification.SerialNo}
      Location: ${props.notification.Location}
      Size: ${props.notification.Size}
      Hazard: ${props.notification.HazardCodeDscrpt}
    `;

    const notification = {
      ...props.notification,
      TestType: 'RP',
      AssemblyType: values.assemblyType,
      Manufacturer: values.manufacturer,
      ModelNo: values.model,
      SerialNo: values.serialNumber,
      Location: values.location,
      Size: values.size,
      HazardCodeDscrpt: values.hazard,
      TestComments: comments,
    };
    props.replaceAssembly(notification);
    setStatus({
      closeDialog: true,
    });
    setSubmitting(false);
  },
})(ReplaceAssemblyDialog);
