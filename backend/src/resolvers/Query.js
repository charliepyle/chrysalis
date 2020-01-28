function users(root, args, context) {
    return context.prisma.users();
}

function userImages(root, args, context) {
    return context.prisma.user({id: args.id}).images();
}

function images(root, args, context) {
    return context.prisma.images();
}

module.exports = {
    users,
    userImages,
    images,
}