(async () => {
    await console.log(chalk.blue("[DATABASE]") + " caching users...")
    await client.db.pool.query("SELECT * FROM users").then(async users => {
        await users.rows.forEach(async user => {
            user.save = async (data) => {
                if (!data) data = await client.databaseCache.users.get(user.id)
                if (!data) throw new Error("This user isn't in the cache.");

                let dUser = await client.db.pool.query("SELECT * FROM users WHERE id=$1", [data.id])
                dUser = dUser.rows[0]

                await Object.keys(dUser).forEach(async d => {
                    if (dUser[d] !== data[d]) {
                        await client.db.pool.query(`UPDATE users SET ${d}=$1 WHERE id=$2`, [data[d], data.id])
                        dUser[d] = data[d]
                    }
                })



                data.save = async (dataa) => {
                    if (!dataa) dataa = await client.databaseCache.users.get(user.id);
                    if (!dataa) throw new Error("This user isn't in the cache.");

                    let dUser = await client.db.pool.query("SELECT * FROM users WHERE id=$1", [dataa.id]);
                    dUser = dUser.rows[0];

                    await Object.keys(dUser).forEach(async d => {
                        if (dUser[d] !== dataa[d]) {
                            await client.db.pool.query(`UPDATE users SET ${d}=$1 WHERE id=$2`, [dataa[d], dataa.id]);
                            dUser[d] = dataa[d];
                        }
                    })

                    dUser.save = dataa.save;

                    client.databaseCache.users.set(user.id, dUser);
                }

                dUser.save = data.save;


            }
            client.databaseCache.users.set(user.id, user);
        })
        await console.log(chalk.blue("[DATABASE]") + ` successfully cached ${client.databaseCache.users.size} users.`);
    })
})()
