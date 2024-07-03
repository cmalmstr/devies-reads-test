import {useState, useEffect} from 'react';

import Card from '@mui/material/Card';
import Modal from "@mui/material/Modal";
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from './parts/table-no-data';
import BookTableRow from './parts/book-table-row';
import BookTableHead from './parts/book-table-head';
import TableEmptyRows from './parts/table-empty-rows';
import BookTableToolbar from './parts/book-table-toolbar';
import { emptyRows, applyFilter, getComparator } from './parts/utils';

const apiUrl = 'https://devies-reads-be.onrender.com/books';

// ----------------------------------------------------------------------

export default function BookList (){
  const [data, setData] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [openBook, setOpenBook] = useState(false);

  const [selected, setSelected] = useState(false);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(apiUrl)
          .catch((err) => {
        console.log(err.message);
      });
      const newData = await response.json();
      setData(newData);
    };
   fetchData();
  }, []);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleOpen = (bookObject) => {
    setSelected(bookObject);
    setOpenBook(true);
  };

  const handleClose = () => setOpenBook(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: data,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;
  return (
    <Container>
      <Modal
          open={openBook}
          onClick={handleClose}
      >
        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          <Card sx={{p: 5, width: 1, maxWidth: 550}}>
            <Stack direction="row" spacing={2}>
              <img src={selected.coverUrl} alt={`Cover of ${selected.name}`} />
              <Stack spacing={1}>
                <Typography variant="h6">{selected.name}</Typography>
                <Typography>{`Genre: ${selected.genre}`}</Typography>
                <Typography>{selected.description}</Typography>
                <Typography>{`Average rating: ${selected.averageRating}`}</Typography>
                <Typography>{`Number of reads: ${selected.haveRead}`}</Typography>
                <Typography>{`People currently reading it: ${selected.currentlyReading}`}</Typography>
                <Typography>{`People wanting to read it: ${selected.wantToRead}`}</Typography>
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </Modal>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Books</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          Add book
        </Button>
      </Stack>

      <Card>
        <BookTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <BookTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'name', label: 'Title' },
                  { id: 'genre', label: 'Genre' },
                  { id: 'averageRating', label: 'Avg. rating' },
                  { id: 'haveRead', label: 'Reads' },
                  { id: 'currentlyReading', label: 'Reading now' },
                  { id: 'wantToRead', label: 'Want to read' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <BookTableRow
                      key={row.id}
                      name={row.name}
                      genre={row.genre}
                      averageRating={row.averageRating}
                      haveRead={row.haveRead}
                      currentlyReading={row.currentlyReading}
                      wantToRead={row.wantToRead}
                      handleClick={() => handleOpen(row)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, data.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
