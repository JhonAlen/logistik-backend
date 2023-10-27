import HedgingNotes from '../db/HedgingNotes.js';

const searchHedgingNotes = async () => {
    const search = await HedgingNotes.searchHedgingNotes();
    if (search.error) {
        return {
            error: search.error
        }
    }
    return search;
}

const detailHedgingNotes = async (detailHedgingNotes) => {
    const detail = await HedgingNotes.detailHedgingNotes(detailHedgingNotes);
    if (detail.error) {
        return {
            error: detail.error
        }
    }
    return detail;
}

export default {
    searchHedgingNotes,
    detailHedgingNotes
}