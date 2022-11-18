import { Router } from 'express'
import controller from '../controllers/doctor.controller.js'

const router = Router();

router.get('/dashboardDoctor', controller.dashboardDoctor);

router.get('/getCitas', controller.getCitas);
router.get('/getCita/:id', controller.getCita);
router.post('/finalizeCita/:id', controller.finalizeCita);

router.get('/setSolicitud', controller.setSolicitud); //envio de datos de medico
router.post('/newSolicitud', controller.newSolicitud); //envio de datos de medico

router.get('/setHorario', controller.setHorario);
router.post('/newHorario', controller.newHorario);
router.get('/getHorario/:id', controller.getHorario);
router.post('/updateHorario/:id', controller.updateHorario)

export default router;