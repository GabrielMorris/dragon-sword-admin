// React
import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      // If we're not authenticated send the user to /login
      if (!this.props.authenticated) {
        this.props.history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      // If we fail to authenticate send the user to /login
      if (!nextProps.authenticated) {
        this.props.history.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      authenticated: state.auth.isAuthenticated,
      timestamp: new Date().toString()
    };
  }

  return connect(mapStateToProps)(Authentication);
}
