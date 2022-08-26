const mockAxios = (data) => {
  return {
    get: (params, query) => {
      // Mock unknown or empty city
      const values = query.params.q.split(',');
      if (values[0] === 'unknown' || values[0] === '') {
        return Promise.reject({
          message: 'Request failed with status code 404',
          name: 'AxiosError',
          code: 'ERR_BAD_REQUEST',
          status: 400,
        });
      }

      // Mock city found
      return Promise.resolve({
        data,
      });
    },
  };
};

const mockAxiosIntance = (data) => ({
  create: () => mockAxios(data),
});

module.exports = {
  mockAxiosIntance,
  mockAxios,
};
