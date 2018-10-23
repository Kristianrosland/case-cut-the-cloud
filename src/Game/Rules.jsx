import React from 'react';
import styled from 'styled-components';
import SvgIcon from '../helpers/SvgIcon';
import { colors } from '../helpers/constants';

const StyledIcon = styled(SvgIcon)`
    width: 1.5rem;
    height: 1.5rem;
    color: ${props => props.color};
`;

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 0.5rem;
`;

const StyledLabel = styled.label`
    font-size: 1.5rem;
    margin: 0 1rem;
`;

const Rules = () => (
  <React.Fragment>
    <FlexRow>
      <StyledLabel> Your goal is get from </StyledLabel>
      <StyledIcon name="START" />
      <StyledLabel> to </StyledLabel>
      <StyledIcon name="GOAL" color={colors.primaryGold} />
    </FlexRow>
    <FlexRow>
      <StyledLabel> Hit a </StyledLabel>
      <StyledIcon name="UP" color={colors.primary} />
      <StyledLabel> to upload yourself to the cloud!</StyledLabel>
    </FlexRow>
    <FlexRow>
      <StyledLabel> Download yourself from the corresponding </StyledLabel>
      <StyledIcon name="DOWN" color={colors.primary} />
    </FlexRow>
  </React.Fragment>
);

export default Rules;
