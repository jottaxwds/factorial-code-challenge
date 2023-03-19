import styled from "styled-components";
import theme from "../../theme";

import DateTimeComponent from "react-datetime";
import "react-datetime/css/react-datetime.css";

export const DateField = styled(DateTimeComponent)<{
  inputProps: React.HTMLProps<HTMLInputElement> & { "data-testid"?: string };
}>`
  &&& input {
    padding: ${theme.spacing.xxSmall};
    background: none;
    border: none;
    border-bottom: 1px solid ${theme.palette.subdued};
    color: ${theme.palette.light};
    width: 100%;
    cursor: pointer;

    &:focus {
      outline: none;
      border-bottom: 1px solid ${theme.palette.blue};
    }

    &&&:-webkit-autofill,
    &&&:-webkit-autofill:focus {
      transition: background-color 600000s 0s, color 600000s 0s;
    }
  }
`;
