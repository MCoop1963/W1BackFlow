import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';
import { Form } from 'react-formik-ui';

import TypeAhead from '../TypeAhead/TypeAhead';
import DropDown from '../DropDown/DropDown';

import { manufacturersService } from '../../services/manufacturers-service';

const initialValues = { manufacturer: '', model: '', serial: '' };
const validationSchema = Yup.object().shape({
  manufacturer: Yup.string().required('Required'),
  model: Yup.string().required('Required'),
  serial: Yup.string().required('Required'),
});

class FindByManufacturer extends React.Component {
  constructor() {
    super();

    this.state = {
      manufacturers: [],
      models: [],
    };

    this.getManufacturers = this.getManufacturers.bind(this);
    this.getModels = this.getModels.bind(this);
  }

  componentDidMount() {
    this.getManufacturers();
    this.getModels();
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
    const { manufacturers, models } = this.state;
    const { onSubmit } = this.props;

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {
          ({ errors, values, isSubmitting }) => {
            const modelDisabled = values.manufacturer === '';
            const serialNumberDisabled = (values.model === '' || modelDisabled);

            let manufacturerModels = [];
            if (!modelDisabled) {
              manufacturerModels = models.filter(m => m.Manufacturer === values.manufacturer);
              manufacturerModels = manufacturerModels.map(m => m.ModelNo);
            }

            return (
              <Form>
                <div className="form-group">
                  <label htmlFor="manufacturer">Manufacturer</label>
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
                    disabled={modelDisabled}
                  />
                  <ErrorMessage className="form-text text-danger" name="model" component="div" />
                </div>

                <div className="form-group">
                  <label htmlFor="serial">Serial #</label>
                  <Field
                    name="serial"
                    className="form-control"
                    disabled={serialNumberDisabled}
                  />
                  <ErrorMessage className="form-text text-danger" name="serial" component="div" />
                </div>

                <div className="text-center">
                  <div className="form-text text-danger mb-20">{ errors.manufacturersError }</div>
                  <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                    Search
                  </button>
                </div>
              </Form>
            );
          }
        }
      </Formik>
    );
  }
}

FindByManufacturer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default FindByManufacturer;
