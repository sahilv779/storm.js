module.exports = {
    beforeCreate: async (req, res, next) => {
        console.log('Pre-create hook for User');
        // Add any pre-create logic here
        next();
    },
    afterCreate: async (req, res, result, next) => {
        console.log('Post-create hook for User');
        // Add any post-create logic here
        res.status(201).json(result);
    },
    beforeUpdate: async (req, res, next) => {
        console.log('Pre-update hook for User');
        // Add any pre-update logic here
        next();
    },
    afterUpdate: async (req, res, result, next) => {
        console.log('Post-update hook for User');
        // Add any post-update logic here
        res.json(result);
    },
    beforeGetAll: async (req, res, next) => {
        console.log('Pre-getAll hook for User');
        // Add any pre-getAll logic here
        next();
    },
    afterGetAll: async (req, res, results, next) => {
        console.log('Post-getAll hook for User');
        // Add any post-getAll logic here
        res.json(results);
    },
    beforeGetById: async (req, res, next) => {
        console.log('Pre-getById hook for User');
        // Add any pre-getById logic here
        next();
    },
    afterGetById: async (req, res, result, next) => {
        console.log('Post-getById hook for User');
        // Add any post-getById logic here
        res.json(result);
    },
    beforeDelete: async (req, res, next) => {
        console.log('Pre-delete hook for User');
        // Add any pre-delete logic here
        next();
    },
    afterDelete: async (req, res, next) => {
        console.log('Post-delete hook for User');
        // Add any post-delete logic here
        res.status(204).end();
    }
};
