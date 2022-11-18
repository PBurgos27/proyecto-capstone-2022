import { pool } from "../db.js";
const controller = {};

controller.dashboardAdmin = async (req, res) => {
    if (req.cookies.loggein) {
        if (req.cookies.tipe == 2) {
            res.render('admin/dashboardAdmin');
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/login');
    }
};

//#region  Solicitud

/* controller.getSolicitudes = async (req, res) => {
    try {
        if (req.cookies.loggein) {
            if (req.cookies.tipe == 2) {
                const [result] = await pool.query("SELECT * FROM solicitud");
                if (result.length > 0) {
                    res.json(result);
                } else {
                    return res.status(404).json({ message: "No hay solicitudes registradas" });
                }
            }
        } else {
            res.json({ message: "Acceso denegado" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
controller.getSolicitud = async (req, res) => {
    try {
        if (req.cookies.loggein) {
            if (req.cookies.tipe == 2) {
                const id = req.params.id;
                const [result] = await pool.query("SELECT * FROM solicitud WHERE id_solicitud = ?", [id]);
                if (result.length > 0) {
                    res.json(result[0]);
                } else {
                    return res.status(404).json({ message: "Solicitud no encontrada" });
                }
            }
        } else {
            res.redirect('/auth');
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}; */

controller.validateSolicitud = async (req, res) => {
    try {
        if (req.cookies.loggein) {
            if (req.cookies.tipe == 2) {
                const [result] = await pool.query("UPDATE solicitud SET ? WHERE id_solicitud = ?", [req.body, req.params.id]);
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "Solicitud no encontrada" });
                }
                res.redirect('/dashboardAdmin');
            }
        } else {
            res.redirect('/auth');
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}; //Se actualiza el estado ha activo
controller.deleteSolicitud = async (req, res) => {
    try {
        //aca esta demas este codigo solo seria enviar un mensaje
        if (req.cookies.loggein) {
            if (req.cookies.tipe == 2) {
                const [result] = await pool.query("UPDATE solicitud SET ? WHERE id_solicitud = ?", [req.body, req.params.id]);
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "Solicitud no encontrada" });
                }
                res.redirect('/dashboardAdmin');
            }
        } else {
            res.redirect('/auth');
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}; //Se niega solicitud

//#endregion

//#region  Especialidad

controller.createEspecialidad = async (req, res) => {
    try {
        if (req.cookies.loggein) {
            if (req.cookies.tipe == 2) {
                return res.render('admin/createEspecialidad');
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

controller.newEspecialidad = async (req, res) => {
    try {
        if (req.cookies.loggein) {
            if (req.cookies.tipe == 2) {
                const data = req.body;
                const [result] = await pool.query("INSERT INTO especialidad SET ?", [data]);
                res.redirect('/dashboardAdmin');
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

controller.getEspecialidades = async (req, res) => {
    try {
        if (req.cookies.loggein) {
            if (req.cookies.tipe == 2 || req.cookies.tipe == 0) {
                const [result] = await pool.query("SELECT * FROM especialidad WHERE estado_esp = 0");
                if (result.length > 0) {
                    res.json(result);
                } else {
                    return res.status(404).json({ message: "No hay especialidades registradas" });
                }
            }
        } else {
            res.json({ message: "Acceso denegado" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}; //viste de paciente y vista de admin
controller.getEspecialidad = async (req, res) => {
    try {
        if (req.cookies.loggein) {
            if (req.cookies.tipe == 2) {
                const id = req.params.id;
                const [result] = await pool.query("SELECT * FROM especialidad WHERE id_especialidad = ?", [id]);
                if (result.length > 0) {
                    res.render('admin/especialidadCambios', { data: result[0] });
                    console.log(result[0].id_especialidad)
                } else {
                    return res.status(404).json({ message: "Especialidad no encontrada" });
                }
            }
        } else {
            res.redirect('/auth');
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}; //viste de paciente y vista de admin
controller.updateEspecialidad = async (req, res) => {
    try {
        if (req.cookies.loggein) {
            if (req.cookies.tipe == 2) {
                const [result] = await pool.query("UPDATE especialidad SET ? WHERE id_especialidad = ?", [req.body, req.params.id]);
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "Solicitud no encontrada" });
                }
                res.redirect('/dashboardAdmin');
            }
        } else {
            res.redirect('/auth');
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
controller.deleteEspecialidad = async (req, res) => {
    try {
        if (req.cookies.loggein) {
            if (req.cookies.tipe == 2) {
                const [result] = await pool.query(
                    "UPDATE especialidad SET ? WHERE id_especialidad = ?", [req.body, req.params.id]);
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "Solicitud no encontrada" });
                }
                res.redirect('/dashboardAdmin');
            }
        } else {
            res.redirect('/auth');
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//#endregion

//#region Doctores

controller.getDoctoresbyEspecialidad = async (req, res) => {
    try {
        if (req.cookies.loggein) {
            if (req.cookies.tipe == 0) {
                const [result] = await pool.query(
                    "SELECT * FROM usuario U INNER JOIN solicitud S ON U.id_usuario = S.id_usuario WHERE U.tipo = 1 AND S.especialidad = ?",[req.params.id]
                );
                if (result.length > 0) {
                    return res.json(result);
                } else {
                    return res.status(404).json({ message: "No hay medicos registrados" });
                }
            }
        } else {
            res.redirect('/auth');
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}; //viste de paciente y vista de admin

controller.getDoctores = async (req, res) => {
    try {
        if (req.cookies.loggein) {
            if (req.cookies.tipe == 2) {
                const [result] = await pool.query(
                    "SELECT * FROM usuario U INNER JOIN solicitud S ON U.id_usuario = S.id_usuario WHERE U.tipo = 1"
                );
                if (result.length > 0) {
                    res.json(result);
                } else {
                    return res.status(404).json({ message: "No hay medicos registrados" });
                }
            }
        } else {
            res.redirect('/auth');
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}; //viste de paciente y vista de admin
controller.getDoctor = async (req, res) => {
    try {
        if (req.cookies.loggein) {
            if (req.cookies.tipe == 2) {
                const id = req.params.id;
                const [result] = await pool.query(
                    "SELECT * FROM usuario U INNER JOIN solicitud S ON U.id_usuario = S.id_usuario WHERE U.tipo = 1 AND S.id_solicitud = ?",
                    [id]
                );
                const [especialidades] = await pool.query("SELECT * FROM especialidad");
                console.log(especialidades)
                if (result.length > 0) {
                    res.render("admin/doctorCambios", { data: result[0], espec: especialidades });
                } else {
                    return res.status(404).json({ message: "Medico no encontrada" });
                }
            }
        } else {
            res.redirect('/auth');
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}; //viste de paciente y vista de admin

controller.updateDoctor = async (req, res) => {
    try {
        //aca se debe agregar la opcion para enviar mensaje
        //aca esta demas este codigo solo seria enviar un mensaje
        if (req.cookies.loggein) {
            if (req.cookies.tipe == 2) {
                const [result] = await pool.query(
                    "UPDATE solicitud SET ? WHERE id_solicitud = ?",
                    [req.body, req.params.id]
                );
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "Medico no encontrada" });
                }
                res.redirect('/dashboardAdmin');
            }
        } else {
            return res.redirect('/auth');
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

/* controller.deleteDoctor = async (req, res) => {
    try {
        //aca esta demas este codigo solo seria enviar un mensaje
        if (req.cookies.loggein) {
            if (req.cookies.tipe == 2) {
                const [result] = await pool.query(
                    "UPDATE solicitud SET ? WHERE id_solicitud = ?",
                    [req.body, req.params.id]
                );
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "Medico no encontrada" });
                }
                res.json(result);
            }
        } else {
            res.redirect('/auth');
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};*/

//#endregion

//#region Reclamaciones

controller.getReclamaciones = async (req, res) => {
    try {
        if (req.cookies.loggein) {
            if (req.cookies.tipe == 2) {
                const [result] = await pool.query("SELECT * FROM reclamacion WHERE estado_re = 0");
                if (result.length > 0) {
                    res.json(result);
                } else {
                    return res
                        .status(404)
                        .json({ message: "No hay reclamaciones registradas" });
                }
            }
        } else {
            res.json({ message: "Acceso denegado" });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
controller.getReclamacion = async (req, res) => {
    try {
        if (req.cookies.loggein) {
            if (req.cookies.tipe == 2) {
                const id = req.params.id;
                const [result] = await pool.query(
                    "SELECT * FROM usuario U INNER JOIN reclamacion R ON U.id_usuario = R.id_usuario INNER JOIN solicitud S ON S.id_solicitud = R.id_solicitud WHERE R.id_reclamacion = ?",
                    [id]
                );
                if (result.length > 0) {
                    res.render('admin/reclamoCambios', { data: result[0] });
                    //res.json(result[0]);
                } else {
                    return res.status(404).json({ message: "Reclamacion no encontrada" });
                }
            }
        } else {
            res.redirect('/auth');
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

controller.deleteReclamacion = async (req, res) => {
    try {
        if (req.cookies.loggein) {
            if (req.cookies.tipe == 2) {
                const [result] = await pool.query(
                    "UPDATE reclamacion SET ? WHERE id_reclamacion = ?",
                    [req.body, req.params.id]
                );
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "Reclamacion no encontrada" });
                }
                res.redirect('/dashboardAdmin');
            }
        } else {
            res.redirect('/auth');
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}; //esta por verse

//#endregion

export default controller;
