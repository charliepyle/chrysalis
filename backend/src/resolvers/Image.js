function postedBy(parent, args, context) {
    return context.prisma.image({ id: parent.id }).postedBy()
  }
  
module.exports = {
    postedBy,
}