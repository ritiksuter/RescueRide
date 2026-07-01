class Logger {

    info(message) {
        console.log(
            `[INFO] [${new Date().toISOString()}] ${message}`
        );
    }

    warn(message) {
        console.warn(
            `[WARN] [${new Date().toISOString()}] ${message}`
        );
    }

    error(message, error = null) {
        console.error(
            `[ERROR] [${new Date().toISOString()}] ${message}`
        );

        if (error) {
            console.error(error);
        }
    }

}

export default new Logger();