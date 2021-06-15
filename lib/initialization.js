import knex from "knex"
import {Context, ContextBuilder} from "js-context"

/** 
 * @typedef {{
 *  tx: knex.transactionProvider,
 */

/** @type {Map<string, Symbol>} */
const knexInitSym = Symbol("knexInitSym")

/**
 * @param {Context|ContextBuilder} ctx 
 * @param {knex.connection} connectionConfig
 */
export function withKnex(ctx, connectionConfig) {
    if(ctx[knexInitSym]) {
        throw new Error("Knex already initialized")
    }

    return new ContextBuilder()
        .with(knexSym, {
            client: 'mssql',
            connection: connectionConfig
        })
        .build(ctx)
}