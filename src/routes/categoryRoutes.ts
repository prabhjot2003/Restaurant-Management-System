
import categoryRoutess from '../services/categoryService';



const categoryRoute = (app: any) => {
    //route to create a section
    app.post('/createCategory', categoryRoutess.categorydata);
    // app.put('/updateCateogey/:id',categoryRoutess)




}
export default categoryRoute;