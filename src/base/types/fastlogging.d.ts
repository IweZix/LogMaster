declare module 'fastlogging' {
    interface FastLogging {
        info(message: string): void
        success(message: string): void
        // Implémentez d'autres méthodes au besoin
    }

    export default class implements FastLogging {
        constructor(debug?: boolean, toFile?: boolean)
        info(message: string): void
        success(message: string): void
        // Implémentez d'autres méthodes au besoin
    }
}
