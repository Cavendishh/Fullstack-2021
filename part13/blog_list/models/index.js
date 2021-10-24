const Blog = require('./blog')
const User = require('./user')
const ReadingLists = require('./readingLists')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingLists, as: 'readingList' })
Blog.belongsToMany(User, { through: ReadingLists, as: 'usersMarked' })

module.exports = {
  Blog,
  User,
  ReadingLists,
}
