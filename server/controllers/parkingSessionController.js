const ParkingSession = require('.../models/reservationsModel');

const parkingSessionController = {
    getAll: async (req, res) => {
        try{
            const session = await parkingSession.getAll();
            res.status(200).json(session);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
        
    },

    getByld: async (req, res) => {
        try{
            const session = await ParkingSession.getByld(req.params.id);

            if(!session){
                return
res.status(404).json({message:'Parking Session Not Found'});
            }

            res.status(404).json(session);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    },

    create: async (req, res) => {
        try{
            const sessionId = await ParkingSession.create(req.body);
            res.status(201).json({message:'Parking Session Created Successfully',reservationId});
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    },

    vehicleExit: async (req, res) => {
        try {
        const result = await ParkingSession.vehicleExit(req.params.id,req.body.exit_timestamp);

        if(!result){
            return
res.status(404).json({message:'Active Session Not Found'});
        }

            res.status(200).json({message:'Vehicle Exit Recorded Sucessfully'});
        } catch (error) {
        res.status(500).json({message:error.message});
        }
    },

    update: async (req, res) => {
        try{
            const result = await ParkingSession.update(req.params.id,req.body);

            if (!result){
                return
res.status(404).json({message:'ParkingSession Not Found'});
            }

            res.status(200).json({message:'Parking Session Updated Sucessfully'})
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    },

    delete: async (req, res) => {
        try{
            const result = await ParkingSession.delete(req.params.id);

            if(!result){
                return
res.status(404).json({message:'Parking Session Not Found'});
            }

            res.status(200).json({message:'Parking Session Deleted Sucessfully'});
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    }
};

module.exports = parkingSessionController;