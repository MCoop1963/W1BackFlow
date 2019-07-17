import React, { Component } from 'react';
import { Field, getIn } from 'formik';
import classnames from 'classnames';

export default class TestComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCommentsBox: false,
    };
  }

  handleButtonClick = e => {
    e.preventDefault();

    this.setState(prevState => {
      return { showCommentsBox: !prevState.showCommentsBox };
    });
  };

  render() {
    const showBox = classnames(
      !this.state.showCommentsBox && 'd-none',
      this.state.showCommentsBox && 'd-block'
    );

    return (
      <div>
        <button className="btn btn-primary" onClick={this.handleButtonClick}>
          {this.props.buttonText}
        </button>
        <div className={showBox}>
          <Field name="TestComments" component="textarea" />
        </div>
      </div>
    );
  }
}
