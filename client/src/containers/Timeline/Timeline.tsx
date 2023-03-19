import React from "react";
import { TimelineItemModel } from "react-chrono/dist/models/TimelineItemModel";
import * as S from "./styles";

interface ChronoProps {
  items: TimelineItemModel[];
  onPaginate: (page: number) => void;
  total: number;
}

const Timeline = ({ items, onPaginate, total }: ChronoProps) => {
  const [page, setPage] = React.useState(0);

  return (
    <S.ChronoWrapper>
      <S.Title>Timeline:</S.Title>
      <S.Total>
        Showing {items.length} / {total} metrics
      </S.Total>
      <S.Chrono
        items={items}
        allowDynamicUpdate
        mode={"HORIZONTAL"}
        scrollable={{ scrollbar: true }}
        onScrollEnd={() => {
          onPaginate(page + 1);
          setPage(page + 1);
        }}
      />
    </S.ChronoWrapper>
  );
};

export default Timeline;
