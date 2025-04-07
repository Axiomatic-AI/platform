import { PicDesignerQuery, ThreadQuery, ErrorQuery } from "./types";

export function guardIsPicQuery(query: ThreadQuery): query is PicDesignerQuery {
    return 'code' in query;
}

export function guardIsErrorQuery(query: ThreadQuery): query is ErrorQuery {
    return 'error' in query;
}

export function guardIsPicOrErrorQuery(query: ThreadQuery): query is PicDesignerQuery | ErrorQuery {
    return guardIsPicQuery(query) || guardIsErrorQuery(query);
}

