const Blog = require('./blog')
const User = require('./user')
const ReadingLists = require('./readingLists')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingLists, as: 'reading_list' })
Blog.belongsToMany(User, { through: ReadingLists, as: 'usersMarked' })

Blog.hasMany(ReadingLists, { as: 'read_status' })

module.exports = {
  Blog,
  User,
  ReadingLists,
  Session,
}
