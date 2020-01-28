function createUser(root, args, context) {
    context.prisma.$exists.user({ email: args.email }).then(() => {
        return updateUser(root, args, context);
    }).catch(() => {
        return context.prisma.createUser({
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
            password: args.password,
        })
    })   
}

function updateUser(root, args, context) {
    return context.prisma.updateUser({
        data: {
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
            password: args.password,
        },
        where: {
            email: args.email
        }
    })
}

function deleteUser(root, args, context) {
    return context.prisma.deleteUser({
        id: args.id
    })
}

function createImage(root, args, context) {
    return context.prisma.createImage({
        url: args.url,
        postedBy: { connect: { id: args.id } }
    })
}

function createImageNoUser(root, args, context) {
    return context.prisma.createImage({
        url: args.url,
    })
}

function deleteImage(root, args, context) {
    return context.prisma.updateUser({
        where: { id: args.userId },
        data: {
            images: {
                delete: {id: args.photoId},
            }
        }
    })
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    createImage,
    createImageNoUser,
    deleteImage,
}