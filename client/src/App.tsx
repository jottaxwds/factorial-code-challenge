import styled from "styled-components";
import Dialog from "./components/Dialog/Dialog";
import theme from "./theme";

const Content = styled.p`
  color: ${theme.palette.light};
  ${theme.typography.text};
`;

function App() {
  return (
    <div className="App">
      <Dialog onClose={() => {}}>
        <Content>Hey!</Content>
      </Dialog>
    </div>
  );
}

export default App;
