module.exports = (query) => {
  // eslint-disable-next-line object-curly-newline
  let { limit, page, column, order, search } = query;

  if (!limit || limit === 'undefined' || limit < 1) {
    limit = 50;
  }
  if (!page || page === 'undefined' || page < 1) {
    page = 1;
  }
  if (!column || column === 'undefined' || typeof column !== 'string') {
    column = 'id';
  }
  if (
    !order ||
    order === 'undefined' ||
    typeof order !== 'string' ||
    order !== 'asc'
  ) {
    order = 'desc';
  }
  if (!search || search === 'undefined') {
    search = '';
  }
  // eslint-disable-next-line object-curly-newline
  return { ...query, limit, page, column, order, search };
};
