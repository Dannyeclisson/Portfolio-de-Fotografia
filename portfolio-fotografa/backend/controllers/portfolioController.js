const createPortfolioItem = (req, res) => {
  try {
      const { theme } = req.body;
      const imagePath = req.file.path;

      // Aqui você pode salvar no banco de dados (ex.: MongoDB)
      res.status(201).json({
          message: 'Item de portfólio criado com sucesso!',
          data: { theme, image: imagePath }
      });
  } catch (error) {
      res.status(500).json({ message: 'Erro ao criar item de portfólio.', error });
  }
};

module.exports = { createPortfolioItem };
