import React from 'react';

import styled from 'styled-components';

import FancySpan from './FancySpan';

const StyledToggle = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0.5em 0;
`;

export default function InputLabel (props) {
  return (
    <StyledToggle>
      <FancySpan>
        {props.label}
      </FancySpan>
      {props.children}
    </StyledToggle>
  );
}
