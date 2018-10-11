import React from 'react'
import ReactDOM from 'react-dom'

import { ThemeProvider } from 'styled-components'

import './styles/global-styles'
import theme from './styles/theme'

import Login from './sections/Login'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      theme: 'light'
    }
  }
  render () {
    return (
      <ThemeProvider
        theme={theme[this.state.theme]} >
        <Login />
      </ThemeProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('container'))
