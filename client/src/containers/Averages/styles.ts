import styled from "styled-components";
import theme from "../../theme";

export const AveragesWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  aling-items: center;
  > div:not(:last-child) {
    margin-right: ${theme.spacing.medium};
  }
  > div {
    max-height: 150px;
  }
  &:after {
    content: "";
    height: 1px;
    background: ${theme.palette.blue};
    width: 100%;
    position: absolute;
    bottom: -${theme.spacing.medium};
  }
  margin-bottom: ${theme.spacing.xxxxLarge};
  margin-top: ${theme.spacing.large};
`;
