const AddEmployeUseCase = require('../../../../Applications/use_case/AddEmployeUseCase');
const GetEmployeByIdUseCase = require('../../../../Applications/use_case/GetEmployeByIdUseCase');
const GetAllEmployeUseCase = require('../../../../Applications/use_case/GetAllEmployeUseCase');

class EmployesHandler {
  constructor(container) {
    this._container = container;

    this.postEmployeHandler = this.postEmployeHandler.bind(this);
    this.getEmployeByIdHandler = this.getEmployeByIdHandler.bind(this);
    this.getAllEmployeHandler = this.getAllEmployeHandler.bind(this);
  }

  async postEmployeHandler(request, h) {
    const headerAuthorization = request.headers.authorization;
    const addEmployeUseCase = this._container.getInstance(AddEmployeUseCase.name);
    const addedEmploye = await addEmployeUseCase.execute(request.payload, headerAuthorization);

    const response = h.response({
      status: 'success',
      data: {
        addedEmploye,
      },
    });
    response.code(201);
    return response;
  }

  async getEmployeByIdHandler(request, h) {
    const getEmployeByIdUseCase = this._container.getInstance(GetEmployeByIdUseCase.name);
    const detailEmploye = await getEmployeByIdUseCase.execute(request.params);

    const response = h.response({
      status: 'success',
      data: {
        employe: detailEmploye,
      },
    });

    return response;
  }

  async getAllEmployeHandler() {
    const getAllEmployeUseCase = this._container.getInstance(GetAllEmployeUseCase.name);
    const employes = await getAllEmployeUseCase.execute();

    return {
      status: 'success',
      data: {
        employes,
      },
    };
  }
}

module.exports = EmployesHandler;
