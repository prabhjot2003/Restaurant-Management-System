
import employessRoutess from '../services/employeeService';
// import  {updateEmployee} from '../store/employeeStore';

const employessRoute = (app: any) => {
    //route to create a section
    app.post('/createEmployee', employessRoutess.employeedata);
    app.post('/loginEmployee', employessRoutess.loginEmployee);
    app.get('/getEmployees/:id', employessRoutess.getAllEmployee);
    app.put('/updatedetalis/:id', employessRoutess.getupdateEmployees);
    app.delete("/deletedetails/:id", employessRoutess.getdeleteEmployees)



}
export default employessRoute;

