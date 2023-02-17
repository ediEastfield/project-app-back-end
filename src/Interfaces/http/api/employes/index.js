const EmployesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'employes',
  register: async (server, { container }) => {
    const employesHandler = new EmployesHandler(container);
    server.route(routes(employesHandler));
  },
};
