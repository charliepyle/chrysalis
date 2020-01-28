function users(root, args, context) {
    return context.prisma.users();
}

function user(root, args, context) {
    return context.prisma.user({email: args.email})
}

function userImages(root, args, context) {
    return context.prisma.user({id: args.id}).images();
}

function images(root, args, context) {
    return context.prisma.images();
}

module.exports = {
    users,
    user,
    userImages,
    images,
}