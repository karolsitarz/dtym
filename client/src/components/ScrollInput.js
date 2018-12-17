import React from 'react';

import styled from 'styled-components';

import { FTScroller as Scroller } from 'ftscroller';

import { Infinite } from './Icons';
import InputLabel from './InputLabel';

const ScrollCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .6em 1em;
  height: 32px;
  font-size: .85em;
  color: ${props => !isNaN(props.$value) ? props.theme.main_5 : props.theme.white};
  fill: ${props => !isNaN(props.$value) ? props.theme.main_5 : props.theme.white};
  background: ${props => !isNaN(props.$value) ? 'transparent' : props.theme.mainGradient};

  svg {
    height: 100%;
  }
`;

const Scroll = styled.div`
  height: 32px;
  min-width: 3.5em;
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
  height: 32px;
  min-width: 3.5em;
  transition: transform .3s ease;
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
    transition: transform .3s ease;
    transform: scale(1) translateZ(0);
    opacity: .4;
  }
`;
// TODO get value based on index, dynamic delete unused cells
export default class ScrollInput extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }
  componentDidMount () {
    this._scroll = new Scroller(this.DOMnode, {
      scrollbars: false,
      scrollingX: false,
      snapping: true,
      snapSizeY: this.DOMnode.offsetHeight,
      contentWidth: this.DOMnode.offsetWidth,
      contentHeight: this.DOMnode.offsetHeight * this.DOMnode.querySelectorAll('li').length,
      disabledInputMethods: {
        scroll: true
      }
    });

    const setNewValue = () => {
      // save current segment to a variable
      const currentSegment = this._scroll.currentSegment.y;
      const cellElements = this.cellElements;

      // get current segment, then access it and get its $value prop
      this._scroll.value = cellElements[currentSegment].props.$value;

      // pass the value down to prop
      if (this.props.$sendValue) this.props.$sendValue(this._scroll.value);
    };
    /*
    const cutOutCurrentValue = () => {
      // save current segment to a variable
      const currentSegment = this._scroll.currentSegment.y
      const cellElements = this.state.cellElements

      setNewValue();

      // get cell elements, then slice them up in two parts
      this._beforeValue = cellElements.slice(0, currentSegment)
      this._afterValue = cellElements.slice(currentSegment + 1, cellElements.length)

      // set the 'transform' property of ftscroller div to 0
      this.DOMnode.querySelector('.ftscroller_y').style.transform = 'translate3d(0,0,0)'

      // update rendered cells to only one, showing value
      this.setState({ renderedCellElements: cellElements[currentSegment] })
    }

    // on start, cut out the value
    cutOutCurrentValue()

    this._scroll.addEventListener('scrollend', () => {
      cutOutCurrentValue()
    }, { passive: true })

    this._scroll.addEventListener('scrollstart', () => {
      // add back the 'transform' property to ftscroller div
      this.DOMnode.querySelector('.ftscroller_y').style.transform = `translate3d(0,${-1 * this._scroll.currentSegment.y * this.DOMnode.offsetHeight}px,0)`
      // join arrays - this._beforeValue, this.state.renderedCellElements, _afterValue
      const renderedCellElements = this._beforeValue.concat(this.state.renderedCellElements, this._afterValue)
      // update
      this.setState({ renderedCellElements })
    }, { passive: true })
    */
    if (this.props.default) {
      let scrollPos = 0;
      if (!isNaN(this.props.default)) {
        if (this.props.random || this.props.infinity) scrollPos = 1 * this.props.default + 1;
        else scrollPos = this.props.default;
      }
      this._scroll.scrollTo(0, scrollPos * this.DOMnode.offsetHeight, 0);
    }

    // set initial value
    setNewValue();

    // update value on segment change
    this._scroll.addEventListener('segmentdidchange', () => {
      setNewValue();
    }, { passive: true });
  }

  componentWillMount () {
    let cellElements = [];
    // add infinity or random if needed
    if (this.props.infinity) {
      cellElements.push(
        <ScrollCell
          key='infinity'
          $value='infinity'>
          <Infinite />
        </ScrollCell>
      );
    } else if (this.props.random) {
      cellElements.push(
        <ScrollCell
          key='random'
          $value='random'>
          ?
        </ScrollCell>
      );
    }
    // jesli min i max sa liczbami
    if (!isNaN(this.props.min) && !isNaN(this.props.max)) {
      for (let i = this.props.min; i <= this.props.max; i++) {
        cellElements.push(<ScrollCell key={i} $value={i}>{i}</ScrollCell>);
      }
    }
    this.cellElements = cellElements;
    this.state.renderedCellElements = cellElements;
  }

  render () {
    if (this.props.label) {
      return (
        <InputLabel label={this.props.label}>
          <ScrollContainer>
            <Scroll ref={node => (this.DOMnode = node)}>
              <div className='ftscroller_container' >
                <div className='ftscroller_y ftscroller_hwaccelerated' >
                  {this.state.renderedCellElements}
                </div>
              </div>
            </Scroll>
          </ScrollContainer>
        </InputLabel>
      );
    } else {
      return (
        <ScrollContainer>
          <Scroll ref={node => (this.DOMnode = node)}>
            <div className='ftscroller_container' >
              <div className='ftscroller_y ftscroller_hwaccelerated' >
                {this.state.renderedCellElements}
              </div>
            </div>
          </Scroll>
        </ScrollContainer>
      );
    }
  }
}
