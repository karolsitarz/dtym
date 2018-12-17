import React from 'react';

import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Section from '../components/Section';
import ImageSelector from '../components/login/ImageSelector';

module.exports = socket =>
  class Login extends React.Component {
    componentWillMount () {
      this.loginPrompt = () => {
        socket.comm('login_prompt', {
          name: this.nameInput ? this.nameInput.value : '',
          avatar: window.localStorage['dtym_avatar']
        });
      };

      socket.receive('login_success', data => {
        window.localStorage['dtym_name'] = data.name;
        window.localStorage['dtym_avatar'] = data.avatar;
        window.localStorage['dtym_sessionKey'] = data.sessionKey;
        this.props.goToSection('RoomList');
        // refresh roomList
        socket.comm('roomList_refresh');
      });
    }
    render () {
      if (this.props.currentSection === 'Login') {
        return (
          <Section>
            <h1>Hi, there.</h1>
            <h4>What's your name?</h4>
            <ImageSelector
              initial={window.localStorage['dtym_avatar']}
              success={url => (window.localStorage['dtym_avatar'] = url)} />
            <TextInput
              sendValue={e => (this.nameInput = e)}
              placeholder='gowno xD' />
            <Button
              onClick={e => this.loginPrompt()}
              primary >
              that's me!
            </Button>
            <Button
              onClick={e => this.props.themeChange(e)} >
              all done
            </Button>
          </Section>
        );
      } else {
        return null;
      }
    }
  };
