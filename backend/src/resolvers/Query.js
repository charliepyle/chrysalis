function users(root, args, context) {
    return context.prisma.users();
}

function user(root, args, context) {
    if (args.id) {
        return context.prisma.user({id: args.id})
    }
    return context.prisma.user({email: args.email})
}

function userImages(root, args, context) {
    return context.prisma.user({id: args.userId}).images();
}

function images(root, args, context) {
    const where = args.filter ? {
        postedBy: null
    } : {}
    return context.prisma.images({where});
}


module.exports = {
    users,
    user,
    userImages,
    images,
}