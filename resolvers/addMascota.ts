import { Request, Response } from "npm:express@4.18.2";
import MascotaModel from "../db/mascota.ts";

const addMascota = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, tipo} = req.body;

    if (tipo != "perros" && tipo != "gatos" && tipo != "serpientes") {
      res.status(400).send("Tipo de mascota no válido");
      return;
    }

    const alreadyExists = await MascotaModel.findOne({ nombre }).exec();
    if (alreadyExists) {
      res.status(400).send("Mascota ya existente");
      return;
    }

    const newMascota = new MascotaModel({ nombre, descripcion, tipo});
    await newMascota.save();

    res.status(200).send({
      nombre: newMascota.nombre,
      descripcion: newMascota.descripcion,
      tipo: newMascota.tipo,
      id: newMascota._id.toString(),
    });
    
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addMascota;
