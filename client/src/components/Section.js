import React from 'react';

import styled, { ThemeProvider } from 'styled-components';

const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 50em;
  margin: auto;
  padding: 1em;
  transition: ${props => props.theme.transition({ t: ['padding'] })};
`;

const padding = {
  MiddleSectionBottomPadding: '3em'
};

export function Section (props) {
  return (
    <ThemeProvider
      theme={Array.isArray(props.children) && props.children.some(e => e.props.$isACard) ? padding : {}}>
      <StyledSection>
        {props.children}
      </StyledSection>
    </ThemeProvider>
  );
}

// Middle Section

const StyledMiddleSection = styled.div`
  width: 100%;
  flex-grow: 1;
  margin: auto;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: ${props => props.theme.MiddleSectionBottomPadding ? props.theme.MiddleSectionBottomPadding : '0px'};
  
  > :first-child {
    margin-top: auto;
  }
  > :last-child {
    margin-bottom: auto;
  }
`;

export function MiddleSection (props) {
  return (
    <StyledMiddleSection>
      {props.children}
    </StyledMiddleSection>
  );
}
