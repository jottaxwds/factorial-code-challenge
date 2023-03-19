import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";
import theme from "../../theme";

export const AverageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.small};
  padding-bottom: ${theme.spacing.smallMedium};
  border-radius: 8px;
  background: ${theme.palette.midBlue};
`;

export const Title = styled.h4`
  ${theme.typography.cta};
  color: ${theme.palette.subdued};
  margin: 0 0 ${theme.spacing.medium};
`;

export const Progress = styled(CircularProgressbar)<{ value: number }>`
  &&& {
    .CircularProgressbar {
      width: 30%;
    }
    .CircularProgressbar-path {
      stroke: ${({ value }) => {
        if (value < 30) {
          return theme.palette.green;
        }
        if (value > 30 && value < 70) {
          return theme.palette.orange;
        }
        return theme.palette.red;
      }};
    }
  }
`;
