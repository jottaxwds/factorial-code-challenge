import styled from "styled-components";
import theme from "../../theme";

export const Button = styled.button<{
  disabled?: boolean;
}>`
  background: ${({ disabled = false }) =>
    disabled ? theme.palette.subdued : theme.palette.green};
  color: ${({ disabled = false }) =>
    disabled ? theme.palette.light : theme.palette.white};
  text-shadow: 1px 1px ${theme.palette.darkBlue};
  padding: ${theme.spacing.small};
  border-radius: 8px;
  font-weight: bold;
  border: none;
  cursor: ${({ disabled = false }) => (disabled ? "default" : "pointer")};
  &:hover {
    ${({ disabled = false }) =>
      disabled
        ? `
            background: ${theme.palette.subdued}; color: ${theme.palette.light};
        `
        : `background: ${theme.palette.darkGreen}; color: ${theme.palette.white};`}
  }
  &:active {
    ${({ disabled = false }) =>
      disabled
        ? `background: ${theme.palette.subdued}; color: ${theme.palette.light};`
        : `background: ${theme.palette.green}; color: ${theme.palette.white};`}
  }
`;
