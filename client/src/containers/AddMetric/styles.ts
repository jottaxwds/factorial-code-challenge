import styled from "styled-components";
import theme from "../../theme";

export const Title = styled.h3`
  ${theme.typography.mainSubtitle};
  color: ${theme.palette.light};
  margin: 0 0 ${theme.spacing.xLarge} 0;
  padding: 0;
`;

export const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: ${theme.spacing.medium};
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: ${theme.spacing.medium};
`;
