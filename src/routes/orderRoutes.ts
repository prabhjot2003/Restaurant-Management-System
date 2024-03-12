import oderRoutesss from "../services/orderService";



const orderRoute = (app: any) => {

    app.post('/orderCreate', oderRoutesss.ordercreated);
    app.put("/OrderUpdate/:id", oderRoutesss.updatedorder);
    app.delete("/orderDelete/:id", oderRoutesss.getdeleteOrder)

}
export default orderRoute;