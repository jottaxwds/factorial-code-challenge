import styled from "styled-components";
import theme from "../../theme";

export const Dialog = styled.div`
  background: ${theme.palette.contentBlue};
  min-width: 200px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 8px;
  position: relative;
  padding: ${theme.spacing.large};
`;
export const DialogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: none;
`;

export const DialogOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const CloseAction = styled.div`
  position: absolute;
  top: ${theme.spacing.xSmall};
  right: ${theme.spacing.xSmall};
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;

export const Close = styled.button`
  width: max-content;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: ${theme.palette.light};
`;
