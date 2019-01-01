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
  height: 40px;
  font-size: .85em;
  color: ${props => !isNaN(props.$value) ? props.theme.main_5 : props.theme.white};
  fill: ${props => !isNaN(props.$value) ? props.theme.main_5 : props.theme.white};
  background: ${props => !isNaN(props.$value) ? 'transparent' : props.theme.mainGradient};

  svg {
    height: 100%;
  }
`;

const Scroll = styled.div`
  height: 40px;
  min-width: 4rem;
  overflow: hidden;
  border-radius: 1em;
  cursor: n-resize;
  font-weight: 700;
  touch-action: manipulation;
  background: ${props => props.theme.bg_2};
  list-style-type: none;
  display: inline-block;
`;

const ScrollContainer = styled.div`
  height: 40px;
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
    // add infinity or random if needed
    // if (props.infinity) {
    //   this.cellElements.push(
    //     <ScrollCell
    //       className='swiper-slide'
    //       key='infinity'
    //       $value='infinity'>
    //       <Infinite />
    //     </ScrollCell>
    //   );
    // } else if (props.random) {
    //   this.cellElements.push(
    //     <ScrollCell
    //       className='swiper-slide'
    //       key='random'
    //       $value='random'>
    //       ?
    //     </ScrollCell>
    //   );
    // }
    // // jesli min i max sa liczbami
    // if (!isNaN(props.min) && !isNaN(props.max)) {
    //   for (let i = props.min; i <= props.max; i++) {
    //     this.cellElements.push(
    //       <ScrollCell
    //         className='swiper-slide'
    //         key={i}
    //         $value={i}>
    //         {i}
    //       </ScrollCell>
    //     );
    //   }
    // }
  }
  componentDidMount () {
    this.SCROLL = new Swiper(this.DOMnode, {
      direction: 'vertical',
      freeMode: true,
      freeModeSticky: true,
      freeModeMomentumRatio: 0.75,
      freeModeMomentumVelocityRatio: 0.75,
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
