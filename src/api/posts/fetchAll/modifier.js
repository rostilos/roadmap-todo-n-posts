export default function fetchAllPostsrModifier(response) {
  const { pagination, data } = response;
  const { page, total, limit } = pagination;
  const nextPage = page < total ? parseInt(page) + 1 : null;
  const prevPage = page === 1 ? null : parseInt(page) - 1;

  return {
    data,
    pagination: {
      ...pagination,
      limit: parseInt(limit),
      page: parseInt(page),
      nextPage,
      prevPage,
    },
  };
}
