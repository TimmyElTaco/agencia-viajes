import { Testimonial } from '../models/Testimoniales.js';
import { Viaje } from '../models/Viaje.js'

const paginaInicio = async (req, res) => {

    const promiseDB = [];

    promiseDB.push( Viaje.findAll({ limit: 3 }) )
    promiseDB.push( Testimonial.findAll({ limit: 3 }) )

    try {
        const resultado = await Promise.all( promiseDB );
        
        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.error(error);
    }


}

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaTestimoniales = async (req, res) => {

    try {
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });

    } catch (error) {
        console.error(error);        
    }

}

const paginaViajes = async (req, res) => {
    
    const viajes = await Viaje.findAll();

    console.log(viajes);
    
    res.render('viajes', {
        pagina: 'Proximos viajes',
        viajes,
    });
}

const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params;

    try {
        const resultado = await Viaje.findOne({ where: { slug } });

        res.render('viaje', {
            pagina: 'Informacion viaje',
            resultado
        })
    } catch (error) {
        console.error(error);
    }

}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}