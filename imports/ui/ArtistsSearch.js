import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
          <div className="row uniform">
            <div className="9u 12u$(small)">
              <input type="text" placeholder="Artist name"
                     name="name" ref={name => (this.name = name)} required/>
            </div>
            <div className="3u$ 12u$(small)">
              <input type="submit" value="Search" className="fit" />
            </div>
          </div>
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

