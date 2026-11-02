const Reservation = require('../models/reservationsModel');

const reservationController = {
    getAll: async (req, res) => {
        try{
            const reservation = await Reservation.getAll();
            res.status(200).json(reservation);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
        
    },

    getByld: async (req, res) => {
        try{
            const reservation = await Reservation.getByld(req.params.id);

            if(!reservation){
                return
res.status(404).json({message:'Reservation Not Found'});
            }

            res.status(404).json(resrvation);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    },

    create: async (req, res) => {
        try{
            const reservationId = await Reservation.create(req.body);
            res.status(201).json({message:'Reservation Created Successfully',reservationId});
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    },

    update: async (req, res) => {
        try{
            const result = await Reservation.update(req.params.id,req.body);

            if (!result){
                return
res.status(404).json({message:'Reservation Not Found'});
            }

            res.status(200).json({message:'Reservation Updated Sucessfully'})
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    },

    delete: async (req, res) => {
        try{
            const result = await Reservation.delete(req.params.id);

            if(!result){
                return
res.status(404).json({message:'Reservation Not Found'});
            }

            res.status(200).json({message:'Reservation Deleted Sucessfully'});
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    }
};

module.exports = reservationController;