import { Router } from 'express'
import controller from '../controllers/paciente.controller.js'

const router = Router();

router.get('/dashboardPaciente', controller.dashboardPaciente);

router.post('/newCita', controller.newCita);
router.put('/cancelarCita/:id', controller.cancelarCita);

router.get('/getHistoria/:id', controller.getHistoria); //desde la vista del medico 
router.post('/newCalificacion', controller.newCalificacion);

router.post('/newReclamacion', controller.newReclamacion); //Libro de reclamaciones


export default router;