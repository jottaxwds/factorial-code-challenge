import styled from "styled-components";
import theme from "../../theme";

export const Input = styled.input`
  padding: ${theme.spacing.xxSmall};
  background: none;
  border: none;
  border-bottom: 1px solid ${theme.palette.subdued};
  color: ${theme.palette.light};
  width: 100%;
  &:focus {
    outline: none;
    border-bottom: 1px solid ${theme.palette.blue};
  }
  &&&:-webkit-autofill,
  &&&:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }
`;
