import { Chrono as ChronoComponent } from "react-chrono";
import styled from "styled-components";
import theme from "../../theme";

export const Chrono = styled(ChronoComponent)``;
export const Total = styled.p`
  ${theme.typography.text};
  color: ${theme.palette.subdued};
  margin-bottom: ${theme.spacing.xxLarge};
  margin-top: 0;
`;
export const ChronoWrapper = styled.div`
    &&& {
        // Pagination Controls
        .inHYIi {
            background: ${theme.palette.darkBlue};
            &:hover {
                background: ${theme.palette.orange};
                color: ${theme.palette.darkBlue};
            }
        }
        .fsWZbl {
            background: ${theme.palette.midBlue};
        }
        .gnfenX {
            ${theme.typography.text};
            font-size: ${theme.typography.fontSize.xxSmall};
            color: ${theme.palette.subdued};
        }

        .gnfenX.active {
            background: ${theme.palette.midBlue};
            color: ${theme.palette.light};
            padding: ${theme.spacing.xSmall};
            ${theme.typography.text};
            font-size: ${theme.typography.fontSize.xxSmall}
        }

        // Timeline dots
        .igUvje {
            background: ${theme.palette.light};

            &:after {
                background: ${theme.palette.white};
            }

            &.active:after {
                background: ${theme.palette.green};
            }
        }

        .fMxotn {
            background: ${theme.palette.light};
            height: 1px;
        }

        // Card
        .bZaoTA.horizontal {
            min-width: 100%;
        }

        .hvCzsb {
            background: ${theme.palette.white};
            width: 100%:
            height: 100px;
            min-height: 100px;
            padding-left: ${theme.spacing.small};
        }

        // Card text
        .cCwaHK, .ihTjxo {
            color: ${theme.palette.darkBlue};
        }
    }
`;

export const Title = styled.h3`
  ${theme.typography.mainSubtitle};
  color: ${theme.palette.light};
  margin-bottom: ${theme.spacing.small};
`;
