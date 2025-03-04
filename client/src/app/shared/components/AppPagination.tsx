import { Box, Pagination, Typography } from "@mui/material";
import { IPagination } from "../../models/pagination";

type Props = {
  metadata: IPagination;
  onPageChange: (page: number) => void;
};

const AppPagination = ({ metadata, onPageChange }: Props) => {
  const { currentPage, totalCount, totalPages, pageSize } = metadata;

  const startItem = (currentPage - 1) * pageSize + 1;
  
  const endItem = Math.min(currentPage * pageSize, totalCount);
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      marginTop={3}
    >
      <Typography>Display {startItem} - {endItem} of {totalCount}</Typography>
      <Pagination
        color="secondary"
        size="large"
        count={totalPages}
        page={currentPage}
        onChange={(_,page) => onPageChange(page)}
      />
    </Box>
  );
};
export default AppPagination;
