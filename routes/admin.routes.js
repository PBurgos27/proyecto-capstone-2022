import { Router } from 'express'
import controller from '../controllers/admin.controller.js'

const router = Router();

router.get('/dashboardAdmin', controller.dashboardAdmin);

/* router.get('/getSolicitudes', controller.getSolicitudes);
router.get('/getSolicitud/:id', controller.getSolicitud); */
router.post('/validateSolicitud/:id', controller.validateSolicitud); //Se actualiza el estado ha activo
router.post('/deleteSolicitud/:id', controller.deleteSolicitud); //Se niega la solicitud

router.get('/createEspecialidad',controller.createEspecialidad);
router.post('/newEspecialidad', controller.newEspecialidad);
router.get('/getEspecialidades', controller.getEspecialidades); //viste de paciente y vista de admin
router.get('/getEspecialidad/:id', controller.getEspecialidad); //viste de paciente y vista de admin
router.post('/updateEspecialidad/:id', controller.updateEspecialidad);
router.post('/deleteEspecialidad/:id', controller.deleteEspecialidad);

router.get('/getDoctoresbyEspecialidad/:id', controller.getDoctoresbyEspecialidad);
router.get('/getDoctores', controller.getDoctores); //viste de paciente y vista de admin
router.get('/getDoctor/:id', controller.getDoctor); //viste de paciente y vista de admin
router.post('/updateDoctor/:id', controller.updateDoctor);
//router.put('/deleteDoctor/:id', controller.deleteDoctor); //no se elimina solo se actualiza a deshabilitado */

router.get('/getReclamaciones', controller.getReclamaciones);
router.get('/getReclamacion/:id', controller.getReclamacion);
router.post('/deleteReclamacion/:id', controller.deleteReclamacion); //fue revisada la reclamacion

export default router;