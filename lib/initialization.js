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
 * @param {knex.connection} knexConfig
 */
export function withKnex(ctx, knexConfig) {
    if(ctx[knexInitSym]) {
        throw new Error("Knex already initialized")
    }
    console.log('---------- can i see knex logs in here-----------------------')

    return new ContextBuilder()
        .with(knexSym, knex(knexConfig))
        .withCtxFunction("knex", getKnex)
        .withCtxFunction("knexQuery", (ctx, ...params) => getKnex(ctx)(...params))
        .build(ctx)
}

export function getKnex(ctx) {
    return ctx[knexInitSym]
}