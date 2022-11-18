import { pool } from '../db.js'
const controller = {}

controller.dashboardPaciente = async (req, res) => {
    if (req.cookies.loggein) {
        if (req.cookies.tipe == 0) {
            return res.render('paciente/dashboardPaciente');
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/login');
    }
}

controller.newCita = async (req, res) => {
    try {
        res.json({})
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}
controller.cancelarCita = async (req, res) => {
    try {
        res.json({})
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

controller.getHistoria = async (req, res) => {
    try {
        const id = req.params.id;
        const [result] = await pool.query("SELECT * FROM cita ORDER BY fecha ASC WHERE id_usuario = ?", [id]);
        if (result.length > 0) {
            res.json(result);
        } else {
            return res.status(404).json({ message: "Aun no tiene antecedentes en su historia" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

} //desde la vista del medico 
controller.newCalificacion = async (req, res) => {
    try {
        const data = req.body;
        const [result] = await pool.query("INSERT INTO calificacion SET ?", [data]);
        req.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

controller.newReclamacion = async (req, res) => {
    try {
        const data = req.body;
        const [result] = await pool.query("INSERT INTO reclamacion SET ?", [data]);
        req.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

controller.getEspecialidades = async (req, res) => {
    try {
        if (req.cookies.loggein) {
            if (req.cookies.tipe == 0) {
                const [result] = await pool.query("SELECT * FROM especialidaddes");
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
            if (req.cookies.tipe == 0) {
                const id = req.params.id;
                const [result] = await pool.query("SELECT * FROM especialidades WHERE id_especialidad = ?", [id]);
                if (result.length > 0) {
                    res.json(result[0]);
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

controller.getDoctores = async (req, res) => {
    try {
        if (req.cookies.loggein) {
            if (req.cookies.tipe == 0) {
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
            if (req.cookies.tipe == 0) {
                const id = req.params.id;
                const [result] = await pool.query(
                    "SELECT * FROM usuario U INNER JOIN solicitud S ON U.id_usuario = S.id_usuario WHERE U.tipo = 1 AND U.id_usuario = ?",
                    [id]
                );
                if (result.length > 0) {
                    res.json(result[0]);
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

export default controller;