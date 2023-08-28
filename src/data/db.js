// // Remember to set type: module in package.json or use .mjs extension
// import { join, dirname } from 'node:path'
// import { fileURLToPath } from 'node:url'

// import { Low } from 'lowdb'
// import { JSONFile } from 'lowdb/node'

// // db.json file path
// const __dirname = dirname(fileURLToPath(import.meta.url))
// const file = join(__dirname, 'db.json')

// // Configure lowdb to write data to JSON file
// const adapter = new JSONFile(file)
// const defaultData = { posts: [] }
// const db = new Low(adapter, defaultData)

// // Read data from JSON file, this will set db.data content
// // If JSON file doesn't exist, defaultData is used instead
// await db.read()

// // Create and query items using plain JavaScript
// // db.data.posts.push('hello world')
// // const firstPost = db.data.posts[0]

// // If you don't want to type db.data everytime, you can use destructuring assignment
// const { posts } = db.data

// export function savePost() {
//     posts.push('');
// }

// // Finally write db.data content to file
// await db.write()