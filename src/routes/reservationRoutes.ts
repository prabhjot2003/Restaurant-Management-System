import reservationRoutess from "../services/reservationService";



const reservationRoute = (app: any) => {
    //route to create a section
    app.post('/createReservation', reservationRoutess.reservationdata);
    app.put('/updateReservation/:id', reservationRoutess.getReservationupdate);




}
export default reservationRoute
