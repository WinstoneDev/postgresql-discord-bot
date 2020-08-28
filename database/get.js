async function getGuild(guild) {

    let doc = await client.db.pool.query("SELECT * FROM guilds WHERE id=$1", [guild.id]);

    if (doc.rows.length === 0) {
        await client.db.pool.query("INSERT INTO guilds (id, language, prefix, blacklisted) values ($1,$2,$3,$4)", [guild.id, "english", client.config.prefix, false]);
        doc = await client.db.pool.query("SELECT * FROM guilds WHERE id=$1", [guild.id]);
    }

    doc.rows[0].save = async (data) => {
        if (!data) data = await client.databaseCache.guilds.get(doc.rows[0].id);
        if (!data) throw new Error("This guild isn't in the cache.");

        let dGuild = await client.db.pool.query("SELECT * FROM guilds WHERE id=$1", [data.id]);
        dGuild = dGuild.rows[0];

        await Object.keys(dGuild).forEach(async d => {
            if (dGuild[d] !== data[d]) {
                await client.db.pool.query(`UPDATE guilds SET ${d}=$1 WHERE id=$2`, [data[d], data.id]);
                dGuild[d] = data[d];
            }
        })

        dGuild.save = data.save;

        client.databaseCache.guilds.set(doc.rows[0].id, dGuild);
    }
    return doc.rows[0];
}

async function getUser(user) {

    let doc = await client.db.pool.query("SELECT * FROM users WHERE id=$1", [user.id]);

    if (doc.rows.length === 0) {

        let cooldowns = {
          reputation: 0,
          daily: 0
        }

        let economy = {
          money: 0,
          reputation: 0
        }

        await client.db.pool.query("INSERT INTO users (id, cooldowns, economy, blacklisted) values ($1,$2,$3,$4)", [user.id, cooldowns, economy, false]);
        doc = await client.db.pool.query("SELECT * FROM users WHERE id=$1", [user.id]);
    }

    doc.rows[0].save = async (data) => {
        if (!data) data = await client.databaseCache.users.get(doc.rows[0].id);
        if (!data) throw new Error("This user isn't in the cache.");

        let dUser = await client.db.pool.query("SELECT * FROM users WHERE id=$1", [data.id]);
        dUser = dUser.rows[0];

        await Object.keys(dUser).forEach(async d => {
            if (dUser[d] !== data[d]) {
                await client.db.pool.query(`UPDATE users SET ${d}=$1 WHERE id=$2`, [data[d], data.id]);
                dUser[d] = data[d];
            }
        })

        dUser.save = data.save;

        let dataStr = JSON.stringify(dUser);

        client.databaseCache.users.set(doc.rows[0].id, dUser);
    }

    return doc.rows[0];
}

async function getOrCreateUser(target){
  let user = await client.databaseCache.users.get(target.id);
  if(!user) user = await getUser(target);

  await client.databaseCache.users.set(user.id, user);
  return client.databaseCache.users.get(user.id);
}

client.db.getUser = getUser;
client.db.getGuild = getGuild;
client.db.getOrCreateUser = getOrCreateUser;
