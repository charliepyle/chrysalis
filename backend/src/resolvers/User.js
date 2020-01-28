function images(parent, args, context) {
    return context.prisma.user({ id: parent.id }).images()
}
  
module.exports = {
    images,
}