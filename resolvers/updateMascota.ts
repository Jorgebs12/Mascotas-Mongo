import { Request, Response } from "npm:express@4.18.2";
import MascotaModel from "../db/mascota.ts";

const updatedMascota = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, tipo } = req.body;

    if (tipo != "perros" && tipo != "gatos" && tipo != "serpientes") {
      res.status(400).send("Tipo de mascota no válido");
      return;
    }

    const updatedMascota = await MascotaModel.findOneAndUpdate(
      { id },
      { nombre, descripcion, tipo },
      { new: true }
    ).exec();

    if (!updatedMascota) {
      res.status(404).send("Mascota no encontrada");
      return;
    }

    res.status(200).send({
      nombre: updatedMascota.nombre,
      descripcion: updatedMascota.descripcion,
      tipo: updatedMascota.tipo,
      id: updatedMascota._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updatedMascota;
