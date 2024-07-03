import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export default function BookTableRow({
                                       name,
                                       genre,
                                       averageRating,
                                       haveRead,
                                       currentlyReading,
                                       wantToRead,
                                       handleClick
}) {

  return (
      <TableRow hover tabIndex={-1} role="checkbox" onClick={handleClick}>
        <TableCell>{name}</TableCell>
        <TableCell>{genre}</TableCell>
        <TableCell>{averageRating.toFixed(2)}</TableCell>
        <TableCell>{haveRead}</TableCell>
        <TableCell>{currentlyReading}</TableCell>
        <TableCell>{wantToRead}</TableCell>

      </TableRow>
  );
}

BookTableRow.propTypes = {
  name: PropTypes.any,
  genre: PropTypes.any,
  averageRating: PropTypes.any,
  haveRead: PropTypes.any,
  currentlyReading: PropTypes.any,
  wantToRead: PropTypes.any,
  handleClick: PropTypes.func
};
