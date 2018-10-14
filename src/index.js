import React from 'react'
import ReactDOM from 'react-dom'

import style, { ThemeProvider } from 'styled-components'

import './styles/global-styles'
import theme from './styles/theme'

import Login from './sections/Login'
import RoomList from './sections/RoomList'

const socket = new window.WebSocket(`ws://${window.location.hostname}:443`)

const RootStyle = style.div`
  height: 100%;
  width: 100%;

  &,
  &::before,
  &::after {
    color: ${props => props.theme.main_1}
  }
`

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      theme: 'light',
      section: 'roomlist'
    }
  }

  onThemeChange () {
    (this.state.theme === 'light') ? this.setState({ theme: 'dark' }) : this.setState({ theme: 'light' })
  }

  render () {
    return (
      <ThemeProvider
        theme={theme[this.state.theme]} >
        <RootStyle>
          <Login
            currentSection={this.state.section}
            themeChange={e => this.onThemeChange()} />
          <RoomList
            currentSection={this.state.section} />
        </RootStyle>
      </ThemeProvider>
    )
  }
}
socket.onopen = () => {
  // add socket commands
  require('./utils/websocket/socketSetup')(socket)

  // on close event
  socket.onclose = () => {
    Error('connection_lost')
  }

  // when server sends language data
  socket.receive('setup_languageSet', data => {
    console.log(data)
    ReactDOM.render(<App />, document.getElementById('container'))
  })
}
