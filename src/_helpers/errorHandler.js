export const errorHandler = {
    fireError(context, message) {
        context.loading = false;
        console.log(message);
    }
}