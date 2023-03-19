import styled from "styled-components";
import theme from "./theme";

export const AppWrapper = styled.div`
  max-width: 768px;
  margin: auto;
  margin-top: ${theme.spacing.xxxLarge};
`;

export const Title = styled.h1`
  ${theme.typography.mainTitle};
  color: ${theme.palette.light};
`;

export const Actions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.medium};
`;

export const Averages = styled.div`
  margin-bottom: ${theme.spacing.xxLarge};
`;
