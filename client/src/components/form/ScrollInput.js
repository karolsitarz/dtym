import React from 'react';

import styled from 'styled-components';

import { Infinite } from '../../util/Icons';
import InputLabel from './InputLabel';

import { Swiper } from 'swiper/dist/js/swiper.esm.js';

const ScrollCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .6em 1em;
  height: inherit;
  font-size: .85em;
  color: ${props => !isNaN(props.$value) ? props.theme.main_5 : props.theme.white};
  fill: ${props => !isNaN(props.$value) ? props.theme.main_5 : props.theme.white};
  background: ${props => !isNaN(props.$value) ? 'transparent' : props.theme.mainGradient};

  svg {
    height: 100%;
  }
`;

const Scroll = styled.div`
  height: 2em;
  min-width: 4rem;
  overflow: hidden;
  border-radius: 1em;
  font-weight: 700;
  touch-action: manipulation;
  background: ${props => props.theme.bg_2};
  list-style-type: none;
  display: inline-block;
`;

const ScrollContainer = styled.div`
  height: 2em;
  min-width: 4rem;
  transition: ${props => props.theme.transition({ t: ['transform'] })};
  transform: translateZ(0);
  z-index: 1;

  ::before{
    background: ${props => props.theme.mainGradient};
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    display: block;
    left: -1px;
    top: -1px;
    position: absolute;
    content: "";
    border-radius: 1000px;
    transition: ${props => props.theme.transition({ t: ['transform'] })};
    transform: scale(1) translateZ(0);
    opacity: .4;
  }
`;
export default class ScrollInput extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      slides: ((() => {
        const generateJSX = c =>
          (<ScrollCell
            className='swiper-slide'
            key={c}
            $value={c}>
            {!isNaN(c) ? c : (c === 'random' ? '?' : <Infinite />)}
          </ScrollCell>);
        const slides = [];
        const { infinity, max, min, random } = this.props;

        if (infinity) slides.push(generateJSX('infinity'));
        else if (random) slides.push(generateJSX('random'));

        if (!isNaN(min) && !isNaN(max)) {
          for (let i = min; i <= max; i++) {
            slides.push(generateJSX(i));
          }
        }
        return slides;
      })())
    };
  }
  componentDidMount () {
    this.SCROLL = new Swiper(this.DOMnode, {
      direction: 'vertical',
      freeMode: true,
      freeModeSticky: true,
      freeModeMomentumRatio: 0.75,
      freeModeMomentumVelocityRatio: 0.75,
      grabCursor: true,
      initialSlide: (isNaN(this.props.default) || this.props.default * 1 !== -1) ? this.state.slides.findIndex(c => c.props.$value === this.props.default) : 0,
      on: {
        touchStart: e => (this.SCROLL.isStopped = false),
        touchEnd: e => (this.SCROLL.isStopped = true),
        transitionEnd: e => {
          if (!!this.SCROLL && this.SCROLL.isStopped) {
            setNewValue();
          }
        },
        tap: e => {
          if (!!this.SCROLL && this.SCROLL.isStopped) {
            this.SCROLL.slideNext();
          }
        }
      }
    });
    this.SCROLL.isStopped = true;

    const setNewValue = () => {
      const { activeIndex, previousScrollIndex } = this.SCROLL;
      // if the indexes are different
      if (previousScrollIndex !== activeIndex) {
        this.SCROLL.previousScrollIndex = activeIndex;
        if (this.props.$sendValue) this.props.$sendValue(this.state.slides[activeIndex].props.$value);
      }
    };
    setNewValue();
  }
  render () {
    if (this.props.label) {
      return (
        <InputLabel label={this.props.label}>
          <ScrollContainer>
            <Scroll ref={node => (this.DOMnode = node)}>
              <div className='swiper-wrapper'>
                {this.state.slides}
              </div>
            </Scroll>
          </ScrollContainer>
        </InputLabel>
      );
    } else {
      return (
        <ScrollContainer>
          <Scroll ref={node => (this.DOMnode = node)}>
            {this.state.slides}
          </Scroll>
        </ScrollContainer>
      );
    }
  }
}
