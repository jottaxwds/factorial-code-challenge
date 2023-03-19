import { snakeCase } from "lodash";

import * as S from "./styles";
import { Alignment } from "./types";

type ListItemProps = {
  cells: {
    colName: string;
    value: string | number;
    textAlign: Alignment;
    isSorting: boolean;
    conditionalColor: (args: any) => string;
  }[];
};

const ListItem = ({ cells }: ListItemProps) => (
  <tr data-testid={"list-item"}>
    {cells.map((cell, index) => {
      const { value, textAlign = "left", isSorting } = cell;
      return (
        <S.Cell
          data-testid={"list-item-cell"}
          key={`${snakeCase(`${value}-${index}`)}`}
          textAlign={textAlign as Alignment}
          isSorting={isSorting}
          color={cell?.conditionalColor(value)}
        >
          {value}
        </S.Cell>
      );
    })}
  </tr>
);

export default ListItem;
