// src/api/comentario/content-types/comentario/lifecycles.js

module.exports = {
  // Se dispara automáticamente después de crear un comentario
  async afterCreate(event) {
    await recalculateMuebleRating(event);
  },

  // Se dispara automáticamente después de actualizar un comentario
  async afterUpdate(event) {
    await recalculateMuebleRating(event);
  },

  // Se dispara automáticamente después de eliminar un comentario
  async afterDelete(event) {
    await recalculateMuebleRating(event);
  },
};

/**
 * Función que recalcula el promedio de estrellas y actualiza el Mueble asociado
 */
async function recalculateMuebleRating(event) {
  const { result } = event;

  // Obtener el ID del mueble de forma segura (Strapi puede devolver el objeto completo o solo el ID)
  const muebleId = result?.mueble?.id || result?.mueble;

  if (!muebleId) return;

  try {
    // 1. Consultar todos los comentarios asociados a este mueble específico
    const comentarios = await strapi.entityService.findMany(
      "api::comentario.comentario",
      {
        filters: { mueble: muebleId },
      },
    );

    // 2. Calcular matemáticamente el promedio
    let promedio = 5.0; // Valor por defecto si se eliminan todos los comentarios

    if (comentarios.length > 0) {
      const sumaTotal = comentarios.reduce((acumulador, actual) => {
        return acumulador + (actual.puntuacion || 0);
      }, 0);

      // Redondeamos el promedio a un decimal (ej: 4.8)
      promedio = Math.round((sumaTotal / comentarios.length) * 10) / 10;
    }

    // 3. Actualizar el campo 'calificacion' en el Mueble correspondiente
    await strapi.entityService.update("api::mueble.mueble", muebleId, {
      data: {
        calificacion: promedio,
      },
    });

    console.log(
      `[Lifecycle Hook] Calificación del mueble con ID ${muebleId} actualizada con éxito a: ${promedio}`,
    );
  } catch (error) {
    console.error("Error al recalcular la calificación del mueble:", error);
  }
}
