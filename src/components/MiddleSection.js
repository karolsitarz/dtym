import React from 'react';

import styled from 'styled-components';

const StyledMiddleSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  margin: auto;
  padding-bottom: ${props => props.theme.MiddleSectionBottomPadding ? props.theme.MiddleSectionBottomPadding : '0px'}
`;

export default function Section (props) {
  return (
    <StyledMiddleSection>
      {props.children}
    </StyledMiddleSection>
  );
}
