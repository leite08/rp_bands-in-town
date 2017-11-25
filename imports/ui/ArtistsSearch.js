import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, InputGroup, Button, Image} from 'react-bootstrap';
import { ReactiveVar } from 'meteor/reactive-var';
import { withTracker } from 'meteor/react-meteor-data';

const loading = new ReactiveVar(false);

class ArtistsSearch extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    const name = this.name.value.trim();
    const { onInitSearch, onResult } = this.props;
    let { showLoading } = this.props;
    if (typeof showLoading === "undefined") {
      showLoading = true;
    }
    if (showLoading) {
      this.loading(true);
    }
    onInitSearch(name);
    Meteor.call('artistSearch', name, (error, artist) => {
      if (showLoading) {
        this.loading(false);
      }
      onResult(error, artist);
      this.form.reset();
    });
  };

  loading = (show) => { loading.set(show); };

  render() {
    const { loading } = this.props;
    return (
      <div className="Artist-Form">
        <form ref={form => (this.form = form)} onSubmit={this.handleSubmit}>
          <FormGroup>
            <InputGroup>
              <input type="text" className="form-control" placeholder="Artist name"
                     name="name" ref={name => (this.name = name)} required/>
              <InputGroup.Button>
                <Button type="submit" bsStyle="success">Go</Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </form>
        {loading &&
          <span>Loading...</span>
        }
      </div>
    );
  }
}

ArtistsSearch.propTypes = {
  onResult: PropTypes.func.isRequired,
  onInitSearch: PropTypes.func,
  showLoading: PropTypes.bool
};

export default withTracker(() => {
  return {
    loading: loading.get()
  };
})(ArtistsSearch);

