import React from 'react';

import styled from 'styled-components';

import { Infinite } from '../../util/Icons';
import InputLabel from './InputLabel';

import { Swiper, Virtual } from 'swiper/dist/js/swiper.esm.js';
Swiper.use([Virtual]);

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
// TODO get value based on index, dynamic delete unused cells
export default class ScrollInput extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      slides: []
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
      on: {
        touchStart: e => (this.SCROLL.isStopped = false),
        touchEnd: e => (this.SCROLL.isStopped = true),
        transitionEnd: e => {
          if (this.SCROLL.isStopped) {
            // set value
            setNewValue();
          }
        },
        tap: e => {
          if (this.SCROLL.isStopped) {
            console.log('tap');
            this.SCROLL.slideNext();
          }
        }
      },
      virtual: {
        slides: ((() => {
          const slides = [];
          const { infinity, max, min, random } = this.props;

          if (infinity) slides.push('infinity');
          else if (random) slides.push('random');

          if (!isNaN(min) && !isNaN(max)) {
            for (let i = min; i <= max; i++) {
              slides.push(i);
            }
          }
          return slides;
        })()),
        renderExternal: ({ slides, offset }) => {
          this.setState({
            slides:
            slides.map(c => (
              <ScrollCell
                className='swiper-slide'
                style={{ top: `${offset}px` }}
                key={c}
                $value={c}>
                {!isNaN(c) ? c : (c === 'random' ? '?' : <Infinite />)}
              </ScrollCell>
            ))
          });
        }
      }
    });
    this.SCROLL.isStopped = true;

    const setNewValue = () => {
      const { virtual, activeIndex, previousScrollIndex } = this.SCROLL;

      // if the indexes are different
      if (previousScrollIndex !== activeIndex) {
        this.SCROLL.previousScrollIndex = activeIndex;
        if (this.props.$sendValue) this.props.$sendValue(virtual.slides[activeIndex]);
      }
    };

    //   const setNewValue = () => {
    //     // save current segment to a variable
    //     const currentSegment = this._scroll.currentSegment.y;
    //     const cellElements = this.cellElements;

    //     // get current segment, then access it and get its $value prop
    //     this._scroll.value = cellElements[currentSegment].props.$value;

    //     // pass the value down to prop
    //     if (this.props.$sendValue) this.props.$sendValue(this._scroll.value);
    //   };

    //   if (this.props.default) {
    //     let scrollPos = 0;
    //     if (!isNaN(this.props.default)) {
    //       if (this.props.random || this.props.infinity) scrollPos = 1 * this.props.default + 1;
    //       else scrollPos = this.props.default;
    //     }
    //     this._scroll.scrollTo(0, scrollPos * this.DOMnode.offsetHeight, 0);
    //   }

    //   // set initial value
    //   setNewValue();

    //   // update value on segment change
    //   this._scroll.addEventListener('segmentdidchange', () => {
    //     setNewValue();
    //   }, { passive: true });
    // }

    window.s = this.DOMnode.swiper;
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
