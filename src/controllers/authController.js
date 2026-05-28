const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    const userExists = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Usuário já existe! 🚔' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, hashedPassword, role || "operador"]
    );

    return res.status(201).json({
      message: 'Registro bem-sucedido! 🚔',
      user: newUser.rows[0]
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return res.status(500).json({ message: 'Erro interno do servidor! 🚔' });
  }


}

const jwt = require('jsonwebtoken');

const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Usuario Nao encontrado! 🚔' });
    }

    const foundUser = user.rows[0];

    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Senha Incorreta! 🚔' });
    }

    const token = jwt.sign(
      {
        id: foundUser.id,
        role: foundUser.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      message: 'Login bem-sucedido! 🚔',
      token,
      user: {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role
      }
    });

  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({ message: 'Erro interno do servidor! 🚔' });
  }
}

const profile = async (req, res) => {

  return res.status(200).json({
    message: 'Perfil do usuário! 🚔',
    user: req.user
  });

}

module.exports = {
  register,
  login,
  profile
};