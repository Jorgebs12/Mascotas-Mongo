import { Request, Response } from "npm:express@4.18.2";
import MascotaModel from "../db/mascota.ts";

const getMascota = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pet = await MascotaModel.findOne({ _id:id }).exec();
    if (!pet) {
      res.status(404).send("Mascota no encontrada");
      return;
    }
    res.status(200).send({
      nombre: pet.nombre,
      descripcion: pet.descripcion,
      tipo: pet.tipo,
      id: pet._id.toString(),
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getMascota;
