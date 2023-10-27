import { Request, Response } from "npm:express@4.18.2";
import MascotaModel from "../db/mascota.ts";

export const getMascotasTodas = async (_req: Request, res: Response): Promise<void> => {

    try {
        const mascotas = await MascotaModel.find().exec();
        if (!mascotas) {
            res.status(404).send("No hay mascotas");
            return;
        }
        res.status(200).send(
            mascotas.map((mascota) => ({
                nombre: mascota.nombre,
                descripcion: mascota.descripcion,
                tipo: mascota.tipo,
                id: mascota._id.toString(),
            }))
        )
    } catch (error) {
        res.status(404).send(error.message);
        return;
    }
};

export default getMascotasTodas;