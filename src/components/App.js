import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost } from '../actions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Categories from './Categories'



class App extends Component {

  render() {

    const { addPost } = this.props

    return (
      <div id="App">
        <MuiThemeProvider>
          <Categories />
        </MuiThemeProvider>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    posts: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPost: (data) => dispatch(addPost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);