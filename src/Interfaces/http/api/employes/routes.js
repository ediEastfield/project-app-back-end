const routes = (handler) => ([
  {
    method: 'POST',
    path: '/employes',
    handler: handler.postEmployeHandler,
  },
  {
    method: 'GET',
    path: '/employes/{employeId}',
    handler: handler.getEmployeByIdHandler,
  },
  {
    method: 'GET',
    path: '/employes',
    handler: handler.getAllEmployeHandler,
  },
]);

module.exports = routes;
