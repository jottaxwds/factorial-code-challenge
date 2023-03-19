import styled from "styled-components";
import theme from "../../theme";

export enum MaxWidth {
  s = "15%",
  m = "30%",
  l = "50%",
  xl = "70%",
  xxl = "100%",
}

const FormGroup = styled.div<{ maxWidth?: MaxWidth }>`
  display: flex;
  flex-direction: column;
  width: ${({ maxWidth }) => maxWidth ?? "100%"};
  &:not(:last-child) {
    margin-bottom: ${theme.spacing.large};
  }
`;

export default FormGroup;
