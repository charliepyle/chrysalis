function newImageSubscribe(parent, args, context, info) {
    if (args.id)
    return context.prisma.$subscribe.image({where: {
        mutation_in:['CREATED'],
        node: {
            id_contains: args.userId
        }
    }}).node()
}

const newImage = {
    subscribe: newImageSubscribe,
    resolve: payload => {
        return payload
    },
}

module.exports = {
    newImage,
}