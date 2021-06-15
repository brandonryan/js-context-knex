import knex from "knex"
import {Context, ContextBuilder} from "js-context"

/** 
 * @typedef {{
 *  tx: knex.transactionProvider,
 *  requests: Set<mssql.Request>
 * }} txDescriptor
 */

const txSym = Symbol("knexTransaction")

/**
 * adds a mssql transaction to a context. The transaction will not be started until a request is created
 * @param {Context} ctx context to add the transaction to
 */
export function withKnexTx(ctx, ) {
    //we dont do a check to see if a tx is already on the context, because it may be helpful to have multiple tx from one pool.
    return new ContextBuilder()
        .with(txSym, {
            tx: knex.transactionProvider(),      
        })
        .build(ctx)
}

