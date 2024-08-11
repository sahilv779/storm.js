class BaseController {
    constructor(model, hooks = {}) {
        this.model = model;
        this.hooks = hooks;
    }

    getAll = async (req, res) => {
        try {
            if (this.hooks.beforeGetAll) await this.hooks.beforeGetAll(req, res, () => {});
            const items = await this.model.findMany({
                where: req.filters,
                orderBy: req.orderBy ? [req.orderBy] : undefined,
                skip: req.pagination.skip,
                take: req.pagination.take
            });
            if (this.hooks.afterGetAll) await this.hooks.afterGetAll(req, res, items, () => {});
            else res.json(items);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    create = async (req, res) => {
        try {
            if (this.hooks.beforeCreate) await this.hooks.beforeCreate(req, res, () => {});
            const newItem = await this.model.create({
                data: req.body
            });
            if (this.hooks.afterCreate) await this.hooks.afterCreate(req, res, newItem, () => {});
            else res.status(201).json(newItem);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    getById = async (req, res) => {
        try {
            if (this.hooks.beforeGetById) await this.hooks.beforeGetById(req, res, () => {});
            const { id } = req.params;
            const item = await this.model.findUnique({
                where: { id: parseInt(id, 10) }
            });
            if (item) {
                if (this.hooks.afterGetById) await this.hooks.afterGetById(req, res, item, () => {});
                else res.json(item);
            } else {
                res.status(404).json({ error: 'Item not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    update = async (req, res) => {
        try {
            if (this.hooks.beforeUpdate) await this.hooks.beforeUpdate(req, res, () => {});
            const { id } = req.params;
            const updatedItem = await this.model.update({
                where: { id: parseInt(id, 10) },
                data: req.body
            });
            if (this.hooks.afterUpdate) await this.hooks.afterUpdate(req, res, updatedItem, () => {});
            else res.json(updatedItem);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    delete = async (req, res) => {
        try {
            if (this.hooks.beforeDelete) await this.hooks.beforeDelete(req, res, () => {});
            const { id } = req.params;
            await this.model.delete({
                where: { id: parseInt(id, 10) }
            });
            if (this.hooks.afterDelete) await this.hooks.afterDelete(req, res, () => {});
            else res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}

module.exports = BaseController;
