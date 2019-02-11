import React from 'react';
import { connect } from 'react-redux';
import { changeSection, changeTheme } from '../actions';

import Button from '../components/form/Button';
import TextInput from '../components/form/TextInput';
import { Section } from '../components/Section';
import ImageSelector from '../components/login/ImageSelector';

import randomPerson from '../util/randomPerson';

class Login extends React.Component {
  constructor (props) {
    super(props);
    const { socket, changeSection } = this.props;

    this.avatar = window.localStorage.dtym_avatar || '';
    this.loginPrompt = () => {
      socket.comm('login_prompt', {
        name: this.nameInput || '',
        avatar: this.avatar
      });
    };
    socket.receive('login_success', data => {
      socket.ID = data.ID;
      window.localStorage.dtym_name = data.name;
      window.localStorage.dtym_avatar = data.avatar;
      window.localStorage.dtym_sessionKey = data.sessionKey;
      changeSection('RoomList');
    });

    this.getRandom = async () => {
      const { name, avatar } = await randomPerson();
      this.nameInputControl.setState({ value: name.slice(0, 20) });
      this.imageSelector.setState({ image: avatar });
      this.avatar = avatar;
    };
  }
  render () {
    return (
      <Section>
        <h1>Hi, there.</h1>
        <h4>What's your name?</h4>
        <ImageSelector
          ref={e => (this.imageSelector = e)}
          initial={window.localStorage.dtym_avatar}
          success={url => (this.avatar = url)} />
        <TextInput
          ref={e => (this.nameInputControl = e)}
          sendValue={e => (this.nameInput = e)}
          initial={window.localStorage.dtym_name}
          placeholder='your name' />
        <Button
          onClick={e => this.loginPrompt()}
          primary >
          that's me!
        </Button>
        <Button
          onClick={e => this.props.changeTheme()} >
          all done
        </Button>
        {window.localStorage.dtym_debug !== 'true' ? null
          : (<Button
            onClick={e => this.getRandom()} >
            get random
          </Button>)}
      </Section>
    );
  }
}

const mapStateToProps = state => ({ socket: state.socket });

export default connect(mapStateToProps, { changeSection, changeTheme })(Login);
