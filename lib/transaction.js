import {Context, ContextBuilder} from "js-context"

import { getKnex } from "./initialization"

/** 
 * @typedef {{
 *  tx: knex.transactionProvider,
 *  requests: Set<mssql.Request>
 * }} txDescriptor
 */

const txSym = Symbol("knexTxProvider")

/**
 * adds a mssql transaction to a context. The transaction will not be started until a request is created
 * @param {Context} ctx context to add the transaction to
 */
export function withKnexTx(ctx) {
    const knex = getKnex(ctx)

    //we dont do a check to see if a tx is already on the context, because it may be helpful to have multiple tx from one pool.
    return new ContextBuilder()
        .with(txSym, knex.transactionProvider())
        .withCtxFunction("knexTx", getKnexTx)
        .build(ctx)
}

export async function getKnexTx(ctx, ...params) {
    return await ctx[txSym](...params)
}