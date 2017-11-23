import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, InputGroup, Button, Image} from 'react-bootstrap';

class ArtistsSearch extends Component {

  handleSubmit(event) {
    event.preventDefault();
    const name = this.name.value.trim();
    const { onResult } = this.props;
    Meteor.call('artistSearch', name, (error, artist) => {
      onResult(error, artist);
      this.form.reset();
    });
  }

  render() {
    return (
      <div className="Artist-Form">
        <form ref={form => (this.form = form)} onSubmit={this.handleSubmit.bind(this)}>
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
      </div>
    );
  }
}

ArtistsSearch.propTypes = {
  onResult: PropTypes.func.isRequired
};

export default ArtistsSearch;
