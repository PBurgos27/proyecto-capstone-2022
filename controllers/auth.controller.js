import { pool } from '../db.js';
import bcrypt from 'bcryptjs';

const controller = {}

controller.index = (req, res) => {
    if(req.cookies.loggein){
        if(req.cookies.tipe == 0){
            res.redirect('/dashboardPaciente');
        }else{
            if(req.cookies.tipe == 1){
                res.redirect('/dashboardDoctor');
            }else{
                if(req.cookies.tipe == 2){
                    res.redirect('/dashboardAdmin');
                }
            }
        }
    }else{
        res.render("auth/index")
    }
}

controller.auth = (req, res) => {
    try{
        if(req.cookies.loggein){
            if(req.cookies.tipe == 0){
                return res.redirect('/dashboardPaciente');
            }else{
                if(req.cookies.tipe == 1){
                    return res.redirect('/dashboardDoctor');
                }else{
                    if(req.cookies.tipe == 2){
                        return res.redirect('/dashboardAdmin');
                    }
                }
            }
        }else{
            res.redirect('/login');
        }        
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

controller.login = (req, res) => {
    try{
        if(req.cookies.loggein){
            if(req.cookies.tipe == 0){
                res.redirect('/dashboardPaciente');
            }else{
                if(req.cookies.tipe == 1){
                    res.redirect('/dashboardDoctor');
                }else{
                    if(req.cookies.tipe == 2){
                        res.redirect('/dashboardAdmin');
                    }
                }
            }
        }else{
            return res.render("auth/login")
        } 
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}
controller.logear = async (req, res) => {
    try{
        const email = req.body.correo;
        const pass = req.body.pass;
        const [result] = await pool.query("SELECT * FROM usuario WHERE correo = ?", [email]);
        if (result.length > 0 && await bcrypt.compare(pass, result[0].pass)) {
            res.cookie('name', result[0].nombre, {
                maxAge: 1000 * 60 * 60 * 8,
                httpOnly: true,
                secure: true,
                sameSite: 'lax'
            });
            res.cookie('tipe', result[0].tipo, {
                maxAge: 1000 * 60 * 60 * 8,
                httpOnly: true,
                secure: true,
                sameSite: 'lax'
            });
            res.cookie('id_usuario', result[0].id_usuario, {
                maxAge: 1000 * 60 * 60 * 8,
                httpOnly: true,
                secure: true,
                sameSite: 'lax'
            });
            res.cookie('loggein', true, {
                maxAge: 1000 * 60 * 60 * 8,
                httpOnly: true,
                secure: true,
                sameSite: 'lax'
            });
            res.redirect('/auth');
        } else {
            return res.status(404).json({ message: "No se encontro su información" });
        }
    }catch(error){
        return res.status(500).json({message: error.message});
    }    
}

controller.signIn = (req, res) => {
    try{
        if(req.cookies.loggein){
            if(req.cookies.tipe == 0){
                res.redirect('/dashboardPaciente');
            }else{
                if(req.cookies.tipe == 1){
                    res.redirect('/dashboardDoctor');
                }else{
                    if(req.cookies.tipe == 2){
                        res.redirect('/dashboardAdmin');
                    }
                }
            }
        }else{
            return res.render("auth/signIn")
        }        
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}
controller.newsignIn = async (req, res) => {
    try{
        let newPass = await bcrypt.hash(req.body.pass, 8);
        if (req.body.tipo == "Paciente") {
            req.body.tipo = 0;
        } else {
            if (req.body.tipo == "Medico") {
                req.body.tipo = 1;
            }
        }
        req.body.pass = newPass;
        const data = req.body;
        const [result] = await pool.query("INSERT INTO usuario SET ?", data);
        res.redirect('/login');
        //feo el redireccionamiento hazlo desde el front :v
    }catch(error){
        return res.status(500).json({message: error.message});
    }
    
}

controller.logout = (req, res) => {
    try{
        res.clearCookie('name');
        res.clearCookie('tipe');
        res.clearCookie('id_usuario');
        res.clearCookie('loggein');   
        res.redirect('/');     
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

controller.getData =async(req, res) => {
    try{
        if(req.cookies.loggein){
            const id = req.cookies.id_usuario;
            const [result] = await pool.query("SELECT * FROM usuario WHERE id_usuario = ?", [id]);
            if(result.length > 0 ){
                if(result[0].tipo == 0){
                    const [usuario] = await pool.query("SELECT * FROM usuario WHERE id_usuario = ?", [id]);
                    res.json(usuario);
                }else{
                    if(result[0].tipo == 1){
                        const [medico] = await pool.query("SELECT * FROM usuario U INNER JOIN solicitud S ON U.id_usuario = S.id_usuario WHERE id_usuario = ?", [id]);
                        res.json(medico);
                    }
                }
            }else{
                return res.status(404).json({ message: "No se encontro su información" });
            }
        }else{

        }
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}
controller.updateData = async(req, res) => {
    try{
        const [result] = await pool.query("UPDATE usuario SET ? WHERE id_usuario = ?", [req.body, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Reclamacion no encontrada" });
        }
        res.json(result);
    }catch(error){
        return res.status(500).json({message: error.message});
    }    
}

export default controller;