const pool = require('../config/db');

const createOccurrence = async (req, res) => {

  const { title, description } = req.body;

  if (!title || !description) {
  return res.status(400).json({
    message:
      "Título e descrição são obrigatórios 🚫"
  });
}

  try {

    const createdBy = req.user.id;

    const result = await pool.query(
      `
      INSERT INTO occurrences (title, description, created_by)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [title, description, createdBy]
    );

    return res.status(201).json({
      message: 'Ocorrência criada com sucesso',
      occurrence: result.rows[0]
    });
  }
  catch (error) {

    console.log(error);

    return res.status(500).json({
      message: 'Erro ao criar ocorrência'
    })

  }

}

const getOccurrence = async (req, res) => {

  try {

    let result;

    if (req.user.role === 'admin') {
      result = await pool.query('SELECT * FROM occurrences');
    } else {
      result = await pool.query('SELECT * FROM occurrences WHERE created_by = $1', [req.user.id]);
    }

    return res.status(200).json({
      occurrences: result.rows
    });

  } catch (error) {

    console.log(error);
    return res.status(500).json({
      message: 'Erro ao buscar ocorrências'
    });

  }

}

const getOccurrenceById = async (req, res) => {

    const { id } = req.params;

  try {

    const result = await pool.query(
      `
      SELECT *
      FROM occurrences
      WHERE id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {

      return res.status(404).json({
        message:
          "Ocorrência não encontrada 🚫"
      });
    }

    const occurrence =
      result.rows[0];

    const isAdmin = req.user.role === "admin";

    const isOwner = occurrence.created_by === req.user.id;

    if (!isAdmin && !isOwner) {

      return res.status(403).json({
        message:
          "Você não tem acesso a esta ocorrência 🚫"
      });
    }

    return res.status(200).json({
      occurrence
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message:
        "Erro ao buscar ocorrência"
    });
  }

}

const updateOccurrence = async (req, res) => {

  const { id } = req.params;

  const {title, description, status} = req.body;

  try {

    const occurrence = await pool.query(
        `
        SELECT *
        FROM occurrences
        WHERE id = $1
        `,
        [id]
      );

    if (occurrence.rows.length === 0) {
      return res.status(404).json({
        message:
          "Ocorrência não encontrada 🚫"
      });
    }

    const foundOccurrence = occurrence.rows[0];

    const isAdmin = req.user.role === "admin";

    const isOwner = foundOccurrence.created_by === req.user.id;

    if ( !isAdmin && !isOwner) {
      return res.status(403).json({
        message:
          "Você não tem permissão para editar esta ocorrência 🚫"
      });
    }

    const updatedOccurrence = await pool.query(
        `
        UPDATE occurrences
        SET
          title = $1,
          description = $2,
          status = $3
        WHERE id = $4
        RETURNING *
        `,
        [title, description, status, id]
      );

    return res.status(200).json({
      message:
        "Ocorrência atualizada 🚔",
      occurrence:
        updatedOccurrence.rows[0]
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message:
        "Erro ao atualizar ocorrência"
    });
  }

}

const deleteOccurrence = async (req, res) => {

  const { id } = req.params;

  try {

    const occurrence = await pool.query(
      `
      SELECT * FROM occurrences
      WHERE id = $1
      `,
      [id]
    );
    
    if(occurrence.rows.length === 0) {
      return res.status(404).json({
        message: 'Ocorrência não encontrada 🚫'
      });
    }

    const foundOccurrence = occurrence.rows[0];

    const isAdmin = req.user.role === 'admin';

    const isOwner = foundOccurrence.created_by === req.user.id;

    if(!isAdmin && !isOwner) {
      return res.status(403).json({
        message: 'Voce nao tem permissao para acessar esta ocorrência 🚫'
      });
    }

    await pool.query(
      `
      DELETE FROM occurrences
      WHERE id = $1
      `,
      [id]
    );

    return res.status(200).json({
      message: 'Ocorrência deletada com sucesso 🚔'
    });

  } catch (error) {

    console.log(error);
    return res.status(500).json({
      message: 'Erro ao deletar ocorrência'
    });

  
  }
}

module.exports = {
  createOccurrence,
  getOccurrence,
  deleteOccurrence,
  getOccurrenceById,
  updateOccurrence
};