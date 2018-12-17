import React from 'react';

import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Section from '../components/Section';
import ImageSelector from '../components/login/ImageSelector';

module.exports = socket =>
  class Login extends React.Component {
    constructor (props) {
      super(props);

      this.$avatar = window.localStorage['dtym_avatar'] || '';
    }
    componentWillMount () {
      this.loginPrompt = () => {
        console.log(this.$nameInput.value, this.$avatar);
        socket.comm('login_prompt', {
          name: this.$nameInput ? this.$nameInput.value : '',
          avatar: this.$avatar
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
      return (
        <Section>
          <h1>Hi, there.</h1>
          <h4>What's your name?</h4>
          <ImageSelector
            initial={window.localStorage['dtym_avatar']}
            success={url => (this.$avatar = url)} />
          <TextInput
            $sendValue={e => (this.$nameInput = e)}
            initial={window.localStorage['dtym_name']}
            placeholder='your name' />
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
    }
  };
