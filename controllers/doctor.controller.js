import { pool } from '../db.js';
const controller = {}

controller.dashboardDoctor = async (req, res) => {
    if (req.cookies.loggein) {
        if (req.cookies.tipe == 1) {
            const [result] = await pool.query("SELECT * FROM solicitud WHERE id_usuario = ?", [req.cookies.id_usuario]);
            if (result.length > 0) {
                if (result[0].estado_so == 0) {
                    return res.redirect('/setSolicitud')
                } else {
                    if (result[0].estado_so == 1) {
                        return res.redirect('/setHorario')
                    } else {
                        if (result[0].estado_so == 2) {
                            return res.render('doctor/dashboardDoctor')
                        } else {
                            if (result[0].estado_so == 3) {
                                return res.redirect('/login')
                            }
                        }
                    }
                }
            }

        } else {
            res.redirect('/auth');
        }
    } else {
        res.redirect('/login');
    }
}

controller.getCitas = async (req, res) => {
    try {
        if (req.cookies.loggein) {
            if (req.cookies.tipe == 1) {
                const [result] = await pool.query("SELECT * FROM cita WHERE estado_ci = 0 ORDER BY fecha ASC ");
                if (result.length > 0) {
                    res.json(result);
                } else {
                    return res.status(404).json({ message: "No hay citas pendientes" });
                }
            } else {
                res.redirect('/auth');
            }
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}
controller.getCita = async (req, res) => {
    try {
        if (req.cookies.loggein) {
            if (req.cookies.tipe == 1) {
                const id = req.params.id;
                const [result] = await pool.query("SELECT * FROM cita C INNER JOIN usuario U ON U.id_usuario = C.id_usuario WHERE id_cita = ?", [id]);
                console.log(result[0]);
                if (result.length > 0) {
                    res.render('doctor/citaCambios', { data: result[0] });
                } else {
                    return res.status(404).json({ message: "Cita no encontrada" });
                }
            } else {
                res.redirect('/auth');
            }
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}
controller.finalizeCita = async (req, res) => {
    try {
        if (req.cookies.loggein) {
            if (req.cookies.tipe == 1) {
                const [result] = await pool.query("UPDATE cita SET ? WHERE id_cita = ?",[req.body, req.params.id]);
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "Solicitud no encontrada" });
                }
                res.redirect('/dashboardDoctor');
            } else {
                res.redirect('/auth');
            }
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

controller.setSolicitud = async (req, res) => {
    try {
        if (req.cookies.loggein) {
            if (req.cookies.tipe == 1) {
                const [especialidades] = await pool.query("SELECT * FROM especialidad");
                return res.render('doctor/solicitud', { espec: especialidades, id: req.cookies.id_usuario })
            } else {
                res.redirect('/auth');
            }
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

controller.newSolicitud = async (req, res) => {
    try {
        if (req.cookies.loggein) {
            if (req.cookies.tipe == 1) {
                const data = req.body;
                const [result] = await pool.query("INSERT INTO solicitud SET ?", [data]);
                res.redirect('/dashboardDoctor');
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

controller.setHorario = async (req, res) => {
    try {
        if (req.cookies.loggein) {
            if (req.cookies.tipe == 1) {
                return res.render('doctor/newHorario');
            } else {
                res.redirect('/auth');
            }
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}
controller.newHorario = async (req, res) => {
    try {
        if (req.cookies.loggein) {
            if (req.cookies.tipe == 1) {
                const data = req.body;
                console.log(data);
                if (req.body.lunes == 'on') {
                    req.body.lunes = 'true';
                }
                if (req.body.martes == 'on') {
                    req.body.martes = 'true';
                }
                if (req.body.miercoles == 'on') {
                    req.body.miercoles = 'true';
                }
                if (req.body.jueves == 'on') {
                    req.body.jueves = 'true';
                }
                if (req.body.viernes == 'on') {
                    req.body.viernes = 'true';
                }
                if (req.body.sabado == 'on') {
                    req.body.sabado = 'true';
                }
                if (req.body.domingo == 'on') {
                    req.body.domingo = 'true';
                }
                console.log(req.body);
                const [result] = await pool.query("INSERT INTO horario SET ?", [data]);
                res.redirect('/dashboardDoctor');
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}
controller.getHorario = async (req, res) => {
    try {
        if (req.cookies.loggein) {
            if (req.cookies.tipe == 1) {
                const id = req.params.id;
                const [result] = await pool.query("SELECT * FROM horario WHERE id_solicitud = ?", [id]);
                if (result.length > 0) {
                    res.render('doctor/getHorario', { data: result, data_id: id });
                } else {
                    return res.status(404).json({ message: "Cita no encontrada" });
                }
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}
controller.updateHorario = async (req, res) => {
    try {
        if (req.cookies.loggein) {
            if (req.cookies.tipe == 1) {
                const id = req.params.id;
                if (req.body.lunes == 'on') {
                    req.body.lunes = 'true';
                }
                if (req.body.martes == 'on') {
                    req.body.martes = 'true';
                }
                if (req.body.miercoles == 'on') {
                    req.body.miercoles = 'true';
                }
                if (req.body.jueves == 'on') {
                    req.body.jueves = 'true';
                }
                if (req.body.viernes == 'on') {
                    req.body.viernes = 'true';
                }
                if (req.body.sabado == 'on') {
                    req.body.sabado = 'true';
                }
                if (req.body.domingo == 'on') {
                    req.body.domingo = 'true';
                }
                const [result] = await pool.query("UPDATE horario SET ? WHERE id_solicitud = ?", [req.body, id]);
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "Solicitud no encontrada" });
                }
                res.json(result);
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}



export default controller;