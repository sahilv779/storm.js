const parseQuery = (req, res, next) => {
    const filters = {};
    const operators = {
        equal: '',
        not_equal: 'not',
        less_than_equal: 'lte',
        greater_than_equal: 'gte',
        less_than: 'lt',
        greater_than: 'gt'
    };

    Object.keys(req.query).forEach(key => {
        const [field, operator] = key.split('__');
        if (field && operators[operator]) {
            filters[field] = { [operators[operator]]: req.query[key] };
        }
    });

    req.filters = filters;

    const orderBy = req.query.order_by;
    if (orderBy) {
        const direction = orderBy.startsWith('-') ? 'desc' : 'asc';
        const field = orderBy.replace(/^-|\+/, '');
        req.orderBy = { [field]: direction };
    } else {
        req.orderBy = null;
    }

    const page = parseInt(req.query.__page, 10) || 1;
    const limit = parseInt(req.query.__limit, 10) || 10;
    req.pagination = {
        skip: (page - 1) * limit,
        take: limit
    };

    next();
};

module.exports = parseQuery;
