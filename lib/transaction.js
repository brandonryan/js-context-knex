import {Context, ContextBuilder} from "js-context"

import { getKnex } from "./initialization.js"

/** 
 * @typedef {{
 *  tx: knex.transactionProvider,
 * }} txDescriptor
 */

const txSym = Symbol("knexTxProvider")

/**
 * adds a knex transaction to a context. The transaction will not be started until a request is created
 * @param {Context} ctx context to add the transaction to
 */
export function withKnexTx(ctx) {
    const knex = getKnex(ctx)

    return new ContextBuilder()
        .with(txSym, knex.transactionProvider())
        .withCtxFunction("knexTx", getKnexTx)
        .build(ctx)
}

export async function getKnexTx(ctx, ...params) {
    return await ctx[txSym](...params)
}