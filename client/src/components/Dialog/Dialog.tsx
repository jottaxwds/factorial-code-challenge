import * as S from "./styles";

interface DialogProps {
  children: JSX.Element;
  onClose: () => void;
}

const Dialog = ({ children, onClose }: DialogProps) => (
  <S.DialogWrapper data-testid="dialog">
    <S.DialogOverlay />
    <S.Dialog>
      <S.CloseAction>
        <S.Close onClick={onClose}>X</S.Close>
      </S.CloseAction>
      {children}
    </S.Dialog>
  </S.DialogWrapper>
);

export default Dialog;
