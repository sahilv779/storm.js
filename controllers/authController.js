const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

class AuthController {
    async register(req, res) {
        try {
            const { email, password, name } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.create({
                data: { email, password: hashedPassword, name },
            });

            res.status(201).json({ user });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await prisma.user.findUnique({ where: { email } });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();
