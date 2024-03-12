import menuRoutesss from "../services/menuService";
import authEmployee from "../middleware/employeMiddleware";


const menuRoute = (app: any) => {
    //route to create a section
    app.post('/createMenu', authEmployee, menuRoutesss.menudata);
    app.put("/updatMenuIteam/:id", menuRoutesss.getUpdateMenu);
    app.post("/deleteMenu/:id", menuRoutesss.getdeleteMenu);
    app.get("/getMenu/:id", menuRoutesss.getAllMEnuIteam);




}
export default menuRoute;
