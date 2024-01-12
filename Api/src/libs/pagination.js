const pagination = async (model, page, limit, query) => {
    const totalRows = await model.find(query).countDocuments();
    const totalPages = Math.ceil(totalRows/ limit);
    const next = page + 1;
    const prev = page - 1;
    const hasNext = next <= totalPages ? true : false;
    const hasPrev = prev > 0 ? true : false;

    return {
        totalRows,
        totalPages,
        currentPage: page,
        next,
        prev,
        hasNext,
        hasPrev
    }
}

module.exports = pagination;