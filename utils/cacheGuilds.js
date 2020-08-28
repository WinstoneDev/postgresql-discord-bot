(async () => {
    await console.log(chalk.blue("[DATABASE]") + " caching guilds...")
    await client.db.pool.query("SELECT * FROM guilds").then(async guilds => {
        await guilds.rows.forEach(async guild => {
            let gg = await client.guilds.cache.get(guild.id)
            if (!gg) return;

            guild.save = async (data) => {
                if (!data) data = await client.databaseCache.guilds.get(guild.id);
                if (!data) throw new Error("This guild isn't in the cache.");

                let dGuild = await client.db.pool.query("SELECT * FROM guilds WHERE id=$1", [data.id])
                dGuild = dGuild.rows[0];
                await Object.keys(dGuild).forEach(async d => {
                    if (dGuild[d] !== data[d]) {
                        await client.db.pool.query(`UPDATE guilds SET ${d}=$1 WHERE id=$2`, [data[d], data.id])
                        dGuild[d] = data[d]
                    }
                })
                dGuild.save = data.save;

                client.databaseCache.guilds.set(guild.id, dGuild)
            }
            client.databaseCache.guilds.set(guild.id, guild)
        })
        await console.log(chalk.blue("[DATABASE]") + ` successfully cached ${client.databaseCache.guilds.size} guilds.`)
    })
})()
