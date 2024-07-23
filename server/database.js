"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = require("sqlite3");
function run(db, sql, args = undefined) {
    return new Promise((resolve, reject) => {
        const statement = db.prepare(sql);
        statement.run(args, function (a, b) {
            if (b) {
                reject(b);
                return;
            }
            // @ts-ignore
            resolve(this);
        });
    });
}
(async function () {
    const db = new sqlite3_1.Database('./database.db');
    // WANTLIST
    await run(db, `
        DROP TABLE IF EXISTS wantlist
    `);
    await run(db, `
        CREATE TABLE IF NOT EXISTS wantlist (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT, 
            description TEXT,
            done NUMBER,
            date NUMBER
    )`);
    // RESISTORS
    await run(db, `
        DROP TABLE IF EXISTS resistors
    `);
    await run(db, `
        CREATE TABLE IF NOT EXISTS resistors (
            id TEXT PRIMARY KEY,
            text TEXT, 
            value REAL,
            active NUMBER
        )`);
    const values = [
        ['1.0', 1.0],
        ['1.1', 1.1],
        ['1.2', 1.2],
        ['1.3', 1.3],
        ['1.5', 1.5],
        ['1.6', 1.6],
        ['1.8', 1.8],
        ['2.0', 2.0],
        ['2.2', 2.2],
        ['2.4', 2.4],
        ['2.7', 2.7],
        ['3.0', 3.0],
        ['3.3', 3.3],
        ['3.6', 3.6],
        ['3.9', 3.9],
        ['4.3', 4.3],
        ['4.7', 4.7],
        ['5.1', 5.1],
        ['5.6', 5.6],
        ['6.2', 6.2],
        ['6.8', 6.8],
        ['7.5', 7.5],
        ['8.2', 8.2],
        ['9.1', 9.1],
        ['10', 10],
        ['11', 11],
        ['12', 12],
        ['13', 13],
        ['15', 15],
        ['16', 16],
        ['18', 18],
        ['20', 20],
        ['22', 22],
        ['24', 24],
        ['27', 27],
        ['30', 30],
        ['33', 33],
        ['36', 36],
        ['39', 39],
        ['43', 43],
        ['47', 47],
        ['51', 51],
        ['56', 56],
        ['62', 62],
        ['68', 68],
        ['75', 75],
        ['82', 82],
        ['91', 91],
        ['100', 100],
        ['110', 110],
        ['120', 120],
        ['130', 130],
        ['150', 150],
        ['160', 160],
        ['180', 180],
        ['200', 200],
        ['220', 220],
        ['240', 240],
        ['270', 270],
        ['300', 300],
        ['330', 330],
        ['360', 360],
        ['390', 390],
        ['430', 430],
        ['470', 470],
        ['509', 509],
        ['560', 560],
        ['620', 620],
        ['680', 680],
        ['750', 750],
        ['819', 819],
        ['910', 910],
        ['1k', 1000],
        ['1.1k', 1100],
        ['1.2k', 1200],
        ['1.3k', 1300],
        ['1.5k', 1500],
        ['1.6k', 1600],
        ['1.8k', 1800],
        ['2k', 2000],
        ['2.2k', 2200],
        ['2.4k', 2400],
        ['2.7k', 2700],
        ['3k', 3000],
        ['3.3k', 3300],
        ['3.6k', 3600],
        ['3.9k', 3900],
        ['4.3k', 4300],
        ['4.7k', 4700],
        ['5.1k', 5100],
        ['5.6k', 5600],
        ['6.2k', 6200],
        ['6.8k', 6800],
        ['7.5k', 7500],
        ['8.2k', 8200],
        ['9.1k', 9100],
        ['10k', 10000],
        ['11k', 11000],
        ['12k', 12000],
        ['13k', 13000],
        ['15k', 15000],
        ['16k', 16000],
        ['18k', 18000],
        ['20k', 20000],
        ['22k', 22000],
        ['24k', 24000],
        ['27k', 27000],
        ['30k', 30000],
        ['33k', 33000],
        ['36k', 36000],
        ['39k', 39000],
        ['43k', 43000],
        ['47k', 47000],
        ['51k', 51000],
        ['56k', 56000],
        ['62k', 62000],
        ['68k', 68000],
        ['75k', 75000],
        ['82k', 82000],
        ['91k', 91000],
        ['100k', 100000],
        ['110k', 110000],
        ['120k', 120000],
        ['130k', 130000],
        ['150k', 150000],
        ['160k', 160000],
        ['180k', 180000],
        ['200k', 200000],
        ['220k', 220000],
        ['240k', 240000],
        ['270k', 270000],
        ['300k', 300000],
        ['330k', 330000],
        ['360k', 360000],
        ['390k', 390000],
        ['430k', 430000],
        ['470k', 470000],
        ['509k', 509000],
        ['560k', 560000],
        ['620k', 620000],
        ['680k', 680000],
        ['750k', 750000],
        ['819k', 819000],
        ['910k', 910000],
        ['1M', 1000000],
    ];
    Promise.all(values.map(value => {
        return run(db, `INSERT INTO resistors (id, text, value, active) VALUES (?, ?, ?, ?)`, [
            value.at(1),
            value.at(0),
            value.at(1),
            0
        ]);
    }));
    // CAPACITORS
    await run(db, `
        DROP TABLE IF EXISTS capacitors
    `);
    await run(db, `
        CREATE TABLE IF NOT EXISTS capacitors (
            id TEXT PRIMARY KEY,
            text TEXT, 
            value REAL,
            active NUMBER
        )`);
})();
